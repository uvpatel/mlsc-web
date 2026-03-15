import { Schema, models, model, Document } from "mongoose";

// ✅ IMPROVED: Proper TypeScript interface extending Document
export interface IUser extends Document {
  username: string;
  email: string;
  year: number;           
  mobileno: string;      
  idno: string;           
  github?: string;        
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [2, "Username must be at least 2 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1, "Year must be at least 1"],
      max: [6, "Year cannot exceed 6"],
    },
    mobileno: {
      type: String,  // ✅ FIXED: Changed to String
      required: [true, "Mobile number is required"],
      trim: true,
      match: [
        /^[0-9]{10}$/,
        "Mobile number must be exactly 10 digits",
      ],
    },
    idno: {
      type: String,
      required: [true, "ID number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    github: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
        "Please enter a valid GitHub profile URL",
      ],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      minlength: [2, "Department name must be at least 2 characters"],
    },
  },
  { 
    timestamps: true,
    // ✅ ADDED: Better query performance
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ✅ ADDED: Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ idno: 1 });
userSchema.index({ department: 1 });

// ✅ ADDED: Compound index for common queries
userSchema.index({ department: 1, year: 1 });

export const User = models.User || model<IUser>("User", userSchema);