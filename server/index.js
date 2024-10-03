import express from "express";
import { connectToDB } from "./db/connection.db.js";
import { configureExpressOptions, useCustomErrorHandling } from "./config/express/config.express.js";
import { mountRouterToApplication } from "./router/Router.js";
import { applySecurityStandards } from "./config/security/config.security.js";

const
    PORT = process.env.PORT || 31672,
    app = express(),
    connections = {
        appServer: null
    };

async function initializeApp(){
    // Set the App and Configure App Security
    connections.appServer = applySecurityStandards(
        configureExpressOptions(app)
    );

    // Connect To Database
    connectToDB()
        .then(async () => {
            // Set Middleware
            console.log("TODO: Set Middleware");

            // Mount the Router
            await mountRouterToApplication(connections.appServer);

            // Set Custom Error Middleware Post Router-Mount
            await useCustomErrorHandling(app);

            app.listen(PORT, () => {
                console.log(`${process.env.NODE_ENV} Application Initialized and listening on port: `, PORT);
            });
        });
}

await initializeApp();