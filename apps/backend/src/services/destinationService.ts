import prisma from "../lib/prisma";

export const getAllDestinations = async () => {
  return prisma.destination.findMany();
};

export const getDestinationById = async (id: number) => {
  return prisma.destination.findUnique({
    where: { id },
  });
};

export const createDestination = async (
  city: string,
  country: string
) => {
  return prisma.destination.create({
    data: { city, country },
  });
};

export const updateDestination = async (
  id: number,
  city: string,
  country: string
) => {
  return prisma.destination.update({
    where: { id },
    data: { city, country },
  });
};

export const deleteDestination = async (id: number) => {
  return prisma.destination.delete({
    where: { id },
  });
};