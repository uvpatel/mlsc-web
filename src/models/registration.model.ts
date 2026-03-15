import { Schema, models, model, Document } from "mongoose";

export interface IRegistration extends Document {
  eventId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  eventSlug: string;
  status: "confirmed" | "cancelled" | "waitlisted";
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema<IRegistration>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    eventSlug: {
      type: String,
      required: [true, "Event slug is required"],
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["confirmed", "cancelled", "waitlisted"],
        message: "Status must be confirmed, cancelled, or waitlisted",
      },
      default: "confirmed",
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ✅ EXISTING: Prevent duplicate registrations
registrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

// ✅ EXISTING: Fast lookups by event and status
registrationSchema.index({ eventSlug: 1, status: 1 });

// ✅ ADDED: Fast lookups by user
registrationSchema.index({ userId: 1, status: 1 });

// ✅ ADDED: Cascade delete (optional - if you want to delete registrations when event is deleted)
registrationSchema.index({ eventId: 1 });

export const Registration =
  models.Registration || model<IRegistration>("Registration", registrationSchema);