import { Request, Response } from "express";
import * as activityService from "../services/activityService";

export async function getActivities(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const activities = await activityService.getActivities();

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve activities."
        });
    }
}

export async function createActivity(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const activity = await activityService.createActivity(
            req.body
        );

        if (!activity) {
            res.status(404).json({
                message: "Destination not found."
            });
            return;
        }

        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create activity."
        });
    }
}

export async function updateActivity(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const id = Number(req.params.id);

        const activity = await activityService.updateActivity(
            id,
            req.body
        );

        if (!activity) {
            res.status(404).json({
                message: "Activity or destination not found."
            });
            return;
        }

        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update activity."
        });
    }
}

export async function deleteActivity(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const id = Number(req.params.id);

        const activity = await activityService.deleteActivity(id);

        if (!activity) {
            res.status(404).json({
                message: "Activity not found."
            });
            return;
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete activity."
        });
    }
}
