import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import otpService from "../services/otpService";

export const sendOtp = async (req: Request, res: Response) => {
  const email = req.body.email;
  const otp = otpService.generateOtp();
  await otpService.sendEmail(otp, email);
  await otpService.saveOtp(email, otp);

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  res.json({ token });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1] ?? "";
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    const isValid = await otpService.verifyOtp(decoded.email, req.body.otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({
      message: "OTP verified successfully",
      redirectUrl: "/next-page",
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};