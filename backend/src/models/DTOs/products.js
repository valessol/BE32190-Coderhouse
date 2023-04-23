class ProductDTO {
  constructor({ title, price, stock, thumbnail, timestamp, _id }) {
    this._id = _id;
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.thumbnail = thumbnail;
    this.timestamp = timestamp;
  }
}

module.exports = ProductDTO;
