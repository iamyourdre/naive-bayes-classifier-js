// Import dependensi yang diperlukan
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

// Tabel NB_phase1
const NBPhase1 = db.define(
  "NB_phase1",
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Tabel NB_phase2
const NBPhase2 = db.define(
  "NB_phase2",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Tabel NB_phase3
const NBPhase3 = db.define(
  "NB_phase3",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Tabel NB_phase4
const NBPhase4 = db.define(
  "NB_phase4",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nd_x1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    nd_x2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    nd_x3: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    nd_x4: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Tabel NB_phase5_result
const NBPhase5Result = db.define(
  "NB_phase5_result",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    probability: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Hubungkan tabel-tabel dengan relasi genre_id sebagai one-to-one
NBPhase1.hasOne(NBPhase2, { foreignKey: "genre_id" });
NBPhase1.hasOne(NBPhase3, { foreignKey: "genre_id" });
NBPhase1.hasOne(NBPhase4, { foreignKey: "genre_id" });
NBPhase1.hasOne(NBPhase5Result, { foreignKey: "genre_id" });

// Export model-model yang telah dibuat
export { NBPhase1, NBPhase2, NBPhase3, NBPhase4, NBPhase5Result };
