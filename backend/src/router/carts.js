const { Router } = require("express");
const controller = require("../controllers/cart.js");
const { auth } = require("../middlewares/auth.js");

const router = Router();

// Obtener carrito del usuario
router.get("/:userId", auth, controller.getByUserId);
// Guardar un producto en el carrito del usuario
router.post("/:userId", auth, controller.saveProduct);
// Actualizar un producto del carrito
router.put("/:userId/:productId", auth, controller.updateProductOnCart);
// Eliminar un producto del carrito
router.put("/:userId/:productId", auth, controller.updateProductOnCart);
// Eliminar carrito
router.delete("/:userId", auth, controller.deleteCart);

module.exports = router;
