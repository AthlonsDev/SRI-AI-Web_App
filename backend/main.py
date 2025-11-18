from fastapi import FastAPI, HTTPException, File, UploadFile
from aws_client import connect_to_s3, upload_file, read_file_from_s3, get_list_of_objects_in_bucket
from pydantic import BaseModel
from fastapi.responses import JSONResponse, PlainTextResponse
import joblib  # or pickle
from speech_model import transcript_audio
from speech_handler import transcription
from search_eng import search_json
from ConvertToDoc import convert_to_doc
from data_visualization import load_dataframe
from io import BytesIO

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

connect_to_s3()

# origins = ['http://localhost:8000', 'http://190.168.0.132']

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # or ["http://localhost:5173"] for Vite
    # allow_origins=['curl https://loca.lt/mytunnelpassword'],
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

@app.get("/list-files")
def list_files():
    objects = get_list_of_objects_in_bucket()
    return {"objects": objects}

@app.post('/search')
def search(data: SearchInputData):
    try:
        results = search_json("SRI_Dataset.jsonl", data.features[0], data.features[1])
        return results
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print(file.filename)

    contents = await file.read()
    try:
        result = load_dataframe(contents)
        return {
            "data": result.head() if result else "Could not Process Request"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/")
async def get_buckets():
    objects = get_list_of_objects_in_bucket()
    return objects
    
@app.post("/speech")
async def speech_recognition(file: UploadFile = File(...)):
    print(file.filename)
    contents = await file.read()
    wrapped_contents = BytesIO(contents)  # Wrap binary data in BytesIO

    try:
        result = transcription(wrapped_contents)  # Pass wrapped data to transcription
        doc = convert_to_doc(result, file.filename + ".docx")  # Convert transcription to .docx
        upload_file(doc, "username")  # Upload the file to S3 with username
        res = result.replace("\n", "</br>")  # Replace newlines with HTML line breaks
        return PlainTextResponse(content=res)  # Return transcription as plain text
        # return JSONResponse(content={"transcription": result})  # Wrap result in JSON
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# To run the app, use: uvicorn backend.main:app --reload