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
    <div>
      {isLoading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading visualization...</p>
        </div>
      )}
      {error && !isLoading && (
        <div className="error-state">
          <p>
            Failed to load words:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      )}
      {!isLoading && !error && frequencies && isEmpty && (
        <div className="empty-state">
          <p>No words available.</p>
        </div>
      )}
      {!isLoading && !error && frequencies && !isEmpty && (
        <div className="word-cloud-wrapper">
          <WordCloud
            data={wordCloudData}
            fontSize={fontSizeMapper}
            fill={(word: { text: string }) => getWordColor(word.text)}
            rotate={0}
            padding={2}
            spiral="rectangular"
            random={() => 0.5}
          />
        </div>
      )}
    </div>
  );
}
