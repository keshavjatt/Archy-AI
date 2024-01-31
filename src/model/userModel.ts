import mongoose, { Document, Schema } from "mongoose";

export interface IUserDocument extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;