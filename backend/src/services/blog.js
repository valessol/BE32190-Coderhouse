const config = require("../../config.js");
const DAOFactory = require("../models/DAOs/DAOFactory.js");
const Post = require("../models/model/Post.js");
const blogSchema = require("../models/schemas/blog.js");

class BlogServices {
  static instance;

  constructor() {
    this.services = DAOFactory.get("blog", blogSchema);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new BlogServices();
    }
    return this.instance;
  }

  static validatePost(post) {
    try {
      Post.validate(post);
      return true;
    } catch (error) {
      throw new Error("Post no válido");
    }
  }

  static setDefaultAttr(post) {
    let newPost = { ...post, timestamp: new Date() };
    if (!newPost.url)
      newPost.url = `${config.CLOUDINARY_BASE_URL}/Avatars/img_ckql0i.png`;

    return newPost;
  }

  getPosts = async () => {
    try {
      const posts = await this.services.getItems();
      return posts;
    } catch (err) {
      console.log(err);
    }
  };

  getPostById = async (_id) => {
    try {
      const post = await this.services.getById(_id);
      return post;
    } catch (err) {
      console.log(err);
    }
  };

  savePost = async (post) => {
    try {
      const options = { title: post.title, url: post.url };
      const newPost = BlogServices.setDefaultAttr(post);

      if (!BlogServices.validatePost(newPost)) {
        return new Error("formato de post inválido");
      }
      return await this.services.saveItem(newPost, options);
    } catch (err) {
      console.log(err);
    }
  };

  updatePost = async (_id, post) => {
    try {
      const updatedPost = await this.services.updateItem(_id, post);
      return updatedPost;
    } catch (err) {
      console.log(err);
    }
  };

  deletePost = async (_id) => {
    try {
      const post = await this.services.deleteItem(_id);
      return post;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = BlogServices.getInstance();
