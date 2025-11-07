import { ResponseRandomWordApi } from "../types/randomWordApi";

// const RANDOM_WORD_API_URL = "https://random-word-api.vercel.app/api?words=1";
const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com/word";

const normalizePayload = (payload: unknown): ResponseRandomWordApi => {
  if (!Array.isArray(payload) || typeof payload[0] !== "string") {
    throw new Error("Random word API returned an unexpected response format");
  }

  return { word: payload[0].trim().toLowerCase() };
};

export const fetchRandomWord = async (): Promise<ResponseRandomWordApi> => {
  const response = await fetch(RANDOM_WORD_API_URL);

  if (!response.ok) {
    throw new Error(`Random word API responded with status ${response.status}`);
  }

  const payload: unknown = await response.json();

  return normalizePayload(payload);
};
