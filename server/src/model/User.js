import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "./db.js";

class User extends Model {}

User.init(
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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "role",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      defaultValue: 2,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
    tableName: "user",
    createdAt: "createAt",
    updatedAt: false,
  }
);

// console.log(User === sequelize.models.User);

export default User;
