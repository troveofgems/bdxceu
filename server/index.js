import express from "express";
import { connectToDB } from "./db/connection.db.js";
import {
  configureExpressOptions,
  useCustomErrorHandling,
} from "./config/express/config.express.js";
import { mountRouterToApplication } from "./router/Router.js";
import { applySecurityStandards } from "./config/security/config.security.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 31672,
  app = express(),
  connections = {
    appServer: null,
  };

const allowedOrigins = [
  "localhost",
  "http://localhost:3000", // React App's URL
  "http://localhost:31670", // Localhost Dev & Postman URL
  "https://bdxceu-frontend.onrender.com", // Development Hosted FE URL
  "https://bdxceu-backend.onrender.com", // Development Hosted FE URL
  "https://bdxceu.com", // Production URL
  "https://www.bdxceu.com", // Production URL
];

const corsOptions = {
  origins: function (origin, callback) {
    if (!origin || !allowedOrigins.includes(origin)) {
      return callback("Origin not allowed");
    }
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Origin",
    "Set-Cookie",
  ],
  credentials: true,
};

async function initializeApp() {
  // Set the App and Configure App Security
  connections.appServer = applySecurityStandards(configureExpressOptions(app));

  // Enable CORs
  app.use(cors(corsOptions));

  // Configure Cookie Parsing
  app.use(cookieParser());

  // Connect To Database
  connectToDB().then(async () => {
    // Set Middleware
    console.log("TODO: Set Middleware");

    // Mount the Router
    await mountRouterToApplication(connections.appServer);

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
