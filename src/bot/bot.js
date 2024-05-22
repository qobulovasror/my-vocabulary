import logger from "../middleware/loggerMiddleware.js";
import { Telegraf } from "telegraf";

export default async function startBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  try {
    bot.start((ctx) => {
      ctx.reply("Welcome to my bot!");
    });
  } catch (error) {
    // console.log(error);
    logger.error(error);
  }
  bot
    .launch()
    .then()
    .catch((err) => console.log(err));
}
