import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors"
import expressRateLimit from 'express-rate-limit';
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const port = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

app.set('trust proxy', 1);
// Limit 250 requests per minute per IP address
app.use(expressRateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 250, // maximum requests per window
    message: 'Too many requests, please try again later',
  }));

  app.use(express.urlencoded({extended: true})); // Allows to send form data. If I don't add this, I won't be able to send data..

  app.use(express.json()); // this makes req.body available.. else body won't be available

  app.use(cookieParser());


  app.listen(port, () =>{
    console.log(`server is ready and running on port ${port}`.bgGreen)
})
