import {
  WordFrequencies,
  WordFrequencyOptions,
  WordFrequencyResult,
} from "../types/wordFrequency";
import { executeConcurrentRequests, withTimeout } from "../utils/requestUtils";
import { fetchRandomWord } from "../http/randomWordApi";

const DEFAULT_OPTIONS: WordFrequencyOptions = {
  requestCount: 6000,
  batchSize: 200,
  maxRetries: 3,
  totalTimeoutMs: 120_000,
  initialRetryDelayMs: 100,
  retryBackoffFactor: 2,
};

const buildFrequencyAccumulator = (frequencies: WordFrequencies) => {
  return (word: string) => {
    frequencies[word] = (frequencies[word] ?? 0) + 1;
  };
};

export const computeWordFrequencies = async (
  options?: Partial<WordFrequencyOptions>
): Promise<WordFrequencyResult> => {
  const opts: WordFrequencyOptions = { ...DEFAULT_OPTIONS, ...options };
  const frequencies: WordFrequencies = {};
  const accumulateWord = buildFrequencyAccumulator(frequencies);

  const summary = await withTimeout(
    executeConcurrentRequests(fetchRandomWord, {
      totalRequests: opts.requestCount,
      batchSize: opts.batchSize,
      retry: {
        maxRetries: opts.maxRetries,
        initialDelayMs: opts.initialRetryDelayMs,
        backoffFactor: opts.retryBackoffFactor,
      },
      onSuccess: ({ word }) => accumulateWord(word),
    }),
    opts.totalTimeoutMs
  );

  return {
    totalRequests: summary.attemptedRequests,
    successfulRequests: summary.successfulRequests,
    uniqueWords: Object.keys(frequencies).length,
    frequencies,
    attemptedRequests: summary.attemptedRequests,
    failedRequests: summary.failedRequests,
  };
};
