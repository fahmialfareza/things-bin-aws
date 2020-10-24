import pandas as pd
from datetime import datetime as dt
import datetime
from decimal import Decimal
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    client = boto3.client('dynamodb')
    resource = boto3.resource('dynamodb')

    isMili = 1

    if len(str(event['time'])) == 13:
        timestamp_with_ms = float(event['time'])
        timestamp, ms = divmod(timestamp_with_ms, 1000)
        datet = dt.fromtimestamp(timestamp) + datetime.timedelta(milliseconds=ms)
        dt_object = datet.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]
        isMili = 1000
    else:
        timestamp = event['time']
        dt_object = datetime.fromtimestamp(timestamp)


    date = str(dt_object).split(" ")[0]

    min_time = date + " " + "00:00:01"
    max_time = date + " " + "23:59:59"

    min_do = dt.strptime(min_time, '%Y-%m-%d %H:%M:%S')
    max_do = dt.strptime(max_time, '%Y-%m-%d %H:%M:%S')

    min_ts = dt.timestamp(min_do) * isMili
    max_ts = dt.timestamp(max_do) * isMili

    # GET TABLE LIST
    response = client.list_tables()
    list_tables = []
    list_data = []
    for item in response["TableNames"]:
        if item == "ThingsBinWSClient":
            pass
        else:
            list_tables.append(item)

    # GET NEW DATA FROM EACH TABLES
    for item in list_tables:
        tmp = []
        table = resource.Table(item)
        id = item.split("-")
        id = id[0]
        response = table.query(
            KeyConditionExpression=Key('ID').eq(id) & Key(
                'Timestamp').between(Decimal(min_ts), Decimal(max_ts)),
            ScanIndexForward=False
        )
        for data in response['Items']:
            tmp.append(float(data['payload']['Filled']))
        list_data.append(tmp)

    # Find mean of Each Sensor by date
    df = pd.DataFrame(list_data)

    mean = df.mean(axis=1)
    mean = mean.tolist()

    # Insert data to mean table
    final_data = []
    counter = 0
    for i in mean:
        id = list_tables[counter].split("-")
        id = id[0]
        payload = {
            "date" : date,
            "sensor" : id,
            "mean" : str(round(i,1))
        }
        counter = counter + 1
        final_data.append(payload)
    return final_data
