const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const message = require("../models/message-schema");

router.route('/').get((req, res) => {
  message.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  })
})

module.exports = router;