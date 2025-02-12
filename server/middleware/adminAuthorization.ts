import type { NextFunction, Request, Response } from "express";
import type { CustomJwtPayload } from "../src/types/express";
const adminAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    res.status(403).json({ message: "Accès refusé" });
    return;
  }

  const user = req.user as CustomJwtPayload;

  if (!user.isAdmin) {
    res.status(403).json({ message: "Accès refusé" });
    return;
  }

  next();
};

export default adminAuthorization;
