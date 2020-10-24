var awsIot = require('aws-iot-device-sdk');// Config

var device = awsIot.device({
    keyPath: "./certs/node-private-key.pem",
    certPath: "./certs/node-cert.pem",
    caPath: "./certs/Amazon_Root_CA_1.pem",
    host: "a2rv553vl9s69o-ats.iot.ap-southeast-1.amazonaws.com"
});



// Connect
device
    .on('connect', function () {
        console.log('Connected');
        // Subscribe to myTopic
        // Publish to myTopic
        // setInterval(function () {
        for (let i = 1; i <= 6; i++) {
            let topic = 'data/sensor' + i
            device.subscribe(topic);
            device.publish(topic, JSON.stringify({
                ID: 'sensor' + i,
                Filled: parseFloat((Math.random() * (150 - 0) + 0).toFixed(2)),
                // filled: 120,
                Height: 150.00,
                Location: 'jl. abcde 3',
                Timestamp: new Date().getTime(),
            }));
        }
        // }, 3000)
    });
// Receiving a message from any topic that this device is

// subscribed to.
device
    .on('message', function (topic, payload) {
        console.log('message', topic, payload.toString());
    });

// Error
device
    .on('error', function (error) {
        console.log('Error: ', error);
    });