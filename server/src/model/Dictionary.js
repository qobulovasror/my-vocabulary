import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";

class Dictionary extends Model {}

Dictionary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    translation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transcription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    synonimId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    example: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false
    },
    vocabulary_groub_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "vocabulary_groub",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      defaultValue: 1,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: "dictionary",
    timestamps: true,
    tableName: "dictionary",
    createdAt: "createAt",
    updatedAt: false,
  }
);

export default Dictionary;
