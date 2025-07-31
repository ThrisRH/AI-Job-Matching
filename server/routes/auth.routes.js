const authController = require("../controllers/auth.controller");
const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/change-password", verifyToken, authController.changePassword);
router.get("/me", verifyToken, authController.getMe);

module.exports = router;
