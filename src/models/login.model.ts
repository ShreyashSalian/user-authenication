import mongoose, { Types, ObjectId, Schema } from "mongoose";

interface LoginDocument extends Document {
  _id: string;
  email: string;
  userId: Types.ObjectId;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const loginSchema = new Schema<LoginDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const Login = mongoose.model<LoginDocument>("Login", loginSchema);
