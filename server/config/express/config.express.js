import express from 'express'
import { notFound, errorHandler } from "../../middleware/Error/error.middleware.js";

export const configureExpressOptions = (app) => {
    let configuredApp = null;

    // Enforce JSON Data
    configuredApp = useJSON(app);

    return configuredApp;
}

export const useCustomErrorHandling = (app) => {
    app.use(notFound);
    app.use(errorHandler);
    return app;
}

const useJSON = (app) => {
    app.use(express.json());
    return app;
}