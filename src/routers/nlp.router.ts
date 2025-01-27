/** @format */

import { nlpController } from "@/controllers";
import { Router } from "express";

export const nlpRouter = Router();

nlpRouter.post("/feedbacks", nlpController.addNewFeedback);
nlpRouter.get("/feedbacks", nlpController.getFeedbacks)
