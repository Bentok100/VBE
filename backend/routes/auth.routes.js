import express from "express";
import { signIn, signUp ,signOut, SendOtp, verifyOtp, resetPassword} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/signin",signIn);
authRouter.post("/sendOtp",SendOtp);
authRouter.post("/verifyOtp",verifyOtp);
authRouter.post("/resetPassword",resetPassword);
authRouter.get("/signout",signOut);

export default authRouter;

