import express from "express";

import { login, register } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/login",login)
userRouter.post("/register",register)
export {userRouter}


