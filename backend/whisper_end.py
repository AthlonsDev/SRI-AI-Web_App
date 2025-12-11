import json
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError


def connect_to_sm_client():
    try:
        client = boto3.client(
            'sagemaker-runtime',
            aws_access_key_id='AKIA5N6KSCCMOEUZ4IWX',
            aws_secret_access_key='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',
            region_name='eu-north-1',
        )
        return client
    except (NoCredentialsError, PartialCredentialsError) as e:
        print(f"Credentials error: {e}")
        raise

endpoint_name = 'whisper-small-CPU'

def query_endpoint(body, content_type):
    print("Get creds")
    client = connect_to_sm_client()
    response = client.invoke_endpoint(EndpointName=endpoint_name, ContentType=content_type, Body=body)
    model_predictions = json.loads(response['Body'].read())
    text = model_predictions['text']
    print(f"Text: {text}")

    # If you receive client error (413) please check the payload size to the endpoint. Payloads for SageMaker invoke endpoint requests are limited to about 5MB
    # query_endpoint(wav_file_read, "audio/wav")
    return text

# query_endpoint(json.dumps(payload).encode('utf-8'), "application/json")

