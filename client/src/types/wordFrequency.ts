export type WordFrequencies = Record<string, number>;

export type WordFrequencyResponse = {
  totalRequests: number;
  successfulRequests: number;
  uniqueWords: number;
  frequencies: WordFrequencies;
  attemptedRequests: number;
  failedRequests: number;
};
