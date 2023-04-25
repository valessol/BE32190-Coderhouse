class CartDTO {
  constructor({ products, userId, _id, timestamp }) {
    this._id = _id;
    this.products = products;
    this.userId = userId;
    this.timestamp = timestamp;
  }
}

module.exports = CartDTO;
