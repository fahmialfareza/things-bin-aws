var AWS = require("aws-sdk");
AWS.config.update({ region: 'us-east-1' });
var DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

exports.handler = function (event, context, callback) {
    var deleteParams = {
        TableName: 'chat',
        Key: {
            connectionid: { S: event.requestContext.connectionId }
        }
    };

    DDB.deleteItem(deleteParams, function (err) {
        callback(null, {
            statusCode: err ? 500 : 200,
            body: err ? "Failed to disconnect: " + JSON.stringify(err) : event.requestContext.connectionId + " > Disconnected."
        });
    });
};