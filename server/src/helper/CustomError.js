import logger from "../middleware/loggerMiddleware.js";

let CustomError = class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
};

let errorHandlerMiddleware = function (error, req, res, next) {
  logger.error(error);
  res.status(error.code || 500).json({
    ok: false,
    message: error.message || "Internal Server Error",
  });
};

export { CustomError, errorHandlerMiddleware };
