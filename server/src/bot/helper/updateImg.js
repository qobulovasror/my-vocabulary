import User from "../../model/User.js";

async function updateProfileImg(msg, bot) {
  try {
    const userId = msg.from.id;
    const photos = await bot.getUserProfilePhotos(userId);
    if (photos.total_count > 0) {
      // Foydalanuvchining birinchi profil rasmini olish
      const fileId = photos.photos[0][0].file_id;
      const file = await bot.getFile(fileId);
      const fileLink = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
      const user = await User.update(
        { profile_img: fileLink },
        { where: { id: userId } }
      );
      return user;
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    return;
  }
}

export default updateProfileImg;
