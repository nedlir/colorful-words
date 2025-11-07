import { Request, Response as ExpressResponse, NextFunction } from "express";
import { computeWordFrequencies } from "../services/wordFrequencyService";

export const getWordFrequency = async (
  _req: Request,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const result = await computeWordFrequencies();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
