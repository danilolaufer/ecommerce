const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  password: {
    type: [String, null],
    max: 100,
  },
  rol: {
    type: String,
    required: true,
  },
  cart: {
    type: String,
    required: false,
  }
}, { versionKey: false });

const UserModel = mongoose.model('users', schema);

module.exports = { UserModel };
