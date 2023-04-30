const CartDTO = require("./carts");
const ProductDTO = require("./products");
const UserDTO = require("./users");

const getDTO = (data, collection) => {
  const models = {
    products: ProductDTO,
    users: UserDTO,
    carts: CartDTO,
  };
  const DTO = models[collection];
  return new DTO(data);
};

const convertToDTO = (data, collection) => {
  if (Array.isArray(data)) return data.map((d) => getDTO(d, collection));
  else return getDTO(data, collection);
};

module.exports = convertToDTO;
