const { Router } = require("express");
const controller = require("../controllers/cart.js");

const router = Router();

router.get("/", controller.getCarts);
router.get("/:cartId", controller.getCartById);
router.get("/:cartId/products", controller.getProductsOnCart);
router.get("/:cartId/products/:productId", controller.getProduct);
router.post("/:cartId", controller.saveProductOnCart);
router.put("/:cartId", controller.updateProductOnCart);
router.delete("/:cartId/:productId", controller.deleteProductOnCart);
router.delete("/:cartId", controller.deleteCart);

module.exports = router;
