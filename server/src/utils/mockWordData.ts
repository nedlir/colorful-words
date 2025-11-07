import { WordFrequencyResult } from "../types/wordFrequency";

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
  ];

  const TARGET = 6000;
  const MIN_FREQ = 50;

  const weights = words.map(() => Math.random());
  const totalWeight = weights.reduce((sum, word) => sum + word, 0);

  const reserved = words.length * MIN_FREQ;
  const distributable = TARGET - reserved;

  const frequencies: Record<string, number> = {};
  let allocated = 0;

  words.forEach((word, i) => {
    if (i === words.length - 1) {
      frequencies[word] = TARGET - allocated;
    } else {
      const extra = Math.floor((weights[i] / totalWeight) * distributable);
      frequencies[word] = MIN_FREQ + extra;
      allocated += frequencies[word];
    }
  });

  return {
    frequencies,
    totalRequests: 6000,
    successfulRequests: 6000,
    attemptedRequests: 6000,
    failedRequests: 0,
    uniqueWords: words.length,
  };
};
