import jwt from "jsonwebtoken";
import logger from "./loggerMiddleware.js";

async function auth(req, res, next) {
  try {
    if (req.session.token == null || req.session.token.length == 0) {
      res.redirect("/");
    } else {
      next();
    }
  } catch (error) {
    logger.error(error);
    if (!error.statusCode) error = new res.error(401, "Unauthorized!");
    next(error);
  }
}

export default auth;
