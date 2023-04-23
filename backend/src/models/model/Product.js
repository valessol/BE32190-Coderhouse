const Joi = require("joi");

class Product {
  constructor(product) {
    this.product = product;
  }

  static validate(product) {
    const ProductSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      url: Joi.string(),
      stock: Joi.number().required(),
      category: Joi.string().required(),
      timestamp: Joi.date(),
    });

    const { error } = ProductSchema.validate(product);
    if (error) throw error;
  }
}

module.exports = Product;
