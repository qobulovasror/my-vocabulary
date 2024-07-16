import logger from "../middleware/loggerMiddleware.js";
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
      // const contact = msg.contact.phone_number;
      // msg.chat.photo.big_file_id
      bot.sendMessage(
        chatId,
        `Tizimga brauzer orqali kirish uchun kod: <pre>${Math.floor(Math.random() * 100000)}</pre>`, {parse_mode: "HTML"}
      );

      bot.sendMessage(chatId, '"Open App" tugmasi orqali dasturni telegram orqali ishlatishingiz mumkin', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open App',
                web_app: {url: "https://2848-185-213-230-162.ngrok-free.app/"} 
              }
            ]
          ]
        },
      });
      
    });


    bot.onText(/\/getphoto/, async (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;
  
      try {
          const photos = await bot.getUserProfilePhotos(userId);
          if (photos.total_count > 0) {
              // Foydalanuvchining birinchi profil rasmini olish
              const fileId = photos.photos[0][0].file_id;
              const file = await bot.getFile(fileId);
              const fileLink = await bot.getFileLink(fileId);
              
              bot.sendMessage(chatId, `Sizning profil rasm manzilingiz: ${fileLink}`);
          } else {
              bot.sendMessage(chatId, "Profil rasm topilmadi.");
          }
      } catch (error) {
          console.error(error);
          bot.sendMessage(chatId, "Profil rasmingizni olishda xatolik yuz berdi.");
      }
  });


  } catch (error) {
    // console.log(error);
    logger.error(error);
  }
}
