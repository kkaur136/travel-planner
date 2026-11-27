import { Request, Response } from "express";
import * as destinationService from "../services/destinationService";

export const getAllDestinations = async (
  req: Request,
  res: Response
) => {
  try {
    const destinations =
      await destinationService.getAllDestinations();

    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve destinations",
    });
  }
};

export const getDestinationById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const destination =
      await destinationService.getDestinationById(id);

    if (!destination) {
      res.status(404).json({
        message: "Destination not found",
      });
      return;
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve destination",
    });
  }
};

export const createDestination = async (
  req: Request,
  res: Response
) => {
  try {
    const { city, country } = req.body;

    const destination =
      await destinationService.createDestination(city, country);

    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create destination",
    });
  }
};

export const updateDestination = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { city, country } = req.body;

    const existing =
      await destinationService.getDestinationById(id);

    if (!existing) {
      res.status(404).json({
        message: "Destination not found",
      });
      return;
    }

    const destination =
      await destinationService.updateDestination(
        id,
        city,
        country
      );

    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update destination",
    });
  }
};

export const deleteDestination = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const existing =
      await destinationService.getDestinationById(id);

    if (!existing) {
      res.status(404).json({
        message: "Destination not found",
      });
      return;
    }

    await destinationService.deleteDestination(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete destination",
    });
  }
};