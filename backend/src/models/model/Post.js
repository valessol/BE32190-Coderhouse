const Joi = require("joi");

class Blog {
  constructor(post) {
    this.post = post;
  }

  static validate(post) {
    const PostSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      url: Joi.string(),
      timestamp: Joi.date(),
    });

    const { error } = PostSchema.validate(post);
    if (error) throw error;
  }
}

module.exports = Blog;
