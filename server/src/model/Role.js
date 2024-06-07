import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";

class Role extends Model {}

Role.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "role",
    tableName: "role",
    createdAt: false,
    updatedAt: false
  }
);


export default Role;
