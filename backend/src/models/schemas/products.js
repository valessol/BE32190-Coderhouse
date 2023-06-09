const mongoose = require("mongoose");

const schema = {
  title: String,
  description: String,
  price: Number,
  stock: Number,
  url: String,
  category: String,
  timestamp: String,
};

const productsSchema = new mongoose.Schema({ ...schema });

module.exports = productsSchema;
