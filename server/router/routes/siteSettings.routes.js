import express from "express";
import { handleFetchSiteSettings } from "../../controllers/site-settings.controller.js";

const siteSettingsRouter = express.Router();

siteSettingsRouter.route("/").get(handleFetchSiteSettings);

export default siteSettingsRouter;
