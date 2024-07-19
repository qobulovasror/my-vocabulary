import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "./db.js";

class Destination_word_types extends Model {}

Destination_word_types.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: "destination_word_types",
    tableName: "destination_word_types",
    createdAt: false,
    updatedAt: false
  }
);

export default Destination_word_types;
