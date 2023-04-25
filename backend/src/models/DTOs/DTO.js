const BlogDTO = require("./blog");
const CartDTO = require("./carts");
const MessageDTO = require("./messages");
const ProductDTO = require("./products");
const UserDTO = require("./users");

const getDTO = (data, collection) => {
  const models = {
    products: ProductDTO,
    messages: MessageDTO,
    users: UserDTO,
    blog: BlogDTO,
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
