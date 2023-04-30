const DAOFactory = require("../models/DAOs/DAOFactory.js");
const convertToDTO = require("../models/DTOs/DTO.js");
const Cart = require("../models/model/Cart.js");
const cartsSchema = require("../models/schemas/carts.js");

const persistence = DAOFactory.get("carts", cartsSchema);

const validateCart = (cart) => {
  try {
    const { _id: omit, ...rest } = cart;
    Cart.validate(rest);
    return true;
  } catch (error) {
    throw new Error("Carrito no válido");
  }
};

const setDefaultAttr = (cart) => {
  return { ...cart, timestamp: new Date() };
};

const createCart = async (userId = "") => {
  try {
    const newCart = setDefaultAttr({
      products: [],
      userId,
    });

    const cart = await persistence.saveItem(newCart);

    return cart;
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

    if (!cart?._id) cart = await createCart(userId);
    const existProductOnCart = cart.products.find(
      (prod) => prod._id === product._id
    );

    if (existProductOnCart)
      cart.products = [
        ...cart.products.filter((prod) => prod._id !== product._id),
        product,
      ];
    else cart.products = [...cart.products, product];

    if (!validateCart(cart)) {
      return new Error("formato de carrito inválido");
    }

    await persistence.updateItem(cart._id, cart);
    return cart;
  } catch (err) {
    console.log(err);
  }
};

const updateProductOnCart = async (userId, productId, product) => {
  try {
    const cart = await getCartByUserId(userId);

    const updatedProducts = cart.products.map((cartProduct) => {
      if (cartProduct._id === productId) {
        return { _id: productId, quantity: product.quantity };
      } else return cartProduct;
    });

    const newCart = {
      ...cart,
      products: updatedProducts,
    };

    await persistence.updateItem(cart._id, newCart);
    return newCart;
  } catch (err) {
    console.log(err);
  }
};

const removeProductFromCart = async (userId, productId) => {
  console.log("remove");
  try {
    const cart = await getCartByUserId(userId);

    const filteredProducts = cart.products.filter(
      (prod) => prod._id !== productId
    );

    const newCart = {
      ...cart,
      products: [...filteredProducts],
    };

    await persistence.updateItem(cart._id, newCart);
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
  removeProductFromCart,
  deleteCart,
};
