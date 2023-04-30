class UserDTO {
  constructor({
    _id,
    email,
    username,
    password,
    phone,
    confirmed,
    token,
    timestamp,
  }) {
    this._id = _id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.phone = phone;
    this.confirmed = confirmed;
    this.token = token;
    this.timestamp = timestamp;
  }
}

module.exports = UserDTO;
