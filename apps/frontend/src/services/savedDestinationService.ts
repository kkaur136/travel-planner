
import type { SavedDestination } from "../types/SavedDestination";

import {
  getSavedDestinations,
  createSavedDestination,
  deleteSavedDestination,
} from "../repositories/savedDestinationRepository";

type NewSavedDestination = Omit<SavedDestination, "id">;

export const savedDestinationService = {
  getAll: async (): Promise<SavedDestination[]> => {
    return await getSavedDestinations();
  },

  add: async (
    destination: NewSavedDestination
  ): Promise<SavedDestination> => {
    if (!destination.name.trim()) {
      throw new Error("Please select a destination.");
    }

    if (!["1", "2", "3", "4", "5"].includes(destination.rating)) {
      throw new Error("Please select a valid rating.");
    }

    const savedDestinations = await getSavedDestinations();

    const alreadySaved = savedDestinations.some(
      (saved) =>
        saved.name.toLowerCase() === destination.name.toLowerCase()
    );

    if (alreadySaved) {
      throw new Error("This destination is already in your favourites.");
    }

    return await createSavedDestination(destination);
  },

  remove: async (id: number): Promise<boolean> => {
    return await deleteSavedDestination(id);
  },
};
