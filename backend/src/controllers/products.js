const productInstance = require("../services/products.js");

class ProductsController {
  static instance;

  constructor() {
    this.products = productInstance;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductsController();
    }
    return this.instance;
  }

  getProducts = async (req, res) => {
    try {
      const products = await this.products.getProducts();
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.products.getProductById(Number(id));
      res.status(200).json(product);
    } catch (err) {
      //console.log(err);
      res.status(404).json(err);
    }
  };

  saveProduct = async (req, res) => {
    try {
      const product = req.body;
      const savedProduct = await this.products.saveProduct(product);
      res.status(201).json(savedProduct);
    } catch (err) {
      console.log(err);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = req.body;
      const updatedProduct = await this.products.updateProduct(
        Number(id),
        product
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.products.deleteProduct(Number(id));
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ProductsController.getInstance();
