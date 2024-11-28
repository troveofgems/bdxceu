import express from "express";
import { handleFetchTeam } from "../../controllers/team.controller.js";

const teamRouter = express.Router();

teamRouter.route("/").get(handleFetchTeam);

export default teamRouter;
