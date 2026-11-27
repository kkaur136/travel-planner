import { Router } from "express";
import * as activityController from "../controllers/activityController";

import {
    validateActivity,
    validateActivityId,
    validateEmptyRequest,
    validateActivityQuery
} from "../validators/activityValidator";

const router = Router();

router.get(
    "/",
    validateEmptyRequest,
    activityController.getActivities
);

router.post(
    "/",
    validateActivityQuery,
    validateActivity,
    activityController.createActivity
);

router.put(
    "/:id",
    validateActivityQuery,
    validateActivityId,
    validateActivity,
    activityController.updateActivity
);

router.delete(
    "/:id",
    validateActivityId,
    validateEmptyRequest,
    activityController.deleteActivity
);

export default router;
