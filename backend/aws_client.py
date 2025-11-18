import boto3
from botocore.exceptions import BotoCoreError, ClientError

def connect_to_s3():
    s3 = boto3.resource(
        's3',
        aws_access_key_id='AKIA5N6KSCCMOEUZ4IWX',
        aws_secret_access_key='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',
        region_name='eu-north-1',
    )

    return s3

def upload_file(filename:str, username:str):
    s3 = connect_to_s3()
    for bucket in s3.buckets.all():
        print(bucket.name)
    try:
        s3.Bucket('sribucket00').upload_file(filename, filename)
        print(f"File {filename} uploaded to bucket sribucket00 as {filename}_{username}")
    except (BotoCoreError, ClientError) as e:
        print(f"Error uploading file: {e}")

def get_list_of_objects_in_bucket():
    s3 = connect_to_s3()
    try:
        bucket = s3.Bucket('sribucket00')
        objects = [obj.key for obj in bucket.objects.all()]
        print(f"Objects in bucket sribucket00: {objects}")
        return objects
    except (BotoCoreError, ClientError) as e:
        print(f"Error listing objects: {e}")
        return []

def read_file_from_s3(key:str):
    s3 = connect_to_s3()
    try:
        obj = s3.Bucket('sribucket00').Object(key)
        response = obj.get()
        data = response['Body'].read()
        return data
    except (BotoCoreError, ClientError) as e:
        print(f"Error reading file: {e}")
        return None
    
# print(read_file_from_s3('requirements'))  # Example usage
# print(get_list_of_objects_in_bucket())  # Example usage