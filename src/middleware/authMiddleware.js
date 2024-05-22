import jwt from "jsonwebtoken";
import logger from "./loggerMiddleware.js";

async function auth(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      throw new res.error(401, "Token not found");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN_KEY);
    if (!data)
      throw new res.error(401, "Unauthorized");
    req.user = data;
    next();
  } catch (error) {
    logger.error(error);
    if (!error.statusCode) error = new res.error(401, "Unauthorized!");
    next(error);
  }
}

export default auth;
