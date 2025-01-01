import express from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cors from "cors";

// Utils
import { connectToDB } from "./db/connection.db.js";
import {
  configureExpressOptions,
  useCustomErrorHandling,
} from "./config/express/config.express.js";
import { mountRouterToApplication } from "./router/Router.js";
import { applySecurityStandards } from "./config/security/config.security.js";

const PORT = process.env.PORT || 31672,
  app = express(),
  connections = {
    appServer: null,
  };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeApp() {
  // Set the App and Configure App Security
  connections.appServer = applySecurityStandards(configureExpressOptions(app));

  // Configure Cookie Parsing
  app.use(cookieParser());

  // Connect To Database
  connectToDB().then(async () => {
    // Mount the Router
    await mountRouterToApplication(connections.appServer);

    // Production Settings
    if (process.env.NODE_ENV === "prod") {
      const pathToServe = path.join(__dirname, "..", "/client/build");
      app.use(express.static(pathToServe));
      app.get("*", (req, res) => {
        return res.sendFile(
          path.resolve(__dirname, "..", "client", "build", "index.html"),
        );
      });
    } else {
      console.log("Cors Being Enabled For Local or Dev Envs...");
      app.options("*", cors());
      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept",
        );
        next();
      });

      app.use(
        cors({
          origin: "*",
        }),
      );

      app.get("/", (req, res) => {
        return res.send("BDXCEU Backend Ping Successful...");
      });
    }

    // Set Custom Error Middleware Post Router-Mount
    await useCustomErrorHandling(app);

    app.listen(PORT, () => {
      console.log(
        `${process.env.NODE_ENV} Application Initialized and listening on port: `,
        PORT,
      );
    });
  });
}

await initializeApp();
