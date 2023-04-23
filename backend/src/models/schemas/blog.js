const mongoose = require("mongoose");

const schema = {
  title: String,
  content: String,
  url: String,
  timestamp: String,
};

const blogSchema = new mongoose.Schema({ ...schema });

module.exports = blogSchema;
