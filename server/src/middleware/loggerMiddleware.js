import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./logs/error.log", level: "error" }),
  ],
});


export default logger;
