import { Sequelize, DataTypes, Model } from "sequelize";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";

class Word_examples extends Model {}

Word_examples.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    example: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    custom_vocabulary_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "custom_vocabulary",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      defaultValue: 1,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "word_examples",
    tableName: "word_examples",
  }
);


export default Word_examples;
