//import packages from node_modules
import Express from "express";
import DotEnv from "dotenv";

//import pakages src
import { db_connect } from "./model/db.js";
import logger from "./middleware/loggerMiddleware.js";
import Routes from "./routes/index.js";
import startBot from './bot/bot.js';

DotEnv.config();

const app = Express();
const PORT = process.env.PORT || 5500;

async function server() {
  try {
    await db_connect();

    Routes(app);
    // startBot().then()

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
    console.log("Server error: ", error);
    process.exit();
  }
}

server().then();
