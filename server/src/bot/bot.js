import logger from "../middleware/loggerMiddleware.js";
// import { Telegraf } from "telegraf";
import TelegramBot from "node-telegram-bot-api";

export default async function startBot() {
  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
  try {
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const opts = {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Kontaktni yuborish",
                request_contact: true,
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };
      bot.sendMessage(chatId, `Assalomu alaykum ${msg.chat.first_name} 👋\nbotga xush kelibsiz!😉\n\nKontaktingizni yuboring (bugmani bosing 👇)`, opts);
    });

    // Kontaktni qabul qilish
    bot.on("contact", (msg) => {
      const chatId = msg.chat.id;
      const contact = msg.contact;

      bot.sendMessage(
        chatId,
        `Tizimga browzer orqali kirish uchun kod: <pre>${Math.floor(Math.random() *100000)}</pre>`, {parse_mode: "HTML"}
      );

      bot.sendMessage(chatId, '"Open App" tugmasi orqali dasturni telegram orqali ishlatishingiz mumkin', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open Web App',
                web_app: {url: "https://u6972986287.jprq.app"} 
              }
            ]
          ]
        }
      });
      
    });
  } catch (error) {
    // console.log(error);
    logger.error(error);
  }
}
