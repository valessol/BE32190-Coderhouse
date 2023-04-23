const Joi = require("joi");

class Order {
  constructor(order) {
    this.order = order;
  }

  static validate(order) {
    const OrderSchema = Joi.object({
      products: Joi.array({
        _id: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
      number: Joi.number().required(),
      email: Joi.string().required(),
      status: Joi.string().required(),
      address: Joi.string().required(),
      timestamp: Joi.date(),
    });

    const { error } = OrderSchema.validate(order);
    if (error) throw error;
  }
}

module.exports = Order;
