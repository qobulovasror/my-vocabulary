import { CustomError } from "../helper/CustomError.js";

export function CustomErrorMiddleware(req, res, next) {
  res.error = CustomError;
  next();
}
