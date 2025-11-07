export type WordFrequencies = Record<string, number>;

export type WordFrequencyOptions = {
  requestCount: number;
  batchSize: number;
  maxRetries: number;
  totalTimeoutMs: number;
  initialRetryDelayMs?: number;
  retryBackoffFactor?: number;
};

export type WordFrequencyResult = {
  totalRequests: number;
  successfulRequests: number;
  uniqueWords: number;
  frequencies: WordFrequencies;
  attemptedRequests: number;
  failedRequests: number;
};
