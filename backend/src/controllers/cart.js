const {
  createCart,
  getCartByUserId,
  saveProductOnCart,
  getCarts,
  updateProductOnCart,
  removeProductFromCart,
  removeAllProductsFromCart,
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
      const { userId } = req.params;
      const newCart = await createCart(userId);
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
      return res.status(400).json({ msg: err.message });
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
      return res.status(400).json({ msg: err.message });
    }
  };

  saveProduct = async (req, res) => {
    try {
      const product = req.body;
      const { userId } = req.params;

      const savedCart = await saveProductOnCart(product, userId);
      res.status(201).json(savedCart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  };

  updateProductOnCart = async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const product = req.body;

      let updatedCart;
      if (!Object.keys(product).length)
        updatedCart = await removeProductFromCart(userId, productId);
      else updatedCart = await updateProductOnCart(userId, productId, product);
      res.status(200).json(updatedCart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  };

  removeAllProducts = async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedCart = await removeAllProductsFromCart(userId);
      res.status(200).json(updatedCart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await deleteCart(userId);
      res.status(200).json(cart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  };
}

module.exports = CartsController.getInstance();
