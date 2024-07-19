import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";

class Custom_vocabulary extends Model {}

Custom_vocabulary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    translation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
  },
  {
    sequelize,
    modelName: "custom_vocabulary",
    timestamps: true,
    tableName: "custom_vocabulary",
    createdAt: "createAt",
    updatedAt: false,
  }
);

export default Custom_vocabulary;
