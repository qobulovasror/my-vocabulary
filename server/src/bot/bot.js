import logger from "../middleware/loggerMiddleware.js";
import TelegramBot from "node-telegram-bot-api";
import { generateToken } from "../helper/token.js";
import User from "../model/User.js";
import updateProfileImg from './helper/updateImg.js'

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
      bot.sendMessage(
        chatId,
        `Assalomu alaykum ${msg.chat.first_name} 👋\nbotga xush kelibsiz!😉\n\nKontaktingizni yuboring (bugmani bosing 👇)`,
        opts
      );
    });

    // Kontaktni qabul qilish
    bot.on("contact", async (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;

      let user = await User.findOne({ where: { id: userId } });
      let token = generateToken({
        id: userId,
        phone_number: msg.contact.phone_number,
      });

      if (user) {
        token = user.dataValues.token;
      } else {
        user = await User.create({
          id: userId,
          chat_id: chatId,
          phone_number: msg.contact.phone_number,
          username: msg.chat?.username || null,
          profil_img: null,
          full_name: (msg.chat?.first_name)? msg.chat?.first_name : "" + (msg.chat?.last_name)? msg.chat?.last_name: "",
          role_id: 1,
          token: token,
        });
      }  

      await updateProfileImg(msg, bot)

      bot.sendMessage(
        chatId,
        '"Open App" tugmasi orqali dasturni telegram orqali ishlatishingiz mumkin',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Open App",
                  web_app: { url: process.env.PROJECT_URL+"/bot/auth/"+token },
                },
              ],
            ],
          },
        }
      );
    });

    
  } catch (error) {
    // console.log(error);
    logger.error(error);
  }
}
