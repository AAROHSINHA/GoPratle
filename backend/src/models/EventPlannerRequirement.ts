import { InferSchemaType, model, Schema } from "mongoose";
import { budgetSchema, eventBasicsSchema, metaFields } from "./shared";

const eventPlannerSchema = new Schema(
  {
    event: { type: eventBasicsSchema, required: true },
    services: { type: String, required: true, trim: true },
    budget: { type: budgetSchema, required: true },
    expectedAttendees: { type: Number, required: true, min: 1 },
    ...metaFields,
  },
  { timestamps: true }, // adds createdAt / updatedAt
);

export type EventPlannerRequirement = InferSchemaType<typeof eventPlannerSchema>;

export default model("EventPlannerRequirement", eventPlannerSchema);
