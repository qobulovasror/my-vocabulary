import Express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import { CustomErrorMiddleware } from "../middleware/CustomErrorMiddleware.js";
import { errorHandlerMiddleware } from "../helper/CustomError.js";

//routers
// import user from "./user.js";
// import auth from "./auth.js";
// import dictionary from "./dictionary.js";
// import role from "./role.js";
// import track from "./track.js";

//routers for telegram bot app
import home from './for_telegram/home.js';
// import login from './for_web/login.js';

//routers for web
// import home from './for_web/home.js';
// import login from './for_web/login.js';

export default function (app) {
  app.use(
    session({
      secret: "randomstringsessionsecret",
      resave: true,
      saveUninitialized: true,
      cookie: { secure: true }
    })
  );

  //middlewares
  app.set('view engine', 'ejs');
  app.use(Express.static("public"))
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //use custom error handler
  app.use(CustomErrorMiddleware);

  //======== ROUTES FOR API ========
  // app.use("/api/auth", auth);
  // app.use("/api/user", user);

  // app.use("/api/dictionary", dictionary);
  // app.use("/api/role", role);
  // app.use("/api/track", track);

  // ======== ROUTES FOR TELEGRAM WEB ========
  app.use("/bot", home);

  // ======== ROUTES for Web ========
  // app.use("/", home);
  // app.use("/login", login);
  // app.use("/register", register);
  // app.use("/dictionary", dictionary);




  //use route error handler
  app.use(errorHandlerMiddleware);
}
