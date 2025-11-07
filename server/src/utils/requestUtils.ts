type DelayFunction = (attempt: number) => number;

export interface RetryOptions {
  maxRetries: number;
  initialDelayMs?: number;
  backoffFactor?: number;
  delayFn?: DelayFunction;
}

export interface RequestExecutionOptions<T> {
  totalRequests: number;
  batchSize: number;
  retry: RetryOptions;
  onSuccess?: (result: T) => void;
  onFailure?: (error: unknown) => void;
}

export interface RequestExecutionSummary {
  attemptedRequests: number;
  successfulRequests: number;
  failedRequests: number;
}

const defaultDelayFn = (initialDelayMs: number, backoffFactor: number): DelayFunction => {
  return (attempt: number) => initialDelayMs * Math.pow(backoffFactor, attempt);
};

export const performWithRetries = async <T>(
  task: () => Promise<T>,
  options: RetryOptions
): Promise<T> => {
  const {
    maxRetries,
    initialDelayMs = 100,
    backoffFactor = 2,
    delayFn,
  } = options;

  const computeDelay = delayFn ?? defaultDelayFn(initialDelayMs, backoffFactor);

  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      const isLastAttempt = attempt === maxRetries - 1;
      if (isLastAttempt) {
        break;
      }

      const delay = computeDelay(attempt);
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError ?? new Error("Unknown error during retries");
};

export const executeConcurrentRequests = async <T>(
  taskFactory: () => Promise<T>,
  options: RequestExecutionOptions<T>
): Promise<RequestExecutionSummary> => {
  const {
    totalRequests,
    batchSize,
    retry,
    onSuccess,
    onFailure,
  } = options;

  if (totalRequests <= 0) {
    return { attemptedRequests: 0, successfulRequests: 0, failedRequests: 0 };
  }

  let successfulRequests = 0;
  let failedRequests = 0;
  let nextIndex = 0;

  const concurrency = Math.min(batchSize, totalRequests);

  const worker = async () => {
    while (true) {
      const currentIndex = nextIndex++;
      if (currentIndex >= totalRequests) {
        break;
      }

      try {
        const result = await performWithRetries(taskFactory, retry);
        successfulRequests += 1;
        onSuccess?.(result);
      } catch (error) {
        failedRequests += 1;
        onFailure?.(error);
      }
    }
  };

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  const attemptedRequests = totalRequests;

  if (successfulRequests === 0) {
    throw new Error("All requests failed. External service may be unavailable.");
  }

  return {
    attemptedRequests,
    successfulRequests,
    failedRequests,
  };
};

export const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage = `Timeout after ${timeoutMs}ms`
): Promise<T> => {
  let timeoutHandle: NodeJS.Timeout;

  const timeout = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => {
      reject(new Error(errorMessage));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutHandle!);
  }
};

