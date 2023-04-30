class ProductDTO {
  constructor({ title, price, stock, url, description, category, _id }) {
    this._id = _id;
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.url = url;
    this.description = description;
  }
}

module.exports = ProductDTO;
