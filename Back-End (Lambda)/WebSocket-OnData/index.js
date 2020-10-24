const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const TABLE_NAME = 'ThingsBinWSClient';

exports.handler = async (event, context, callback) => {

    // console.log(event);
    let tabledetails = JSON.parse(JSON.stringify(event.Records[0].dynamodb));
    // console.log(JSON.stringify(tabledetails.NewImage.payload));

    let connectionData;
    try {
        connectionData = await ddb.scan({ TableName: TABLE_NAME }).promise();
    } catch (e) {
        return { statusCode: 500, body: e.stack };
    }

    // console.log(connectionData.Items[0].connectionid);
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: connectionData.Items[0].endpoint
    });

    const postData = JSON.stringify(tabledetails.NewImage.payload);

    const postCalls = connectionData.Items.map(async ({ connectionId }) => {
        try {
            await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: postData }).promise();
        } catch (e) {
            if (e.statusCode === 410) {
                console.log(`Found stale connection, deleting ${connectionId}`);
                await ddb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
            } else {
                throw e;
            }
        }
    });

    try {
        await Promise.all(postCalls);
    } catch (e) {
        return { statusCode: 500, body: e.stack };
    }

    return { statusCode: 200, body: 'Data sent.' };
};