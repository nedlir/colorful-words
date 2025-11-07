import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWordFrequency } from "../http/wordFrequency";
import WordCloud from "react-d3-cloud";
import {
  getWordColor,
  transformToWordCloudData,
  createFontSizeMapper,
} from "../utils/wordCloudTransformers";

export function Words() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wordFrequency"],
    queryFn: getWordFrequency,
  });

  const frequencies = data?.frequencies;

  const isEmpty = useMemo(() => {
    return frequencies ? Object.keys(frequencies).length === 0 : false;
  }, [frequencies]);

  const wordCloudData = useMemo(
    () => transformToWordCloudData(frequencies),
    [frequencies]
  );

  const fontSizeMapper = useMemo(
    () => createFontSizeMapper(frequencies),
    [frequencies]
  );

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
        {!isLoading && !error && frequencies && isEmpty && (
          <p>No words available.</p>
        )}
        {!isLoading && !error && frequencies && !isEmpty && (
          <div style={{ width: "100%", height: "600px" }}>
            <WordCloud
              data={wordCloudData}
              fontSize={fontSizeMapper}
              fill={(word: { text: string }) => getWordColor(word.text)}
              rotate={0}
              padding={5}
            />
          </div>
        )}
      </div>
    </div>
  );
}
