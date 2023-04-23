const DAOFactory = require("../models/DAOs/DAOFactory.js");
const productsSchema = require("../models/schemas/products.js");
const Product = require("../models/model/Product.js");

class ProductsServices {
  static instance;

  constructor() {
    this.services = DAOFactory.get("products", productsSchema);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductsServices();
    }
    return this.instance;
  }

  static validateProduct(product) {
    try {
      Product.validate(product);
      return true;
    } catch (error) {
      throw new Error("Producto no válido");
    }
  }

  static setDefaultAttr(product) {
    let newProduct = { ...product, timestamp: new Date() };
    if (!newProduct.url)
      newProduct.url = `${config.CLOUDINARY_BASE_URL}/Avatars/img_ckql0i.png`;

    return newProduct;
  }

  getProducts = async () => {
    try {
      const products = await this.services.getItems();
      return products;
    } catch (err) {
      console.log(err);
    }
  };

  getProductById = async (_id) => {
    try {
      const product = await this.services.getById(_id);
      return product;
    } catch (err) {
      console.log(err);
    }
  };

  saveProduct = async (product) => {
    try {
      const options = { title: product.title, timestamp: product.timestamp };
      const newProduct = ProductsServices.setDefaultAttr(product);

      if (!ProductsServices.validateProduct(newProduct)) {
        return new Error("formato de post inválido");
      }
      return await this.services.saveItem(newProduct, options);
    } catch (err) {
      console.log(err);
    }
  };

  updateProduct = async (_id, product) => {
    try {
      const updatedProduct = await this.services.updateItem(_id, product);
      return updatedProduct;
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async (_id) => {
    try {
      const product = await this.services.deleteItem(_id);
      return product;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ProductsServices.getInstance();
