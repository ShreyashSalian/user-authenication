import mongoose, { Types, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
interface UserDocument extends Document {
  _id: string;
  userName: string;
  fullName: string;
  email: string;
  contactNumber: string;
  gender: string;
  status: string;
  role: string;
  password: string;
  isDeleted: boolean;
  emailSent: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

enum USER_STATUS {
  INACTIVE = "inactive",
  ACTIVE = "active",
}

enum USERROLE {
  USER = "user",
  ADMIN = "admin",
}

const userSchema = new Schema<UserDocument>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.INACTIVE,
    },
    gender: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: Object.values(USERROLE),
      default: USERROLE.USER,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) {
    return next;
  } else {
    try {
      user.password = await bcrypt.hash(this.password, 12);
    } catch (err: any) {
      throw new Error(err);
    }
  }
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(password, user.password);
};

userSchema.methods.generateAccessToken = function (): string {
  const user = this as UserDocument;
  const token = process.env.ACCESS_TOKEN;
  if (!token) {
    throw new Error("No access token found");
  }
  return jwt.sign(
    {
      userId: user?._id,
      email: user?.email,
      fullName: user?.fullName,
    },
    token,
    {
      expiresIn: "1h",
    }
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  const user = this as UserDocument;
  const token = process.env.REFRESH_TOKEN;
  if (!token) {
    throw new Error("No access token found");
  }
  return jwt.sign(
    {
      userId: user?._id,
      email: user?.email,
      fullName: user?.fullName,
    },
    token,
    {
      expiresIn: "10d",
    }
  );
};

export const User = mongoose.model<UserDocument>("User", userSchema);
