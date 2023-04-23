const Joi = require("joi");

class User {
  constructor(user) {
    this.user = user;
  }

  static validate(user) {
    const UserSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      phone: Joi.number(),
      email: Joi.string().required(),
      timestamp: Joi.date(),
    });

    const { error } = UserSchema.validate(user);
    if (error) throw error;
  }
}

module.exports = User;
