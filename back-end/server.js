const WebSocket = require('ws');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/chattr";

const wss = new WebSocket.Server({ port: 3001 });

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log("Database Created.");
  db.close;
})

wss.on('connection', (ws) => {
  console.log("User connected;")
  ws.on('message', (data) => {
    console.log(`${JSON.parse(data).name} said: ${JSON.parse(data).message}`)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState == WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})