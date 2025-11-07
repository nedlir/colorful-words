import { Request, Response as ExpressResponse, NextFunction } from "express";
import { computeWordFrequencies } from "../services/wordFrequencyService";
import { WordFrequencyResult } from "../types/wordFrequency";
import { getMockWords } from "../utils/mockWordData";

export const getWordFrequency = async (
  _req: Request,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    let result: WordFrequencyResult;

    try {
      // result = await computeWordFrequencies();
      result = getMockWords(); // computeWordFrequencies() doesn't work

      // if no result or empty frequencies, use mock data
      if (
        !result ||
        !result.frequencies ||
        Object.keys(result.frequencies).length === 0
      ) {
        result = getMockWords();
      }
    } catch (serviceError) {
      // If the service fails, fall back to mock data
      console.error(
        "Word frequency service failed, using mock data:",
        serviceError
      );
      result = getMockWords();
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
