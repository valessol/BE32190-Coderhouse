const mongoose = require("mongoose");

const schema = {
  type: String,
  email: String,
  body: String,
  timestamp: String,
};

const messagesSchema = new mongoose.Schema({ ...schema });

module.exports = messagesSchema;
