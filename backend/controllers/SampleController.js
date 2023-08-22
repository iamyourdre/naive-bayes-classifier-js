import Sample from "../models/SampleModel.js";
import Sequelize from 'sequelize';

// Dapatkan semua data sample
export const getSample = async (req, res) => {
  try {
    const response = await Sample.findAll({
      raw: true,
    }); // Execute SELECT * FROM sample query using the Sample model
    res.status(200).json(response); // Kirim respons dengan kode status 200 dan data sample yang ditemukan
  } catch (error) {
    console.log(error.message);
  }
};

// Dapatkan daftar genre (tanpa duplikasi)
export const getSampleGenre = async (req, res) => {
  try {
    const response = await Sample.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('genre')), 'genre']],
        raw: true,
    });
    res.status(200).json(response); // Kirim respons dengan kode status 200 dan data sample yang ditemukan
  } catch (error) {
    console.log(error.message);
  }
};

// Buat data sample baru
export const createSample = async (req, res) => {
  try {
    await Sample.create(req.body); // Buat entitas data sample baru menggunakan model Sample
    res.status(201).json({
      msg: "Data Sample Created!", // Kirim respons dengan kode status 201 dan pesan sukses
    });
  } catch (error) {
    console.log(error.message);
  }
};

