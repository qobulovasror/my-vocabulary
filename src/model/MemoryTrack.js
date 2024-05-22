import { DataTypes, Model } from "sequelize";
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
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    dictionary_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "dictionary",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    sequelize,
    modelName: "memorytrack",
    tableName: "memorytrack",
  }
);

export default MemoryTrack;
