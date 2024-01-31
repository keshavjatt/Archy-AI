import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (email: string) => {
  return jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};