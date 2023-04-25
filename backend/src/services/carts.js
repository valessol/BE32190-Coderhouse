const DAOFactory = require("../models/DAOs/DAOFactory.js");
const convertToDTO = require("../models/DTOs/DTO.js");
const Cart = require("../models/model/Cart.js");
const cartsSchema = require("../models/schemas/carts.js");

const persistence = DAOFactory.get("carts", cartsSchema);

const validateCart = (cart) => {
  try {
    Cart.validate(cart);
    return true;
  } catch (error) {
    throw new Error("Carrito no válido");
  }
};

const createCart = async (userId = "") => {
  try {
    const newCart = {
      products: [],
      userId,
    };

    return await persistence.saveItem(newCart, { userId });
  } catch (error) {
    return error.message;
  }
};

const getCarts = async () => {
  try {
    return await persistence.getItems();
  } catch (err) {
    console.log(err);
  }
};

const getCartById = async (cartId) => {
  try {
    return await persistence.getById(cartId);
  } catch (err) {
    console.log(err);
  }
};

const getCartByUserId = async (userId) => {
  try {
    const carts = await getCarts();
    const selectedCart = carts.find((cart) => cart.userId === userId);

    if (selectedCart) return convertToDTO(selectedCart, "carts");
    return new Error("no existe carrito para el usuario seleccionado");
  } catch (err) {
    console.log(err);
  }
};

const saveProductOnCart = async (product, userId) => {
  try {
    let cart = {};

    if (userId) cart = await getCartByUserId(userId);
    else cart = await createCart();

    const existProductOnCart = cart.products.find(
      (prod) => prod._id === product._id
    );

    if (existProductOnCart)
      cart.products = [
        ...cart.products.filter((prod) => prod._id !== product._id),
        product,
      ];
    else cart.products = [...cart.products, product];

    const options = { _id: cart._id };

    if (!validateCart(cart)) {
      return new Error("formato de post inválido");
    }
    await persistence.saveItem(cart, options);
    return cart;
  } catch (err) {
    console.log(err);
  }
};

const updateProductOnCart = async (userId, productId, product) => {
  try {
    const cart = await getCartByUserId(userId);
    const _id = cart._id;
    const oldProduct = cart.products.find((prod) => prod._id === productId);

    const filteredProducts = cart.products.filter(
      (prod) => prod._id !== productId
    );

    let newProduct;
    let newCart;

    if (Object.keys(product).length) {
      newProduct = { ...oldProduct, ...product };
      newCart = {
        ...cart,
        products: [...filteredProducts, newProduct],
      };
    } else {
      newCart = {
        ...cart,
        products: [...filteredProducts],
      };
    }

    await persistence.updateItem(_id, newCart);
    return newCart;
  } catch (err) {
    console.log(err);
  }
};

const deleteCart = async (userId) => {
  try {
    const cart = await getCartByUserId(userId);
    const _id = cart._id;

    await persistence.deleteItem(_id);
    return cart;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCartByUserId,
  createCart,
  saveProductOnCart,
  getCarts,
  getCartById,
  updateProductOnCart,
  deleteCart,
};
