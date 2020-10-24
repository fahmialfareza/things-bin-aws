var AWS = require("aws-sdk");
AWS.config.update({ region: 'us-east-1' });
var DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

exports.handler = function (event, context, callback) {
    var putParams = {
        TableName: 'chat',
        Item: {
            connectionid: { S: event.requestContext.connectionId },
            endpoint: { S: event.requestContext.domainName + '/' + event.requestContext.stage }
        }
    };

    DDB.putItem(putParams, function (err) {
        callback(null, {
            statusCode: err ? 500 : 200,
            body: err ? "Failed to connect: " + JSON.stringify(err) : "Connected."
        });
    });
};