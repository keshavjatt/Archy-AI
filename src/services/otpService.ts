import Otp, { IOtpDocument } from "../model/otpModel";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export interface IOtpService {
  generateOtp(): string;
  sendEmail(otp: string, email: string): Promise<void>;
  saveOtp(email: string, otp: string): Promise<IOtpDocument>;
  verifyOtp(email: string, otp: string): Promise<boolean>;
}

const otpService: IOtpService = {
  generateOtp: () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  },

  sendEmail: async (otp, email) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Your OTP",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  },

  saveOtp: async (email, otp) => {
    const existingOtp = await Otp.findOne({ email });
    if (existingOtp) {
      existingOtp.otp = otp;
      existingOtp.expiresAt = new Date();
      existingOtp.expiresAt.setMinutes(existingOtp.expiresAt.getMinutes() + 5);
      await existingOtp.save();
      return existingOtp;
    } else {
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 5);
      const newOtp = new Otp({ email, otp, expiresAt });
      return newOtp.save();
    }
  },

  verifyOtp: async (email, password) => {
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      otpRecord && (await Otp.deleteOne({ _id: otpRecord._id }));
      return false;
    }

    // Check if the provided password matches the stored OTP
    if (otpRecord.otp !== password) {
      return false;
    }

    await Otp.deleteOne({ _id: otpRecord._id });
    return true;
  },
};

export default otpService;