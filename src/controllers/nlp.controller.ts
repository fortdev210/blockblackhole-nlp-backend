/** @format */

import { Request, Response } from "express";
import { addFeedback, getFeedbackList } from "@/services/nlp.service";
import { errorHandlerWrapper } from "@/utils";
import { MAX_TEXT_LEN } from "@/utils/const";

const addFeedbackHandler = async (req: Request, res: Response) => {
  const { text } = req.body;

  if (text.length > MAX_TEXT_LEN) {
    res.status(400).json({
      message: `Text length can not exceed ${MAX_TEXT_LEN}`,
    });
  }
  const newFeedback = await addFeedback(text);
  res.status(201).json(newFeedback);
};

const getFeedbacksHandler = async (req: Request, res: Response) => {
  const feedbacks = await getFeedbackList();
  res.status(200).json(feedbacks);
};

export const addNewFeedback = errorHandlerWrapper(addFeedbackHandler);
export const getFeedbacks = errorHandlerWrapper(getFeedbacksHandler);
