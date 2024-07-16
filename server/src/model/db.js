import { Sequelize } from "sequelize";
import logger from "../middleware/loggerMiddleware.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const sequelize = new Sequelize("vocabulary", "root", "", {
//   host: "127.0.0.1",
//   dialect: "mysql",
//   port: 3307,
//   // logging: false
// });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname+'/db/database.sqlite'
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