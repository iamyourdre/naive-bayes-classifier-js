import express from "express";
import {
    CreateNaiveBayesDataset,
    NaiveBayesClassifier
} from "../controllers/NaiveBayesController.js";

const router = express.Router();

router.post('/CreateNaiveBayesDataset', CreateNaiveBayesDataset);
router.post('/NaiveBayesClassifier', NaiveBayesClassifier);

export default router;