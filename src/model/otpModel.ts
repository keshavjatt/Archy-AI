import mongoose, { Document, Schema } from "mongoose";

export interface IOtpDocument extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
}

const otpSchema: Schema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const Otp = mongoose.model<IOtpDocument>("Otp", otpSchema);

export default Otp;