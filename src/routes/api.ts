import express from "express";
import * as signupController from "../controller/signupController";
import * as signinController from "../controller/signinController"; // Import the new controller

const router = express.Router();

// Sign up
router.post("/send-otp", signupController.sendOtp);
router.post("/verify-otp", signupController.verifyOtp);

// Sign in
router.post("/signin-user", signinController.signinUser); // Add the new signin route

export default router;