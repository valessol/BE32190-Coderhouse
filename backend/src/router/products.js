const { Router } = require("express");
const controller = require("../controllers/products.js");
const { auth } = require("../middlewares/auth.js");

const router = Router();

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.post("/", auth, controller.saveProduct);
router.put("/:id", auth, controller.updateProduct);
router.delete("/:id", auth, controller.deleteProduct);

module.exports = router;
