const verifyDevice = require("../middlewares/Verify");
const express = require("express");
const {
  SignUp,
  Login,
  verifyJWTAndDevice,
  logout,
} = require("./Auth/UserAuth");
const { addUserDevices, getDevices, deleteDevices } = require("./userDevices/userDevices");
const { getUserProfile, UpdateUserProfile, VerifiPasword } = require("./Profile/userProfile");
const { ListCustommerDevices } = require("./UserDeviceManage/Admin");
const router = express.Router();

router.post("/auth/Signup", SignUp);
router.post("/auth/login", Login);
router.get("/auth/user/verif", verifyJWTAndDevice);
router.get("/auth/user/logout", verifyDevice, logout);

router.put("/user/devices/addDevices/:custommerId",addUserDevices);
router.get("/user/devices/getdevices",getDevices)
router.delete("/user/devices/deleteuser/:custommerId",deleteDevices)

router.get("/user/profile",verifyDevice,getUserProfile);
router.put("/user/profile",verifyDevice,UpdateUserProfile);
router.get("/user/profile/verifi/auth/:custommerId",VerifiPasword)

router.get("/user/admin/device/management/:custommerId",ListCustommerDevices)
module.exports = router;
