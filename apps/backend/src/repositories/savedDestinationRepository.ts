
import prisma from "../lib/prisma";

// Get all saved destinations
export const getAllSavedDestinations = async () => {
  return prisma.savedDestination.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// Get one saved destination
export const getSavedDestinationById = async (id: number) => {
  return prisma.savedDestination.findUnique({
    where: { id },
  });
};

// Create a new saved destination
export const createSavedDestination = async (data: {
  name: string;
  location: string;
  lastVisited: string;
  rating: string;
  note: string;
}) => {
  return prisma.savedDestination.create({
    data,
  });
};

// Update a saved destination
export const updateSavedDestination = async (
  id: number,
  data: Partial<{
    name: string;
    location: string;
    lastVisited: string;
    rating: string;
    note: string;
  }>
) => {
  return prisma.savedDestination.update({
    where: { id },
    data,
  });
};

// Delete a saved destination
export const deleteSavedDestination = async (id: number) => {
  return prisma.savedDestination.delete({
    where: { id },
  });
};
