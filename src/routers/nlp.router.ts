/** @format */

import { nlpController } from "@/controllers";
import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware"

export const nlpRouter = Router();

nlpRouter.post("/feedbacks", (req, res, next)=> {authMiddleware(req, res, next, false)}, nlpController.addNewFeedback);
nlpRouter.get("/feedbacks", (req, res, next)=> {authMiddleware(req, res, next, true)}, nlpController.getFeedbacks)
