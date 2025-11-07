import { Router } from "express";
import { getWordFrequency } from "../controllers/wordFrequencyController";

const router = Router();

router.get("/word-frequency", getWordFrequency);

export default router;
