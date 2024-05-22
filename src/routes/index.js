import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { CustomErrorMiddleware } from "../middleware/CustomErrorMiddleware.js";
import { errorHandlerMiddleware } from "../helper/CustomError.js";

//routers
import user from "./user.js";
import auth from "./auth.js";
import dictionary from "./dictionary.js";

export default function (app) {
  //middlewares
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //use custom error handler
  app.use(CustomErrorMiddleware);

  //routes
  app.use("/api/auth", auth);
  app.use("/api/user", user);

  app.use("/api/dictionary", dictionary);
  // app.use("/api/role", user);
  // app.use("/api/vocabularyGroub", user);

  //use route error handler
  app.use(errorHandlerMiddleware);
}
