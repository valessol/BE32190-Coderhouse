const { Router } = require("express");
const controller = require("../controllers/blog.js");

const router = Router();

router.get("/", controller.getPosts);
router.get("/:id", controller.getPostById);
router.post("/", controller.savePost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;
