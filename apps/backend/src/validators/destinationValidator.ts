import { Request, Response, NextFunction } from "express";

export const validateDestination = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { city, country } = req.body ?? {};

  if (typeof city !== "string" || city.trim() === "") {
    res.status(400).json({
      message: "City is required",
    });
    return;
  }

  if (typeof country !== "string" || country.trim() === "") {
    res.status(400).json({
      message: "Country is required",
    });
    return;
  }

  req.body.city = city.trim();
  req.body.country = country.trim();

  next();
};

export const validateDestinationId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0 || id > 2147483647) {
    res.status(400).json({
      message: "Invalid destination ID",
    });
    return;
  }

  next();
};