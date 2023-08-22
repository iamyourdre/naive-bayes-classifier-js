import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Sample = db.define(
  "sample",
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
    },
    x1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    x2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    x3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    x4: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

(async () => {
  await db.sync();
})();

export default Sample;