class BlogDTO {
  constructor({ title, url, content, timestamp, _id }) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.timestamp = timestamp;
    this.url = url;
  }
}

module.exports = BlogDTO;
