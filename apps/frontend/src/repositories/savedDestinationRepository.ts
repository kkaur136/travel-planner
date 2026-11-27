import type { SavedDestination } from "../types/SavedDestination";

const API_URL = "http://localhost:3000/api/saved-destinations";

type NewSavedDestination = Omit<SavedDestination, "id">;

export const getSavedDestinations = async (): Promise<SavedDestination[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load saved destinations.");
  }

  return response.json();
};

export const getSavedDestinationById = async (
  id: number
): Promise<SavedDestination> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to retrieve destination.");
  }

  return response.json();
};

export const createSavedDestination = async (
  destination: NewSavedDestination
): Promise<SavedDestination> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(destination),
  });

  if (!response.ok) {
    throw new Error("Failed to save destination.");
  }

  return response.json();
};

export const updateSavedDestination = async (
  id: number,
  updatedData: Partial<NewSavedDestination>
): Promise<SavedDestination> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update destination.");
  }

  return response.json();
};

export const deleteSavedDestination = async (
  id: number
): Promise<boolean> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete destination.");
  }

  return true;
};
