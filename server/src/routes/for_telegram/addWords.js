import { Router } from "express";
import User from "../../model/User.js";
import CustomVocabulary from "../../model/CustomVocabulary.js";
import auth from "../../middleware/authMiddleware.js";
import { parseJwt } from "../../helper/token.js";

const router = Router();

//get addCustomWord
router.get("/", auth, async (req, res, next) => {
  try {
    console.log(req.body);
    res.render("addCustomWord", { message: null });
  } catch (error) {
    next(error);
  }
});

// add words
router.post("/", auth, async (req, res, next) => {
  try {
    const token = parseJwt(req.session.token);
    await CustomVocabulary.create({
      name: req.body.word,
      translation: req.body.translation,
      description: req.body.description,
      type: req.body.type,
      example: req.body.example,
      user_id: token.id,
    });

    res.render("addCustomWord", { message: "Qo'shildi" });
  } catch (error) {
    next(error);
  }
});

export default router;
