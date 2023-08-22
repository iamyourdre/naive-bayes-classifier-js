import { NBPhase1, NBPhase2, NBPhase3, NBPhase4, NBPhase5Result } from "../models/NaiveBayesModel.js";
import Sample from "../models/SampleModel.js"
import { Sequelize } from "sequelize";

// Mendaftarkan Genre
export const calcProbability = async (req, res) => {
    try {

        const genres = await Sample.findAll({
          attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('genre')), 'genre']],
          raw: true,
        });
        
        const genreData = []; // Array to store genre data
        const totalData = await Sample.count();
        
        // Get genre name and count quantity for each genre
        for (const g of genres) {
          const countGenre = await Sample.count({
            where: {
              genre: g.genre,
            },
          });
          genreData.push({
            genre: g.genre,
            quantity: countGenre,
            probability: null,
          });

        }
        
        // Calculate genre probability
        for (let i = 0; i < genreData.length; i++) {
          const probability = genreData[i].quantity / totalData;
          genreData[i].probability = probability;
        }

        // Insert genreData into model
        await NBPhase1.bulkCreate(genreData);
        res.status(201).json({
        msg: "Data Genre Created!", // Kirim respons dengan kode status 201 dan pesan sukses
        });
    } catch (error) {
        console.log(error.message);
    }
};