const cartInstance = require("../services/carts.js");
const productsInstance = require("../services/products.js");

class CartsController {
  static instance;

  constructor() {
    this.carts = cartInstance;
    this.products = productsInstance;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartsController();
    }
    return this.instance;
  }

  getCarts = async (req, res) => {
    try {
      const carts = await this.carts.getCarts();
      res.status(200).json(carts);
    } catch (err) {
      console.log(err);
    }
  };

  getCartById = async (req, res) => {
    try {
      const { cartId } = req.params;
      const cart = await this.carts.getCartById(cartId);
      res.status(200).json(cart);
    } catch (err) {
      console.log(err);
    }
  };

  getProductsOnCart = async (req, res) => {
    try {
      const { cartId } = req.params;
      const products = await this.cart.getProductsOnCart(cartId);
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
    }
  };

  getProduct = async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const product = await this.cart.getProduct(cartId, productId);
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  };

  saveProductOnCart = async (req, res) => {
    try {
      const product = req.body;
      const { cartId } = req.params;
      const savedProduct = await this.products.saveProduct(product, cartId);
      res.status(201).json(savedProduct);
    } catch (err) {
      console.log(err);
    }
  };

  updateProductOnCart = async (req, res) => {
    try {
      const { cartId } = req.params;
      const product = req.body;
      const updatedProduct = await this.products.updateProduct(cartId, product);
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.log(err);
    }
  };

  deleteProductOnCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const product = await this.products.deleteProductOnCart(
        cartId,
        productId
      );
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { cartId } = req.params;
      const cart = await this.products.deleteCart(cartId);
      res.status(200).json(cart);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = CartsController.getInstance();
