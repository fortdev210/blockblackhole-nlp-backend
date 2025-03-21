/** @format */

import { authService } from "@/services";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { errorHandlerWrapper } from "@/utils";

const signUpHandler = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await authService.createUser({
    name,
    hashedPassword,
  });

  const token = jwt.sign({ username: newUser.name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });


  if (newUser) {
    res.status(201).json({
      token: token,
      isAdmin: newUser.role === "admin",
      username: newUser.name,
    });
  } else {
    res.status(409).json({ message: "User already exists" });
  }
};

const signInHandler = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const user = await authService.getUser({ name });

  if (!user) {
    res.status(409).json({ meesaage: "User not found" });
    return;
  }

  if (!(await bcrypt.compare(password, user.hashedPassword))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ username: user.name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.status(200).json({
    token: token,
    isAdmin: user.role === "admin",
    username: user.name,
  });
};

export const signUp = errorHandlerWrapper(signUpHandler);
export const signIn = errorHandlerWrapper(signInHandler);
