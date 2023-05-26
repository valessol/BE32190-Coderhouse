const blogInstance = require("../services/blog.js");

class BlogController {
  constructor() {
    this.blog = blogInstance;
  }

  getPosts = async (req, res) => {
    try {
      const posts = await this.blog.getPosts();
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
    }
  };

  getPostById = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await this.blog.getPostById(id);
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
    }
  };

  savePost = async (req, res) => {
    try {
      const post = req.body;
      const savedPost = await this.blog.savePost(post);
      res.status(201).json(savedPost);
    } catch (err) {
      console.log(err);
    }
  };

  updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = req.body;
      const updatedPost = await this.blog.updatePost(id, post);
      res.status(200).json(updatedPost);
    } catch (err) {
      console.log(err);
    }
  };

  deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await this.blog.deletePost(id);
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = new BlogController();
