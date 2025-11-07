import { useEffect, useState } from "react";

type WordFrequencies = Record<string, number>;

type WordFrequencyResponse = {
  totalRequests: number;
  successfulRequests: number;
  uniqueWords: number;
  frequencies: WordFrequencies;
  attemptedRequests: number;
  failedRequests: number;
};

export function Words() {
  const [frequencies, setFrequencies] = useState<WordFrequencies | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchWords = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/word-frequency");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload: WordFrequencyResponse = await response.json();

        if (!isCancelled) {
          setFrequencies(payload.frequencies);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchWords();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="app">
      <h1 className="app-title">Word Frequencies</h1>
      <div className="app-content">
        {isLoading && <p>Loading words…</p>}
        {error && !isLoading && <p>Failed to load words: {error}</p>}
        {!isLoading && !error && frequencies && (
          <div>
            {Object.entries(frequencies).map(([word, count]) => (
              <p key={word}>
                {word}: {count}
              </p>
            ))}
          </div>
        )}
        {!isLoading &&
          !error &&
          frequencies &&
          Object.keys(frequencies).length === 0 && <p>No words available.</p>}
      </div>
    </div>
  );
}
