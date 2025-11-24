import sagemaker

sess = sagemaker.Session()
sagemaker_session_bucket = None
if sagemaker_session_bucket is None and sess is not None:
    sagemaker_session_bucket = sess.default_bucket()

role = sagemaker.get_execution_role()
sess = sagemaker.Session(default_bucket=sagemaker_session_bucket)



# deploy Hugging Face Model to SageMaker Inference
from sagemaker.huggingface.model import HuggingFaceModel

# create Hugging Face Model Class
huggingface_model = HuggingFaceModel(
   model_data="s3://models/my-bert-model/model.tar.gz",  # path to your trained SageMaker model
   role=role,                                            # IAM role with permissions to create an endpoint
   transformers_version="4.26",                           # Transformers version used
   pytorch_version="1.13",                                # PyTorch version used
   py_version='py39',                                    # Python version used
)

# deploy model to SageMaker Inference
predictor = huggingface_model.deploy(
   initial_instance_count=1,
   instance_type="ml.m5.xlarge"
)

# example request: you always need to define "inputs"
data = {
   "inputs": "Camera - You are awarded a SiPix Digital Camera! call 09061221066 from landline. Delivery within 28 days."
}

# request
predictor.predict(data)


import os
import torch
from transformers import pipeline

def model_fn(model_dir):
    # Load diarization pipeline
    pipe = pipeline(
        "audio-diarization",
        model=model_dir,
        device=0 if torch.cuda.is_available() else -1
    )
    return pipe

def predict_fn(input_data, model):
    # input_data must contain a path or raw bytes
    audio_path = input_data.get("audio_path")
    result = model(audio_path)
    # Convert result to json serializable
    return [r for r in result]


from sagemaker.huggingface import HuggingFaceModel

hub = {
    "HF_MODEL_ID": "pyannote/diarization-community-1",
    "HF_TASK": "audio-diarization"
}

model = HuggingFaceModel(
    model_data="s3://yourbucket/model.tar.gz",
    role="your-sagemaker-role",
    transformers_version="4.38",
    pytorch_version="2.1",
    py_version="py310",
    entry_point="inference.py",
    env=hub
)

predictor = model.deploy(
    initial_instance_count=1,
    instance_type="ml.m5.large"   # diarization needs CPU power
)


# call endpoint
import boto3
import json

runtime = boto3.client("sagemaker-runtime")

def diarize(audio_s3_path):
    body = json.dumps({"audio_path": audio_s3_path})
    response = runtime.invoke_endpoint(
        EndpointName="your-endpoint",
        ContentType="application/json",
        Body=body,
    )
    return json.loads(response["Body"].read())
