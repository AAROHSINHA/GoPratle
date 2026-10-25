import { InferSchemaType, model, Schema } from "mongoose";
import { budgetSchema, eventBasicsSchema, metaFields } from "./shared";

const performerSchema = new Schema(
  {
    event: { type: eventBasicsSchema, required: true },
    performanceType: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    numberOfPerformers: { type: Number, required: true, min: 1 },
    duration: { type: String, required: true, trim: true },
    budget: { type: budgetSchema, required: true },
    ...metaFields,
  },
  { timestamps: true },
);

export type PerformerRequirement = InferSchemaType<typeof performerSchema>;

export default model("PerformerRequirement", performerSchema);
