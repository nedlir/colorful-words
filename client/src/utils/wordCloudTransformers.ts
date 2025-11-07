export interface WordCloudWord {
  text: string;
  value: number;
}

export const getWordColor = (word: string): string => {
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = word.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

export const transformToWordCloudData = (
  frequencies: Record<string, number> | undefined
): WordCloudWord[] => {
  if (!frequencies) return [];

  return Object.entries(frequencies).map(([text, value]) => ({
    text,
    value,
  }));
};

export const createFontSizeMapper = (
  frequencies: Record<string, number> | undefined,
  minSize = 12,
  maxSize = 64
) => {
  return (word: { value: number }): number => {
    if (!frequencies) return minSize;

    const values = Object.values(frequencies);
    const minCount = Math.min(...values);
    const maxCount = Math.max(...values);

    if (maxCount === minCount) return (minSize + maxSize) / 2;

    return (
      minSize +
      ((word.value - minCount) / (maxCount - minCount)) * (maxSize - minSize)
    );
  };
};
