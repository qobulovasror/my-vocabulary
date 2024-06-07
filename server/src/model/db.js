import { Sequelize } from "sequelize";
import logger from "../middleware/loggerMiddleware.js";


const sequelize = new Sequelize("vocabulary", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3307,
  // logging: false
});

 async function db_connect(){
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      logger.error(error);
      console.error("Unable to connect to the database:", error);
    }
}


export { sequelize, db_connect };