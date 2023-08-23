import express from "express";
import { 
    NaiveBayesClassifier
} from "../controllers/NaiveBayesController.js";

const router = express.Router();

// Define routes and their corresponding controller functions
router.post('/NaiveBayesClassifier', NaiveBayesClassifier); // Route to get all sample data

export default router;