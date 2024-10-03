import express from "express";
import {testController} from "../../controllers/user.controller.js";

const userRouter = express.Router();

userRouter
    .route('/')
    .get(testController);

// Class Module Signups


export default userRouter;