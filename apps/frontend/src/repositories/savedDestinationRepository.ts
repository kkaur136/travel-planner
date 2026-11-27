import { savedDestinationsData } from "../data/savedDestinationsData";
import type { SavedDestination } from "../types/SavedDestination";

// Temporary in-memory storage.

let savedDestinations: SavedDestination[] = [...savedDestinationsData];

export const getSavedDestinations = (): SavedDestination[] => {
  return [...savedDestinations];
};

export const getSavedDestinationById = (
  id: number
): SavedDestination | undefined => {
  return savedDestinations.find((destination) => destination.id === id);
};

export const createSavedDestination = (
  destination: SavedDestination
): SavedDestination => {
  savedDestinations.push(destination);
  return destination;
};

export const updateSavedDestination = (
  id: number,
  updatedData: Partial<SavedDestination>
): SavedDestination | undefined => {
  const index = savedDestinations.findIndex(
    (destination) => destination.id === id
  );

  if (index === -1) {
    return undefined;
  }

  savedDestinations[index] = {
    ...savedDestinations[index],
    ...updatedData,
    id,
  };

  return savedDestinations[index];
};

export const deleteSavedDestination = (id: number): boolean => {
  const originalLength = savedDestinations.length;

  savedDestinations = savedDestinations.filter(
    (destination) => destination.id !== id
  );

  return savedDestinations.length < originalLength;
};