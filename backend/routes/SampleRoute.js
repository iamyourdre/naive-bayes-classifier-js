import express from "express";
import { 
    getSample,
    getSampleGenre,
    createSample,
} from "../controllers/SampleController.js";

const router = express.Router();

// Define routes and their corresponding controller functions
router.get('/sample', getSample); // Route to get all sample data
router.get('/sampleGenre', getSampleGenre); // Route to get all sample data
router.post('/sample', createSample); // Route to create a new sample data

export default router;