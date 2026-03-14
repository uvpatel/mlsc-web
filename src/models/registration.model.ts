import { Schema, models, model } from "mongoose";

export interface IRegistration {
  eventId: Schema.Types.ObjectId | string;
  userId: Schema.Types.ObjectId | string;
  eventSlug: string;
  status: "confirmed" | "cancelled" | "waitlisted";
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema<IRegistration>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventSlug: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "waitlisted"],
    default: "confirmed",
  },
}, { timestamps: true });

// Compound indexes
registrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });
registrationSchema.index({ eventSlug: 1, status: 1 });

export const Registration = models.Registration || model<IRegistration>("Registration", registrationSchema);
