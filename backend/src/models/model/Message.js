const Joi = require("joi");

class Message {
  constructor(message) {
    this.message = message;
  }

  static validate(message) {
    const MessageSchema = Joi.object({
      type: Joi.string(),
      email: Joi.string().required(),
      body: Joi.string().required(),
      timestamp: Joi.date(),
    });

    const { error } = MessageSchema.validate(message);
    if (error) throw error;
  }
}

module.exports = Message;
