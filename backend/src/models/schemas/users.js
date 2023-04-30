const mongoose = require("mongoose");

const schema = {
  username: String,
  password: String,
  phone: Number,
  email: String,
  token: String,
  confirmed: Boolean,
  timestamp: String,
};

const usersSchema = new mongoose.Schema({ ...schema });

module.exports = usersSchema;
