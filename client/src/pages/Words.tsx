import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWordFrequency } from "../http/wordFrequency";

export function Words() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wordFrequency"],
    queryFn: getWordFrequency,
  });

  const frequencies = data?.frequencies;

  const wordEntries = useMemo(() => {
    return frequencies ? Object.entries(frequencies) : [];
  }, [frequencies]);

  const isEmpty = useMemo(() => {
    return frequencies ? Object.keys(frequencies).length === 0 : false;
  }, [frequencies]);

  return (
    <div className="app">
      <h1 className="app-title">Word Frequencies</h1>
      <div className="app-content">
        {isLoading && <p>Loading words…</p>}
        {error && !isLoading && (
          <p>
            Failed to load words:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}
        {!isLoading && !error && frequencies && (
          <div>
            {wordEntries.map(([word, count]) => (
              <p key={word}>
                {word}: {count}
              </p>
            ))}
          </div>
        )}
        {!isLoading && !error && frequencies && isEmpty && (
          <p>No words available.</p>
        )}
      </div>
    </div>
  );
}
