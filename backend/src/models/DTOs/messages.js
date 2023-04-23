class MessageDTO {
  constructor({
    _id,
    email,
    name,
    surname,
    age,
    alias,
    avatar,
    message,
    timestamp,
  }) {
    this._id = _id;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.alias = alias;
    this.avatar = avatar;
    this.message = message;
    this.timestamp = timestamp;
  }
}

module.exports = MessageDTO;
