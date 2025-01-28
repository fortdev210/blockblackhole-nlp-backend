/** @format */

import express from "express";
import { authRouter } from "./auth.router";
import { nlpRouter } from "./nlp.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/nlp", nlpRouter);

export default router;
