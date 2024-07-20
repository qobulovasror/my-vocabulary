import { Router } from "express";
import User from "../../model/User.js";
import { parseJwt } from "../../helper/token.js";

const router = Router();

//get home
router.get("/:token", async (req, res, next) => {
  try {
    if (req.session.token && req.session.token.length > 0) {
      return res.redirect("/bot");
    }
    const token = parseJwt(req.params.token);
    const user = await User.findOne({ where: { id: token?.id } });
    if (!user) return res.redirect("/");
    let newSession = req.session;
    newSession.token = req.params.token;
    res.redirect("/bot");
  } catch (error) {
    next(error);
  }
});

export default router;
