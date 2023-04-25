class BlogDTO {
  constructor({ title, content, url, timestamp, _id }) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.url = url;
    this.timestamp = timestamp;
  }
}

module.exports = BlogDTO;
