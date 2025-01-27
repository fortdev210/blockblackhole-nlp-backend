/** @format */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authService } from "@/services";

export const authMiddleware = async(
  req: Request,
  res: Response,
  next: NextFunction,
  requireAdmin: boolean=false
) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Authentication required!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await authService.getUser(decoded);

    if (!user) throw "User Not Found!";

    if (requireAdmin && user.role !== "admin") {
      res.status(403).json({ error: "Forbidden user!" });
    }
    
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

