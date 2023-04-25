const {
  createCart,
  getCartByUserId,
  saveProductOnCart,
  getCarts,
  updateProductOnCart,
  deleteCart,
} = require("../services/carts.js");
const productsInstance = require("../services/products.js");
const { existUser } = require("../services/auth.js");

class CartsController {
  static instance;

  constructor() {
    this.products = productsInstance;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartsController();
    }
    return this.instance;
  }

  createUserCart = async (req, res) => {
    try {
      const newCart = await createCart();
      res.json(newCart);
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  getAllCarts = async (req, res) => {
    try {
      const carts = await getCarts();
      res.status(200).json(carts);
    } catch (err) {
      console.log(err);
    }
  };

  getByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const isValidUser = await existUser({ _id: userId });

      if (!isValidUser) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
      }

      const cart = await getCartByUserId(userId);
      res.status(200).json(cart);
    } catch (err) {
      return res.status(400).json({ msg: error.message });
    }
  };

  saveProduct = async (req, res) => {
    try {
      const product = req.body;
      const { userId } = req.params;

      const savedCart = await saveProductOnCart(product, userId);
      res.status(201).json(savedCart);
    } catch (err) {
      console.log(err);
    }
  };

  updateProductOnCart = async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const product = req.body;
      console.log(product);
      const updatedProduct = await updateProductOnCart(
        userId,
        productId,
        product
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.log(err);
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await deleteCart(userId);
      res.status(200).json(cart);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = CartsController.getInstance();
