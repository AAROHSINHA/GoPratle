import { InferSchemaType, model, Schema } from "mongoose";
import { budgetSchema, eventBasicsSchema, metaFields } from "./shared";

const crewSchema = new Schema(
  {
    event: { type: eventBasicsSchema, required: true },
    crewRoles: { type: String, required: true, trim: true },
    numberOfPeople: { type: Number, required: true, min: 1 },
    skillsExperience: { type: String, required: true, trim: true },
    budget: { type: budgetSchema, required: true },
    ...metaFields,
  },
  { timestamps: true },
);

export type CrewRequirement = InferSchemaType<typeof crewSchema>;

export default model("CrewRequirement", crewSchema);
