import logger from "../middleware/loggerMiddleware.js";
import TelegramBot from "node-telegram-bot-api";
import generateToken from "../helper/token.js";
import User from "../model/User.js";

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

      // bot.sendMessage(
      //   chatId,
      //   `Tizimga brauzer orqali kirish uchun kod: <pre>${Math.floor(Math.random() * 100000)}</pre>`, {parse_mode: "HTML", reply_markup: { remove_keyboard: true }}
      // );

      //get user's first, last, phone_number, img,
      // check user from db
      // if not in db add and give token
      // else  auth and update token

      let user = await User.findOne({ where: { id: userId } });
      let token = generateToken({
        id: userId,
        phone_number: msg.contact.phone_number,
      });

      if (user) {
        user = await User.update({ token: token }, { where: { id: userId }});
      } else {
        //get user prifile img
        const photos = await bot.getUserProfilePhotos(userId);
        let fileLink = null;
        if (photos.total_count > 0) {
          fileLink = await bot.getFileLink(photos.photos[0][0].file_id);
        }

        user = await User.create({
          id: userId,
          chat_id: chatId,
          phone_number: msg.contact.phone_number,
          username: msg.chat?.username || null,
          profil_img: fileLink,
          full_name: msg.chat?.first_name + msg.chat?.last_name || null,
          role_id: 1,
          token: token,
        });
      }

      bot.sendMessage(
        chatId,
        '"Open App" tugmasi orqali dasturni telegram orqali ishlatishingiz mumkin',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Open App",
                  web_app: { url: process.env.PROJECT_URL+"/bot" },
                },
              ],
            ],
          },
        }
      );
    });

    bot.onText(/\/getphoto/, async (msg) => {
      const userId = userId;

      try {
        const photos = await bot.getUserProfilePhotos(userId);
        if (photos.total_count > 0) {
          // Foydalanuvchining birinchi profil rasmini olish
          const fileId = photos.photos[0][0].file_id;
          const fileLink = await bot.getFileLink(fileId);

          bot.sendMessage(
            chatId,
            `Sizning profil rasm manzilingiz: ${fileLink}`
          );
        } else {
          bot.sendMessage(chatId, "Profil rasm topilmadi.");
        }
      } catch (error) {
        console.error(error);
        bot.sendMessage(
          chatId,
          "Profil rasmingizni olishda xatolik yuz berdi."
        );
      }
    });
  } catch (error) {
    // console.log(error);
    logger.error(error);
  }
}
