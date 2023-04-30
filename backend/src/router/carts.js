const { Router } = require("express");
const controller = require("../controllers/cart.js");
const { auth } = require("../middlewares/auth.js");

const router = Router();
// Crear carrito
router.get("/create/:userId", auth, controller.createUserCart);
// Obtener carrito del usuario
router.get("/:userId", auth, controller.getByUserId);
// Remover todos los productos del carrito
router.put("/remove/:userId", auth, controller.removeAllProducts);
// Guardar un producto en el carrito del usuario
router.put("/:userId", auth, controller.saveProduct);
// Actualizar/Remover un producto del carrito
router.put("/:userId/:productId", auth, controller.updateProductOnCart);
// Eliminar carrito
router.delete("/:userId", auth, controller.deleteCart);

module.exports = router;
