import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    getAllProblems,
    getProblemById,
    createProblem,
    updateProblem,
    deleteProblem,
    findProblemsByToughnessLevel,
    findProblemIdsByToughnessLevel
} from "../controllers/problemController.js";

const problemRouter = express.Router();

// Get all problems (protected)
problemRouter.get("/all", protect, getAllProblems);

// Get all problems by toughness level (protected)
problemRouter.get("/all/:level", protect, findProblemsByToughnessLevel);


// Get all problem ids  by toughness level (protected)
problemRouter.get("/all/id/:level", protect, findProblemIdsByToughnessLevel);

// Get a problem by ID (protected)
problemRouter.get("/:id", protect, getProblemById);

// Create a new problem (protected)
problemRouter.post("/add", protect, createProblem);

// Update a problem by ID (protected)
problemRouter.put("/update/:id", protect, updateProblem);

// Delete a problem by ID (protected)
problemRouter.delete("/delete/:id", protect, deleteProblem);

export default problemRouter;
