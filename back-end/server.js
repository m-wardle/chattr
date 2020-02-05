const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const database = require('./db/db');
const WebSocket = require('ws');

const messageRoute = require('./routes/message.routes');
const MessagesSchema = require('./models/message-schema');
const UsersSchema = require('./models/user-schema');
require('./config/passport');

mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connected successfully.");
},
  err => {
    console.log("Error connecting to the database: ", err);
  }
);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/messages', messageRoute)

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log("Connected on port ", port);
})

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
  console.log("User connected;")
  ws.on('message', (data) => {
    console.log(`${JSON.parse(data).name} said: ${JSON.parse(data).message}`);

    let msg = new MessagesSchema({
      name: JSON.parse(data).name,
      message: JSON.parse(data).message
    });

    msg.save()
      .then(entry => {
        console.log("Message saved successfully: ", entry)
        wss.clients.forEach((client) => {
          if (client.readyState == WebSocket.OPEN) {
            client.send(JSON.stringify(entry));
          }
        });
      })
      .catch(err => {
        console.log("Error saving to database: ".err)
      });


  })
})