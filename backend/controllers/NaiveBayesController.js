import NB_dataclass from "../models/NaiveBayesModel.js";
import Sample from "../models/SampleModel.js"
import { Sequelize } from "sequelize";


export const NaiveBayesClassifier = async (req, res) => {
  try {
    // calcProbability();
    calcMean();
    // res.status(201).json({
    //     msg: "Data Genre Created!",
    // });
  } catch (error) {
      console.log(error.message);
  }
};

export const calcProbability = async () => {
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

      // if (samples.length > 0) {
      //   // Hitung rata-rata kolom-kolom "x1", "x2", "x3", dan "x4"
      //   const total_x1 = samples.reduce((acc, sample) => acc + sample.x1, 0);
      //   const total_x2 = samples.reduce((acc, sample) => acc + sample.x2, 0);
      //   const total_x3 = samples.reduce((acc, sample) => acc + sample.x3, 0);
      //   const total_x4 = samples.reduce((acc, sample) => acc + sample.x4, 0);

      //   const average_x1 = total_x1 / samples.length;
      //   const average_x2 = total_x2 / samples.length;
      //   const average_x3 = total_x3 / samples.length;
      //   const average_x4 = total_x4 / samples.length;

      //   // Update Mean
      //   await NB_dataclass.update(
      //     {
      //       mean_x1: average_x1,
      //       mean_x2: average_x2,
      //       mean_x3: average_x3,
      //       mean_x4: average_x4,
      //     },
      //     {
      //       where: { genre: d.genre },
      //     }
      //   );
      // }
    }


    console.log("calcMean Done!");
  } catch (error) {
      console.log(error.message);
  }
};

