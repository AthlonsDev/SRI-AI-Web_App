from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from aws_client import upload_doc, download_file_from_s3, disconnect_instance
from pydantic import BaseModel
from fastapi.responses import JSONResponse, PlainTextResponse
from speech_handler import transcription
from search_eng import search_json
from ConvertToDoc import convert_to_doc
from data_visualization import load_dataframe
import os
import time

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# origins = ['http://localhost:8000', 'http://190.168.0.132']

app.add_middleware(
    CORSMiddleware,
#   allow_origins=[
#       'https://main.d2x1a5nxcjgsfv.amplifyapp.com',
#       'https://13.40.107.140:8000',
#       'https://scaling-eureka-7pw5xw7q9qxhrj5j-3000.app.github.dev'],
    allow_origins='*',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model at startup
@app.on_event("startup")
def load_model():
    global model
    # model = joblib.load("model.pkl") #load pkl model

# Define request schema
class InputData(BaseModel):
    features: list[float]

class SpeechInputData(BaseModel):
    features: list[str]

class SearchInputData(BaseModel):
    features: list[str]


# @app.get("/")
# def read_root():
#     # objects = get_list_of_objects_in_bucket()
#     return {"message": "API is running"}

# @app.get("/list-files")
# def list_files():
#     objects = get_list_of_objects_in_bucket()
#     return {"objects": objects}

    
@app.get("/")
async def get_buckets():
    return {"message": "API is running"}

@app.get("/download/{filename}")
def download_file(filename: str):
    try:
        return download_file_from_s3(filename, filename)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/speech")
async def speech_recognition(file: UploadFile = File(...), model_type: str = Form(...)):

    # Save uploaded file to disk
    file_path = file.filename
    with open(file_path, "wb") as f:
        f.write(await file.read())

    try:
        print("Starting transcription...")
        print(model_type)
        result = transcription(file.filename, model_type=model_type)
        print(f"Transcription result type: {type(result)}")
        print(f"Transcription result: {result}")
        print("Converting to doc...")
        doc = convert_to_doc(result, file.filename + ".docx")
        print(f"Doc file: {doc}")

        print("Uploading to S3...")
        upload_doc(doc, "username")

        os.remove(doc)
        os.remove(file_path)
        time.sleep(10)

        if not flag:
            disconnect_instance()

        return result
    
    except Exception as e:
        print(f"Error details: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=str(e))

# To run the app, use: uvicorn backend.main:app --reload
