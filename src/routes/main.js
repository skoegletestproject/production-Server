const verifyDevice = require("../middlewares/Verify");
const express = require("express");
const {
  SignUp,
  Login,
  verifyJWTAndDevice,
  logout,
} = require("./Auth/UserAuth");
const router = express.Router();

router.post("/auth/Signup", SignUp);
router.post("/auth/login", Login);
router.get("/auth/user/verif", verifyJWTAndDevice);
router.get("/auth/user/logout", verifyDevice, logout);

module.exports = router;
