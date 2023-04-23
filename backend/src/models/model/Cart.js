const Joi = require("joi");

class Cart {
  constructor(cart) {
    this.cart = cart;
  }

  static validate(cart) {
    const CartSchema = Joi.object({
      products: Joi.array({
        _id: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
      email: Joi.string().required(),
      address: Joi.string().required(),
      timestamp: Joi.date(),
    });

    const { error } = CartSchema.validate(cart);
    if (error) throw error;
  }
}

module.exports = Cart;
