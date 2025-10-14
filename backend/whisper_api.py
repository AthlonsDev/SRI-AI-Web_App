from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib  # or pickle
from speech_model import load_model
import numpy as np

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

model = load_model()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model at startup
@app.on_event("startup")
def startup_event():
    global model
    model = load_model()

# Define request schema
class InputData(BaseModel):
    features: list[str]


@app.get("/")
def read_root():
    return {"message": "Speech Recognition API is running"}

