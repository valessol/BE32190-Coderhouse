const DAOFactory = require("../models/DAOs/DAOFactory.js");
const Cart = require("../models/model/Cart.js");
const cartsSchema = require("../models/schemas/carts.js");

class CartsServices {
  static instance;

  constructor() {
    this.cartServices = DAOFactory.get("carts", cartsSchema);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartsServices();
    }
    return this.instance;
  }

  static validateCart(cart) {
    try {
      Cart.validate(cart);
      return true;
    } catch (error) {
      throw new Error("Carrito no válido");
    }
  }

  static async existCart(cartId) {
    const carts = await this.getCartById(cartId);
    return carts.some((cart) => cart._id === cartId);
  }

  static createCart() {
    return {
      id: this.cartServices.generateId(),
      products: [],
      timestamp: new Date(),
    };
  }

  getCarts = async () => {
    try {
      return await this.cartServices.getItems();
    } catch (err) {
      console.log(err);
    }
  };

  getCartById = async (cartId) => {
    try {
      return await this.cartServices.getById(cartId);
    } catch (err) {
      console.log(err);
    }
  };

  getProductsOnCart = async (cartId) => {
    try {
      const cart = await this.getCartById(cartId);
      return cart.products;
    } catch (err) {
      console.log(err);
    }
  };

  getProduct = async (cartId, productId) => {
    try {
      const cart = await this.getCartById(cartId);
      return cart.products.find((product) => product._id === productId);
    } catch (err) {
      console.log(err);
    }
  };

  saveProductOnCart = async (product, cartId) => {
    try {
      let cart;
      if (cartId) {
        cart = await this.getCartById(cartId);
      } else cart = CartsServices.createCart();

      cart.products = [...cart.products, product];

      const options = { id: cart.id };

      if (!CartsServices.validateCart(cart)) {
        return new Error("formato de post inválido");
      }
      return await this.services.saveItem(cart, options);
    } catch (err) {
      console.log(err);
    }
  };

  updateProductOnCart = async (cartId, product) => {
    try {
      const oldCart = await this.getCartById(cartId);
      const _id = oldCart._id;
      const oldProduct = oldCart.products.find(
        (prod) => prod._id === product._id
      );

      const filteredProducts = oldCart.products.filter(
        (prod) => prod._id === product._id
      );
      const newProduct = { ...oldProduct, ...product };

      const newCart = {
        ...oldCart,
        products: [...filteredProducts, newProduct],
      };
      return await this.services.updateItem(_id, newCart);
    } catch (err) {
      console.log(err);
    }
  };

  deleteProductOnCart = async (cartId, productId) => {
    try {
      const cart = await this.getCartById(cartId);
      const _id = cart._id;
      const filteredProducts = cart.products.filter(
        (prod) => prod._id !== productId
      );
      const newCart = { ...cart, products: filteredProducts };
      return await this.services.updateItem(_id, newCart);
    } catch (err) {
      console.log(err);
    }
  };

  deleteCart = async (cartId) => {
    try {
      const cart = await this.getCartById(cartId);
      const _id = cart._id;
      return await this.services.deleteItem(_id);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = CartsServices.getInstance();
