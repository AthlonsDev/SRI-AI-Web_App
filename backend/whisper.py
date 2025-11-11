import torch
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline



def load_model():
    if torch.cuda.is_available():
        torch_dtype = torch.float16
    else:
        torch_dtype = torch.float32 #float 16 for cuda but not available
    device = "cuda" if torch.cuda.is_available() else "cpu"
        # model_id = "openai/whisper-large-v3"

    model_id = "openai/whisper-tiny"

    model = AutoModelForSpeechSeq2Seq.from_pretrained(
        model_id)
    model.to(device)

    processor = AutoProcessor.from_pretrained(model_id)

    pipe = pipeline(
        "automatic-speech-recognition",
        model,
        tokenizer=processor.tokenizer,
        feature_extractor=processor.feature_extractor,
        torch_dtype=torch_dtype,
        device=device
    )
    return pipe