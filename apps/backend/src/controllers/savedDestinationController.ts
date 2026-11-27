
import { Request, Response } from "express";
import * as repository from "../repositories/savedDestinationRepository";

// GET all saved destinations
export const getAll = async (_req: Request, res: Response) => {
  try {
    const destinations = await repository.getAllSavedDestinations();
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Failed to retrieve destinations:", error);
    res.status(500).json({ message: "Failed to retrieve destinations" });
  }
};

// GET one saved destination by ID
export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid destination ID" });
    return;
  }

  try {
    const destination = await repository.getSavedDestinationById(id);

    if (!destination) {
      res.status(404).json({ message: "Destination not found" });
      return;
    }

    res.status(200).json(destination);
  } catch (error) {
    console.error("Failed to retrieve destination:", error);
    res.status(500).json({ message: "Failed to retrieve destination" });
  }
};

// POST create a saved destination
export const create = async (req: Request, res: Response) => {
  const { name, location, lastVisited, rating, note } = req.body ?? {};

  const fields = { name, location, lastVisited, rating, note };

  if (
    Object.values(fields).some(
      (value) => typeof value !== "string"
    )
  ) {
    res.status(400).json({
      message: "All destination fields must be strings",
    });
    return;
  }

  if (!name.trim() || !location.trim()) {
    res.status(400).json({
      message: "Name and location are required",
    });
    return;
  }

  try {
    const destination = await repository.createSavedDestination(fields);
    res.status(201).json(destination);
  } catch (error) {
    console.error("Failed to create destination:", error);
    res.status(500).json({ message: "Failed to create destination" });
  }
};

// PUT update a saved destination
export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid destination ID" });
    return;
  }

  const allowedFields = [
    "name", "location", "lastVisited", "rating", "note",
  ] as const;

  const data: Record<string, string> = {};

  for (const field of allowedFields) {
    if (req.body?.[field] !== undefined) {
      if (typeof req.body[field] !== "string") {
        res.status(400).json({ message: `${field} must be a string` });
        return;
      }
      data[field] = req.body[field];
    }
  }

  if (Object.keys(data).length === 0) {
    res.status(400).json({ message: "No valid fields to update" });
    return;
  }

  try {
    const existing = await repository.getSavedDestinationById(id);

    if (!existing) {
      res.status(404).json({ message: "Destination not found" });
      return;
    }

    const destination = await repository.updateSavedDestination(id, data);
    res.status(200).json(destination);
  } catch (error) {
    console.error("Failed to update destination:", error);
    res.status(500).json({ message: "Failed to update destination" });
  }
};

// DELETE a saved destination
export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid destination ID" });
    return;
  }

  try {
    const existing = await repository.getSavedDestinationById(id);

    if (!existing) {
      res.status(404).json({ message: "Destination not found" });
      return;
    }

    await repository.deleteSavedDestination(id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete destination:", error);
    res.status(500).json({ message: "Failed to delete destination" });
  }
};
