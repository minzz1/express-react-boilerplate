import express from "express";
import {
  loginSuccess,
  postAddMinssion,
  postJoin,
  postLogin,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", postJoin);
userRouter.post("/signin", postLogin);
userRouter.get("/signin/success", loginSuccess);
userRouter.post("/mission/add", postAddMinssion);

export default userRouter;
