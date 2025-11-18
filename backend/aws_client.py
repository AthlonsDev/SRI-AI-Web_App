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