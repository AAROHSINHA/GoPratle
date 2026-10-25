import { Router } from "express";
import mongoose from "mongoose";
import CrewRequirement from "../models/CrewRequirement";
import EventPlannerRequirement from "../models/EventPlannerRequirement";
import PerformerRequirement from "../models/PerformerRequirement";

type Body = Record<string, any>;

// Only whitelisted fields are copied, so clients can't set status, postedOn, etc.
const common = (b: Body) => ({
  event: b.event,
  budget: b.budget,
  additionalRequirements: b.additionalRequirements,
});

const creators: Record<string, (b: Body) => Promise<{ id: string }>> = {
  "event-planner": (b) =>
    EventPlannerRequirement.create({
      ...common(b),
      services: b.services,
      expectedAttendees: b.expectedAttendees,
    }),
  performer: (b) =>
    PerformerRequirement.create({
      ...common(b),
      performanceType: b.performanceType,
      genre: b.genre,
      numberOfPerformers: b.numberOfPerformers,
      duration: b.duration,
    }),
  crew: (b) =>
    CrewRequirement.create({
      ...common(b),
      crewRoles: b.crewRoles,
      numberOfPeople: b.numberOfPeople,
      skillsExperience: b.skillsExperience,
    }),
};

const open = { status: "open" } as const;

const listers: Record<string, () => Promise<unknown[]>> = {
  "event-planner": () =>
    EventPlannerRequirement.find(open).sort({ postedOn: -1 }).limit(50).lean(),
  performer: () => PerformerRequirement.find(open).sort({ postedOn: -1 }).limit(50).lean(),
  crew: () => CrewRequirement.find(open).sort({ postedOn: -1 }).limit(50).lean(),
};

const router = Router();

// GET /api/requirements/:category  -> open gigs, newest first
router.get("/:category", async (req, res) => {
  const list = listers[req.params.category];
  if (!list) {
    return res.status(404).json({ message: "Unknown category" });
  }

  try {
    res.json(await list());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// POST /api/requirements/:category  (event-planner | performer | crew)
router.post("/:category", async (req, res) => {
  const create = creators[req.params.category];
  if (!create) {
    return res.status(404).json({ message: "Unknown category" });
  }

  try {
    const doc = await create(req.body ?? {});
    res.status(201).json({ message: "Saved", id: doc.id });
  } catch (error) {
    // Schema validation failures -> 400 with a message per field
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([path, e]) => [path, e.message]),
      );
      return res.status(400).json({ message: "Validation failed", errors });
    }
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
