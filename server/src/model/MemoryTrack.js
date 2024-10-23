import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "./db.js";

class MemoryTrack extends Model {}

MemoryTrack.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    dictionary_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "custom_vocabulary",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    sequelize,
    modelName: "memorytrack",
    tableName: "memorytrack",
    createdAt: "createAt",
    updatedAt: false
  }
);

export default MemoryTrack;
