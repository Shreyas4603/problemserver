import express from "express";
import { serverRunning, serverStatus } from "../controllers/serverStatusController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", serverRunning);  // Default route to check server status
router.get("/status", protect,serverStatus);  // Route to get server status details

export default router;
