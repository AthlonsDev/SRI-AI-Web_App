import boto3
from botocore.exceptions import BotoCoreError, ClientError
from fastapi.responses import StreamingResponse, Response

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

def upload_file(filename:str, username:str):
    s3 = connect_to_s3_resource()
    for bucket in s3.buckets.all():
        print(bucket.name)
    try:
        s3.Bucket('sribucket00').upload_file(filename, filename)
        print(f"File {filename} uploaded to bucket sribucket00 as {filename}_{username}")
    except (BotoCoreError, ClientError) as e:
        print(f"Error uploading file: {e}")

def get_list_of_objects_in_bucket():
    s3 = connect_to_s3_resource()
    try:
        bucket = s3.Bucket('sribucket00')
        objects = [obj.key for obj in bucket.objects.all()]
        print(f"Objects in bucket sribucket00: {objects}")
        return objects
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
    
# print(read_file_from_s3('requirements'))  # Example usage
# print(get_list_of_objects_in_bucket())  # Example usage