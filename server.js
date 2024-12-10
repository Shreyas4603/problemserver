import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import expressRateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import client from "./redisClient.js"; // Import the Redis client

// Routes
import serverStatusRoutes from './routes/serverStatusRoute.js';
import { userRouter } from "./routes/userRoutes.js";
import problemRouter from "./routes/problemRoute.js";

dotenv.config();
connectDB();

// Create a Redis client
(async () => {
    try {
        await client.connect();
        console.log('Connected to Redis'.bgWhite);

        // Clear all Redis cache at server startup
        await client.flushAll(); // Clear all databases
        console.log('Redis cache cleared'.brightGreen);

        const port = process.env.PORT || 8080;
        const app = express();
        
        app.use(cors({ 
            origin: ['*',"http://localhost:5173",
                "http://13.234.29.166:8080",//backend
                "https://13.234.29.166:8080",//backend
                "https://ec2-13-234-29-166.ap-south-1.compute.amazonaws.com",//backend
                "http://ec2-13-234-29-166.ap-south-1.compute.amazonaws.com",//backend
                "http://65.2.126.202:9000","https://65.2.126.202:9000",//Compiler
                "https://ec2-65-2-126-202.ap-south-1.compute.amazonaws.com","http://ec2-65-2-126-202.ap-south-1.compute.amazonaws.com",//Compiler
            ], 
            credentials: true 
        }));
        
        app.set("trust proxy", 1);
        // Limit 250 requests per minute per IP address
        app.use(
            expressRateLimit({
                windowMs: 60 * 1000, // 1 minute window
                max: 250, // maximum requests per window
                message: "Too many requests, please try again later",
            })
        );

        app.use(express.urlencoded({ extended: true })); // Allows to send form data. If I don't add this, I won't be able to send data..
        app.use(express.json()); // this makes req.body available.. else body won't be available
        app.use(cookieParser());

        // API-Routes only
        app.use('/', serverStatusRoutes);
        app.use('/api/user', userRouter);
        app.use('/api/problem', problemRouter);

        app.listen(port, () => {
            console.log(`server is ready and running on port ${port}`.brightYellow);
            console.log(`URL : http://localhost:${port}`.blue);
        });
    } catch (error) {
        console.error('Error connecting to Redis:', error);
        process.exit(1); // Exit the process if Redis connection fails
    }
})();
