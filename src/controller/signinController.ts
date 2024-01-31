import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import otpService from "../services/otpService";

export const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if the email and password fields are present
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Generate a new JWT token for the user
  const newToken = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });

  // Return the JWT token in the response for a successful login
  res.json({ message: "Login successful", token: newToken });
};