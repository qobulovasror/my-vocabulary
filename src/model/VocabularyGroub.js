import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";

class VocabularyGroub extends Model {}

VocabularyGroub.init(
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
    }
  },
  {
    sequelize,
    modelName: "vocabulary_groub",
    tableName: "vocabulary_groub",
  }
);


export default VocabularyGroub;
