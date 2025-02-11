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
const corsOptions = {
  origin: [
    "http://localhost:5174",
    "https://geocam.skoegle.in",
    "https://production-client-5ahd.onrender.com",
    "http://localhost:5001",
     "http://localhost:5002",
    "https://prod-vmarg.onrender.com",
    "https://vmarg.skoegle.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization", // If your requests include tokens in the header
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Explicitly handle preflight OPTIONS requests

app.use("/api", router);
app.get("/ping",(req,res)=>{
  res.send({message:"We Got your Request",Loading:false})
})


connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT ${process.env.PORT}`);
});
