// this is a dev only file, I used it since I had no access to the API (probably got banned for over requesting)

import { WordFrequencyResult } from "../types/wordFrequency";

/**
 * Generates mock word frequency data with 50 foods totaling 6000 occurrences
 */
export const getMockWords = (): WordFrequencyResult => {
  const words = [
    "pizza",
    "sushi",
    "ramen",
    "tacos",
    "burger",
    "pasta",
    "curry",
    "steak",
    "salmon",
    "tempura",
    "burrito",
    "pho",
    "gyoza",
    "risotto",
    "paella",
    "kebab",
    "dimsum",
    "baklava",
    "croissant",
    "churros",
    "tiramisu",
    "gelato",
    "macaron",
    "boba",
    "matcha",
    "kimchi",
    "bibimbap",
    "pad-thai",
    "falafel",
    "hummus",
    "shawarma",
    "gnocchi",
    "bruschetta",
    "lasagna",
    "enchilada",
    "quesadilla",
    "nachos",
    "mochi",
    "takoyaki",
    "okonomiyaki",
    "bulgogi",
    "poutine",
    "gazpacho",
    "ceviche",
    "empanada",
    "pierogi",
    "schnitzel",
    "biryani",
    "tandoori",
    "samosa",
  ];

  const frequencies: Record<string, number> = {};
  let total = 0;

  // Generate random frequencies that sum to 6000
  words.forEach((word, index) => {
    if (index === words.length - 1) {
      // Last word gets the remainder to ensure exact total of 6000
      frequencies[word] = 6000 - total;
    } else {
      // Random frequency between 50 and 200
      const freq = Math.floor(Math.random() * 151) + 50;
      frequencies[word] = freq;
      total += freq;
    }
  });

  return {
    frequencies,
    totalRequests: 100,
    successfulRequests: 100,
    attemptedRequests: 100,
    failedRequests: 0,
    uniqueWords: words.length,
  };
};
