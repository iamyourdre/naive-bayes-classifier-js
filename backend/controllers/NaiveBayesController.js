import NB_dataclass from "../models/NaiveBayesModel.js";
import Sample from "../models/SampleModel.js"
import { Sequelize } from "sequelize";
import { erf } from 'mathjs';

// Calculate "sample" table with Naive Bayes algorithm
// and will be summarized as "NB_dataclass" table
export const CreateNaiveBayesDataset = async (req, res) => {
  try {
    
    await calcGenre();
    await calcMean();
    await calcStdev();

    res.status(201).json({
        msg: "CreateNaiveBayesDataset done!"
    });
  } catch (error) {
      console.log(error.message);
  }
};

// Classify genre from your input
export const NaiveBayesClassifier = async (req, res) => {
  try {
    const { x1, x2, x3, x4 } = req.body;

    const normDistData = await calcNormDist(x1, x2, x3, x4);
    const probData = await calcProbability(normDistData);
    const result = await calcResult(probData);

    res.status(201).json({
        msg: "Calculation Completed! Your input is classified as:",
        result: result,
        // probData: probData
    });
  } catch (error) {
      console.log(error.message);
  }
};

export const calcGenre = async () => {
  try {
      const genres = await Sample.findAll({
          attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('genre')), 'genre']],
          raw: true,
      });

      const processedData = [];
      const totalData = await Sample.count();

      for (const g of genres) {
          const countGenre = await Sample.count({
              where: {
                  genre: g.genre,
              },
          });
          processedData.push({
              genre: g.genre,
              quantity: countGenre,
          });
      }
      
      for (let i = 0; i < processedData.length; i++) {
        processedData[i].probability = processedData[i].quantity / totalData;
    }

      await NB_dataclass.bulkCreate(processedData);
      
      console.log("calcProbability Done!");
  } catch (error) {
      console.log(error.message);
      throw error; 
  }
};

export const calcMean = async () => {
  try {
    
    const dataClass = await NB_dataclass.findAll();

    for (const d of dataClass) {
      // Ambil semua data dengan genre yang sesuai
      const samples = await Sample.findAll({
        where: {
          genre: d.genre,
        },
        raw: true,
      });

      if (samples.length > 0) {
        // Hitung rata-rata kolom-kolom "x1", "x2", "x3", dan "x4"
        const total_x1 = samples.reduce((acc, sample) => acc + sample.x1, 0);
        const total_x2 = samples.reduce((acc, sample) => acc + sample.x2, 0);
        const total_x3 = samples.reduce((acc, sample) => acc + sample.x3, 0);
        const total_x4 = samples.reduce((acc, sample) => acc + sample.x4, 0);

        const average_x1 = total_x1 / samples.length;
        const average_x2 = total_x2 / samples.length;
        const average_x3 = total_x3 / samples.length;
        const average_x4 = total_x4 / samples.length;

        // Update Mean
        await NB_dataclass.update(
          {
            mean_x1: average_x1,
            mean_x2: average_x2,
            mean_x3: average_x3,
            mean_x4: average_x4,
          },
          {
            where: { genre: d.genre },
          }
        );
      }
    }


    console.log("calcMean Done!");
  } catch (error) {
      console.log(error.message);
      throw error; 
  }
};

export const calcStdev = async () => {
  try {
    const dataClass = await NB_dataclass.findAll();

    for (const d of dataClass) {
      // Ambil semua data dengan genre yang sesuai
      const samples = await Sample.findAll({
        where: {
          genre: d.genre,
        },
        raw: true,
      });

      if (samples.length > 0) {
        // Hitung rata-rata kolom-kolom "x1", "x2", "x3", dan "x4"
        const mean_x1 = samples.reduce((acc, sample) => acc + sample.x1, 0) / samples.length;
        const mean_x2 = samples.reduce((acc, sample) => acc + sample.x2, 0) / samples.length;
        const mean_x3 = samples.reduce((acc, sample) => acc + sample.x3, 0) / samples.length;
        const mean_x4 = samples.reduce((acc, sample) => acc + sample.x4, 0) / samples.length;

        // Hitung varians kolom-kolom "x1", "x2", "x3", dan "x4"
        const variance_x1 = samples.reduce((acc, sample) => acc + Math.pow(sample.x1 - mean_x1, 2), 0) / samples.length;
        const variance_x2 = samples.reduce((acc, sample) => acc + Math.pow(sample.x2 - mean_x2, 2), 0) / samples.length;
        const variance_x3 = samples.reduce((acc, sample) => acc + Math.pow(sample.x3 - mean_x3, 2), 0) / samples.length;
        const variance_x4 = samples.reduce((acc, sample) => acc + Math.pow(sample.x4 - mean_x4, 2), 0) / samples.length;

        // Hitung standar deviasi dari varians
        const sd_x1 = Math.sqrt(variance_x1);
        const sd_x2 = Math.sqrt(variance_x2);
        const sd_x3 = Math.sqrt(variance_x3);
        const sd_x4 = Math.sqrt(variance_x4);

        // Update Standar Deviasi
        await NB_dataclass.update(
          {
            sd_x1: sd_x1,
            sd_x2: sd_x2,
            sd_x3: sd_x3,
            sd_x4: sd_x4,
          },
          {
            where: { genre: d.genre },
          }
        );
      }
    }

    console.log("calcStdev Done!");
  } catch (error) {
    console.log(error.message);
    throw error; 
  }
};


export const calcNormDist = async (x1, x2, x3, x4) => {
  try {
    
    const dataClass = await NB_dataclass.findAll();

    const normDistData = [];

    for (const d of dataClass) {
      normDistData.push({
          genre: d.genre,
          nd_x1: 0.5 * (1 + erf(((x1 - d.mean_x1) / d.sd_x1) / Math.sqrt(2))),
          nd_x2: 0.5 * (1 + erf(((x2 - d.mean_x2) / d.sd_x2) / Math.sqrt(2))),
          nd_x3: 0.5 * (1 + erf(((x3 - d.mean_x3) / d.sd_x3) / Math.sqrt(2))),
          nd_x4: 0.5 * (1 + erf(((x4 - d.mean_x4) / d.sd_x4) / Math.sqrt(2))),
      });
    }

    console.log("calcNormDist Done!");
    
    return normDistData;
  } catch (error) {
    console.log(error.message);
    throw error; 
  }
};

export const calcProbability = async (normDistData) => {
  try {
    
    const dataClass = await NB_dataclass.findAll();

    const probData = [];

    for (let i = 0; i < normDistData.length; i++) {
      probData.push({
          genre: normDistData[i].genre,
          probability: dataClass[i].probability*normDistData[i].nd_x1*normDistData[i].nd_x2*normDistData[i].nd_x3*normDistData[i].nd_x4
      });
    }

    console.log("calcProbability Done!");
    
    return probData;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const calcResult = async (probData) => {
  try {

    const result = [];
    
    let genreWithMaxProbability = "";
    let maxProbability = -Infinity;

    for (let i = 0; i < probData.length; i++) {
      const { genre, probability } = probData[i];

      if (probability > maxProbability) {
        genreWithMaxProbability = genre;
        maxProbability = probability;
      }

    }
    
    result.push({
      genreIs: genreWithMaxProbability,
      probability: maxProbability
    });

    console.log("calcResult Done!");
    
    return result;
  } catch (error) {
    console.log(error.message);
    throw error; 
  }
};