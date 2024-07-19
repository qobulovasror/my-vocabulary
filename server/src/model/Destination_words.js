import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "./db.js";

class Destination_words extends Model {}

Destination_words.init(
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
    },
    translate: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    definition: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    other_translate: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    synonym: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    antonym: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    word_types_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "destination_word_types",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
    },
    unit_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "destination_unit",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "destination_words",
    tableName: "destination_words",
    createdAt: false,
    updatedAt: false,
  }
);

export default Destination_words;
