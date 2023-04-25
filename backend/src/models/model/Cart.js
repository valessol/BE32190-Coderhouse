const Joi = require("joi");

class Cart {
  constructor(cart) {
    this.cart = cart;
  }

  static validate(cart) {
    const CartSchema = Joi.object({
      _id: Joi.string().required(),
      products: Joi
        .array
        //   {
        //   _id: Joi.string().required(),
        //   quantity: Joi.number().required(),
        // }
        (),
      userId: Joi.string(),
      timestamp: Joi.date(),
    });

    const { error } = CartSchema.validate(cart);
    if (error) throw error;
  }
}

module.exports = Cart;
