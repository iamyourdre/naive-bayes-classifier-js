import express from "express";
import cors from "cors";
import SampleRoute from "./routes/SampleRoute.js";
import NaiveBayesRoute from "./routes/NaiveBayesRoute.js";

const app = express();

app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse JSON request bodies
app.use(SampleRoute);
app.use(NaiveBayesRoute);

app.listen(5000, () => console.log('Server up and running...'));