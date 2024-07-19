import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "./db.js";

class Destination_unit extends Model {}

Destination_unit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    book_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "destination_unit",
    tableName: "destination_unit",
    createdAt: false,
    updatedAt: false
  }
);

export default Destination_unit;
