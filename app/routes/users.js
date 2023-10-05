const express = require("express");
const router = express.Router();
const {
  createUser,
  userLogin,
  userLastLogin,
  getUserById,
  getUserIp,
} = require("../controllers/user");
const {
  userSignUpValidation,
  userLoginValidation,
} = require("../../services/validations/userValidations");
const verifyJwtToken = require("../middlewares/authMiddleware");
const bodyErrorSender = require("../middlewares/bodyErrorSender");

router.post("/sign-up", userSignUpValidation, bodyErrorSender, createUser);
router.post("/login", userLoginValidation, bodyErrorSender, userLogin);
router.get("/:id/last-login", verifyJwtToken, userLastLogin);
router.get("/nearby/:id", verifyJwtToken, getUserById);
router.get("/user-ip", verifyJwtToken, getUserIp);

module.exports = router;
