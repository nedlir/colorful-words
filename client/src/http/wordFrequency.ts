import axiosInstance from "../config/axiosInstance";

export type WordFrequencies = Record<string, number>;

export type WordFrequencyResponse = {
  totalRequests: number;
  successfulRequests: number;
  uniqueWords: number;
  frequencies: WordFrequencies;
  attemptedRequests: number;
  failedRequests: number;
};

export const getWordFrequency = async (): Promise<WordFrequencyResponse> => {
  const response = await axiosInstance.get<WordFrequencyResponse>(
    "/word-frequency"
  );
  return response.data;
};
