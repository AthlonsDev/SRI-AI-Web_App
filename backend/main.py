from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib  # or pickle
import numpy as np

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


@app.get("/")
def read_root():
    return {"message": "API is running"}

@app.post("/predict")
def predict(data: InputData):
    try:
        # x = np.array([data.features])
        # prediction = model.predict(x)
        # return {"prediction": prediction.tolist()}
        return {"message": "API Works fine"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
