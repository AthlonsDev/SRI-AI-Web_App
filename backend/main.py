from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib  # or pickle
import numpy as np
# from speech_model import load_model
from search_eng import search_json


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for Vite
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
    # print(data.features[1])
    print(data.features[0])
    try:
        results = search_json("SRI_Dataset.jsonl", data.features[0], data.features[1])
        return results
              
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predict")
def predict(data: InputData):
    try:
        # x = np.array([data.features])
        # prediction = model.predict(x)
        # return {"prediction": prediction.tolist()}
        return {"message": "API Works fine"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.post("/speech")
def speech_recognition(data: SpeechInputData):
    print(data.features[0])
    try:
        # audio_input = data.features[0]  # Assuming single audio input for simplicity
        # result = model(audio_input) #get results from model
        # return {"transcription": result['text']} #return a text of the speech
        return {"message": "Speech endpoint works fine"}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# To run the app, use: uvicorn backend.main:app --reload
