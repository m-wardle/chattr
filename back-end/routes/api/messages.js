const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Messages = require("../../models/message-schema");

router.route('/').get((req, res) => {
  console.log("Request Received at Messages")
  Messages.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.send(JSON.stringify(data));
    }
  })
})

router.route('/resetdb').get((req, res) => {
  console.log("Request Received at Reset Messages");
  mongoose.connection.collections['messages'].drop(function (err) {
    console.log('collection dropped');
  });
  res.send("DB RESET COMPLETE");
})

module.exports = router;