import express from "express";
import { 
    calcProbability
} from "../controllers/NaiveBayesController.js";

const router = express.Router();

// Define routes and their corresponding controller functions
router.post('/calcProbability', calcProbability); // Route to get all sample data

export default router;