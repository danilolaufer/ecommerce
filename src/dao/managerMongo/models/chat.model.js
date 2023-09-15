const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 500 },
}, { versionKey: false });

const ChatModel = mongoose.model('messages', schema);

module.exports = { ChatModel };
