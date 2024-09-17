const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Phone Connected.');

    ws.on('message', (message) => {
        console.log('Received data:', message.toString()); // Buffer -> String

        ws.send('Message From Server');
    });

    ws.on('close', () => {
        console.log('Client has disconnected');
    });
});

console.log('ws://localhost:8080 is available');
