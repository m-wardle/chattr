const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Add submission time.

let MessagesSchema = new Schema(
  {
    name: {
      type: String
    },
    message: {
      type: String
    }
  },
  {
    collection: 'messages'
  }
)

module.exports = mongoose.model('Messages', MessagesSchema)