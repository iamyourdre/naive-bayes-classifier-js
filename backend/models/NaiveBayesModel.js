// Import dependensi yang diperlukan
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

// Tabel NB_phase1
const NB_dataclass = db.define(
  "NB_dataclass",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    probability: {
      type: DataTypes.DOUBLE,
      allowNull: null,
    },
    mean_x1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    mean_x2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    mean_x3: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    mean_x4: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    sd_x1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    sd_x2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    sd_x3: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    sd_x4: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Export model-model yang telah dibuat
export default NB_dataclass;
