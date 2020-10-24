import boto3
from boto3.dynamodb.conditions import Key,Attr
from decimal import Decimal


def lambda_handler(event, context):
    client = boto3.client('dynamodb')
    resource = boto3.resource('dynamodb')
    
    # GET TABLE LIST
    response = client.list_tables()
    list_tables = []
    for item in response["TableNames"]:
        if item == "ThingsBinWSClient":
            pass
        else:
            list_tables.append(item)
    
    datas = []
    for item in list_tables:
        table = resource.Table(item)
        id = item.split("-")
        id = id[0]
        response = table.query(
            KeyConditionExpression=Key('ID').eq(id),
            ScanIndexForward= False,
            Limit= 1
        )
    
        data = {
            "Filled": float(response['Items'][0]['payload']['Filled']),
            "Height": float(response['Items'][0]['payload']['Height']),
            "ID": response['Items'][0]['ID'],
            "Location": response['Items'][0]['payload']['Location'],
            "Percent": float(response['Items'][0]['payload']['Percent']),
            "Timestamp": float(response['Items'][0]['Timestamp']),
        }
        datas.append(data)
    
    payload = datas

    return payload
