import { Request, Response, NextFunction } from "express";

export function validateActivity(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { name, duration, destinationId } = req.body ?? {};

    if (typeof name !== "string" || name.trim().length < 3) {
        res.status(400).json({
            message: "Activity name must contain at least 3 characters."
        });
        return;
    }

    if (typeof duration !== "string" || duration.trim() === "") {
        res.status(400).json({
            message: "Duration is required."
        });
        return;
    }

    if (!Number.isInteger(destinationId) || destinationId <= 0) {
        res.status(400).json({
            message: "A valid destination is required."
        });
        return;
    }

    req.body = {
        name: name.trim(),
        duration: duration.trim(),
        destinationId
    };

    next();
}

export function validateActivityId(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
            message: "Invalid activity ID."
        });
        return;
    }

    next();
}

export function validateEmptyRequest(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (
        Object.keys(req.query).length > 0 ||
        Object.keys(req.body ?? {}).length > 0
    ) {
        res.status(400).json({
            message: "Unexpected request parameters."
        });
        return;
    }

    next();
}

export function validateActivityQuery(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (Object.keys(req.query).length > 0) {
        res.status(400).json({
            message: "Unexpected query parameters."
        });
        return;
    }

    next();
}
