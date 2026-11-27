import { Router } from "express";
import * as destinationController from "../controllers/destinationController";
import {
  validateDestination,
  validateDestinationId,
} from "../validators/destinationValidator";

const router = Router();

router.get(
  "/",
  destinationController.getAllDestinations
);

router.get(
  "/:id",
  validateDestinationId,
  destinationController.getDestinationById
);

router.post(
  "/",
  validateDestination,
  destinationController.createDestination
);

router.put(
  "/:id",
  validateDestinationId,
  validateDestination,
  destinationController.updateDestination
);

router.delete(
  "/:id",
  validateDestinationId,
  destinationController.deleteDestination
);

export default router;