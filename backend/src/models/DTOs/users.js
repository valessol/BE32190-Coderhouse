class UserDTO {
  constructor({ _id, email, username, password, phone, timestamp }) {
    this._id = _id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.phone = phone;
    this.timestamp = timestamp;
  }
}

module.exports = UserDTO;
