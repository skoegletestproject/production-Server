const mongoose = require("mongoose");

const deviceTokenSchema = new mongoose.Schema({
  deviceString: { type: String, required: true },
  custommerId: { type: String, required: true },
  devicedetails: { type:Object, required: true },
  email:{type:String,require:true}
});

const DeviceToken = mongoose.model("userDevice", deviceTokenSchema);

module.exports = DeviceToken;
