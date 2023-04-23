const mongoose = require("mongoose");

const schema = {
  products: [
    {
      _id: String,
      quantity: Number,
    },
  ],
  number: Number,
  email: String,
  status: String,
  address: String,
  timestamp: String,
};

const ordersSchema = new mongoose.Schema({ ...schema });

module.exports = ordersSchema;
