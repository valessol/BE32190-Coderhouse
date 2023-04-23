const mongoose = require("mongoose");

const schema = {
  products: [
    {
      _id: String,
      quantity: Number,
    },
  ],
  email: String,
  address: String,
  timestamp: String,
};

const cartsSchema = new mongoose.Schema({ ...schema });

module.exports = cartsSchema;
