import boto3
from botocore.exceptions import BotoCoreError, ClientError
from fastapi.responses import StreamingResponse, Response
from whisper_end import query_endpoint
import json

def connect_to_s3_resource():
    s3 = boto3.resource(
        's3',
        aws_access_key_id='AKIA5N6KSCCMOEUZ4IWX',
        aws_secret_access_key='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',
        region_name='eu-north-1',
    )

    return s3
def connect_to_s3_client():
    s3 = boto3.client(
        's3',
        aws_access_key_id='AKIA5N6KSCCMOEUZ4IWX',
        aws_secret_access_key='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',
        region_name='eu-north-1',
    )
    return s3

def upload_doc(filename:str, username:str):
    s3 = connect_to_s3_resource()
    try:
        s3.Bucket('sribucket00').upload_file(filename, filename)
        print(f"File {filename} uploaded to bucket sribucket00 as {filename}_{username}")
    except (BotoCoreError, ClientError) as e:
        print(f"Error uploading file: {e}")


def upload_audio(filename:str, username:str):
    s3 = connect_to_s3_resource()
    try:
        s3.Bucket('sribucket00-audio').upload_file(filename, filename)
        print(f"File {filename} uploaded to bucket sribucket00 as {filename}_{username}")
    except (BotoCoreError, ClientError) as e:
        print(f"Error uploading file: {e}")

def get_list_of_objects_in_bucket():
    s3 = connect_to_s3_client()  # Changed from connect_to_s3_resource()
    try:
        response = s3.list_objects_v2(Bucket='sribucket00')
        
        if 'Contents' in response:
            objects = [obj['Key'] for obj in response['Contents']]
            print(f"Objects in bucket sribucket00: {objects}")
            return objects
        else:
            print("No objects found in bucket")
            return []
    except (BotoCoreError, ClientError) as e:
        print(f"Error listing objects: {e}")
        return []

def read_file_from_s3(key:str):
    s3 = connect_to_s3_resource()
    try:
        obj = s3.Bucket('sribucket00').Object(key)
        response = obj.get()
        data = response['Body'].read()
        return data
    except (BotoCoreError, ClientError) as e:
        print(f"Error reading file: {e}")
        return None
    
def iter_s3_stream(streaming_body, chunk_size=1024*1024):
    while True:
        chunk = streaming_body.read(chunk_size)
        if not chunk:
            break
        yield chunk
    
def download_file_from_s3(key: str, path: str):
    s3 = connect_to_s3_client()
    bucket = 'sribucket00'
    obj = s3.get_object(Bucket=bucket, Key=key)
    return StreamingResponse(
        iter_s3_stream(obj['Body']),
        media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        headers={
            'Content-Disposition': f'attachment; filename={key}'}
    )

def read_audio_file(filename):
    s3 = connect_to_s3_client()

    s3_bucket =  'sribucket00'
    key_prefix = "training-datasets/asr_notebook_data"
    input_audio_file_name = filename

    s3.download_file(s3_bucket, f"{key_prefix}/{input_audio_file_name }", input_audio_file_name )
    with open(input_audio_file_name, "rb") as file:
        wav_file_read = file.read()

    payload = {"audio_input": wav_file_read.hex(),
           "language": "english",
           "task": "transcribe"}
    
def connect_to_ec2_client():
    ec2 = boto3.client(
        'ec2',
        aws_access_key_id='AKIA5N6KSCCMOEUZ4IWX',
        aws_secret_access_key='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',
        region_name='eu-west-2',
    )
    return ec2
    
def disconnect_instance():
    instance_id = "i-0bf142084501c4b62"
    ec2 = connect_to_ec2_client()

    ec2.stop_instances(InstanceIds=[instance_id])
    return {
        "status": "stopping",
        "instance_id": instance_id
    }