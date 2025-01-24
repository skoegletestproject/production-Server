const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const router = require("./src/routes/main");
const connectDB = require("./src/DB/db");

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://geocam.skoegle.in",
      "https://production-client-5ahd.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use("/api", router);
app.get("/ping",(req,res)=>{
  res.send({message:"We Got your Request",Loading:false})
})
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT ${process.env.PORT}`);
});
