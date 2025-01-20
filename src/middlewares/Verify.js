const connectDB = require("mb64-connect");
const jwt = require("jsonwebtoken");

const DeviceToken = require("../DB/models/DeviceToken");

const verifyDevice = async (req, res, next) => {
  const token = req.cookies.auth_token;
  console.log(token);
  try {
    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized: No token provided", valid: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC);
    const { custommerId, deviceString } = decoded;

    const validDevice = await DeviceToken.findOne({
      custommerId,
      deviceString,
    });
    if (!validDevice) {
      res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      });
      return res
        .status(401)
        .send({ message: "Unauthorized: Invalid DeviceToken", valid: false });
    }

    req.user = { custommerId, deviceString };
    next();
  } catch (error) {
    console.error("Error in JWT or DeviceToken verification:", error);

    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    });

    res.status(401).send({
      message: "Unauthorized: Invalid token or DeviceToken",
      valid: false,
    });
  }
};

module.exports = verifyDevice;
