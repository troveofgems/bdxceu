import express from "express";
import {
  handleFetchUserProfile,
  handleUpdateUserProfile,
} from "../../controllers/user.controller.js";

import { level1Protection } from "../../middleware/jwt.route.auth.middleware.js";

const userRouter = express.Router();

userRouter
  .use(level1Protection)
  .route("/profile")
  .get(handleFetchUserProfile)
  .put(handleUpdateUserProfile);

export default userRouter;
