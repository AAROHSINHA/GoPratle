import { Schema } from "mongoose";

export const REQUIREMENT_STATUSES = ["open", "closed", "cancelled"] as const;

// Budget range in INR. The form sends min and max.
export const budgetSchema = new Schema(
  {
    min: { type: Number, required: true, min: 0 },
    max: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator(this: { min: number }, max: number) {
          return max >= this.min;
        },
        message: "Budget max must be greater than or equal to min",
      },
    },
    currency: { type: String, default: "INR", immutable: true },
  },
  { _id: false },
);

// Step 1 of the form (Event Basics). Same for every category.
export const eventBasicsSchema = new Schema(
  {
    eventName: { type: String, required: true, trim: true, maxlength: 150 },
    // Dropdown value, or the text typed when "Other" was chosen.
    eventType: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: {
      type: Date,
      validate: {
        validator(this: { startDate: Date }, end?: Date) {
          return !end || end >= this.startDate;
        },
        message: "End date cannot be before start date",
      },
    },
    city: { type: String, required: true, trim: true },
    venue: { type: String, trim: true },
  },
  { _id: false },
);

// Fields added by the server, not the form.
export const metaFields = {
  additionalRequirements: { type: String, trim: true, maxlength: 2000 },
  status: { type: String, enum: REQUIREMENT_STATUSES, default: "open", index: true },
  postedOn: { type: Date, default: Date.now, index: true },
};
