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
const { GetDeviceLogin, DeleteDevice } = require("./Device/device");
const { GetAllUsersForAdmin, DeleteuserforAdmin } = require("./Device/userMangement");
const { AddDeviceforRegister, UpdateRegisterddevice,deletedmargDevices,GetAddedDevices, verifuserwithdevice,AddbyAdmin, deleteDeviceForUser } = require("./registerdevice/adddevices");
const { DeviceLogs, DeviceRealTime, GetDeviceLogs, GetRealtime, addDeviceRealtime } = require("./Vmarg/vmargreq");
// const { CreateGeoFencing, GetGeoFencing, UpdateGeoFencing, DeleteGeoFencing } = require("./GeoFencing/geofencing");
const { GetLocation,
  PushVidios,
  FilterVidios,
  CheckLive } = require("./Dmarg/Dmarg");

const router = express.Router();

router.post("/auth/Signup", SignUp);
router.post("/auth/login", Login);
router.get("/auth/user/verif", verifyJWTAndDevice);
router.get("/auth/user/logout", verifyDevice, logout);

router.put("/user/devices/addDevices/:custommerId",addUserDevices);
router.get("/user/devices/getdevices",verifyDevice,getDevices)
router.delete("/user/devices/deleteuser/:custommerId",deleteDevices)

router.get("/devices/users/admin/custommer",verifyDevice,GetDeviceLogin)
router.delete("/devices/users/admin/custommer/:deviceString",verifyDevice,DeleteDevice)
router.get("/devices/users/admin/custommer/myusers",verifyDevice,GetAllUsersForAdmin)
router.delete("/device/admin/custommer/:custommerId",DeleteuserforAdmin)


router.get("/user/profile",verifyDevice,getUserProfile);
router.put("/user/profile",verifyDevice,UpdateUserProfile);
router.get("/user/profile/verifi/auth/:custommerId",VerifiPasword)

router.get("/user/admin/device/management/:custommerId",ListCustommerDevices)


router.post("/dmarg/device/add",AddDeviceforRegister)
router.put("/dmarg/device/update",UpdateRegisterddevice)
router.delete("/dmarg/device/delete/:id",deletedmargDevices)
router.get("/dmarg/devices/get/:id",GetAddedDevices)
router.delete("/dmarg/device/delete",verifyDevice,deleteDeviceForUser)




router.post("/verify/adddevice",verifuserwithdevice)
router.post("/addbyadmin/device",AddbyAdmin)


router.post("/logs",DeviceLogs)
router.put("/realtime/:deviceName",DeviceRealTime)
router.get("/find/logs",GetDeviceLogs)
router.get("/realtime/:deviceName",GetRealtime)
router.post("/realtime/logs",addDeviceRealtime)


//Geofencing
// router.post('/device/geofencing', CreateGeoFencing);
// router.get('/geofencing', GetGeoFencing);
// router.put('/geofencing/:id', UpdateGeoFencing);
// router.delete('/geofencing/:id', DeleteGeoFencing);

//Dmarg 

router.post('/dmarg/pushlocation',GetLocation);
router.post('/dmarg/pushvidios',PushVidios);
router.get('/dmarg/filtervidios',FilterVidios);
router.get('/dmarg/checklive',CheckLive);




module.exports = router;
