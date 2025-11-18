from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel
from fastapi.responses import JSONResponse, PlainTextResponse
import joblib  # or pickle
from speech_model import transcript_audio
from speech_handler import transcription
from search_eng import search_json
from data_visualization import load_dataframe
from io import BytesIO

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# origins = ['http://localhost:8000', 'http://190.168.0.132']

app.add_middleware(
    CORSMiddleware,
    # allow_origins=['*'],  # or ["http://localhost:5173"] for Vite
    allow_origins=['curl https://loca.lt/mytunnelpassword'],
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


@app.get("/")
def read_root():
    return {"message": "API is running"}

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
    
@app.post("/speech")
async def speech_recognition(file: UploadFile = File(...)):
    print(file.filename)

    contents = await file.read()
    wrapped_contents = BytesIO(contents)  # Wrap binary data in BytesIO

    try:
        result = transcription(wrapped_contents)  # Pass wrapped data to transcription
        return PlainTextResponse(content=result)  # Return transcription as plain text
        # return JSONResponse(content={"transcription": result})  # Wrap result in JSON



    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# To run the app, use: uvicorn backend.main:app --reload