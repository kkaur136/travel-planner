
import type { SavedDestination } from "../types/SavedDestination";

import {
  getSavedDestinations,
  createSavedDestination,
  deleteSavedDestination,
} from "../repositories/savedDestinationRepository";

export const savedDestinationService = {
  getAll: (): SavedDestination[] => {
    return getSavedDestinations();
  },

  add: (destination: SavedDestination): void => {
    if (!destination.name.trim()) {
      throw new Error("Please select a destination.");
    }

    if (!["1", "2", "3", "4", "5"].includes(destination.rating)) {
      throw new Error("Please select a valid rating.");
    }

    const alreadySaved = getSavedDestinations().some(
      (saved) =>
        saved.name.toLowerCase() === destination.name.toLowerCase()
    );

    if (alreadySaved) {
      throw new Error("This destination is already in your favourites.");
    }

    createSavedDestination(destination);
  },

  remove: (id: number): boolean => {
    return deleteSavedDestination(id);
  },
};
