export type WordCloudWord = {
  text: string;
  value: number;
};

export const getWordColor = (word: string): string => {
  const colors = [
    "#8B4513",
    "#D2691E",
    "#CD853F",
    "#DAA520",
    "#B8860B",
    "#6B8E23",
    "#808000",
    "#556B2F",
    "#8FBC8F",
    "#2E8B57",
    "#4682B4",
    "#5F9EA0",
    "#6495ED",
    "#4169E1",
    "#191970",
    "#8B008B",
    "#9370DB",
    "#BA55D3",
    "#9932CC",
    "#8A2BE2",
    "#DC143C",
    "#B22222",
    "#A52A2A",
    "#8B0000",
    "#CD5C5C",
    "#FF8C00",
    "#FFA500",
    "#FFD700",
    "#F0E68C",
    "#BDB76B",
  ];

  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = word.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
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
  minSize = 14,
  maxSize = 100
) => {
  return (word: { value: number }): number => {
    if (!frequencies) return minSize;

    const values = Object.values(frequencies);
    const minCount = Math.min(...values);
    const maxCount = Math.max(...values);

    if (maxCount === minCount) return (minSize + maxSize) / 2;

    const normalized = (word.value - minCount) / (maxCount - minCount);
    const scaled = Math.pow(normalized, 0.7);

    return minSize + scaled * (maxSize - minSize);
  };
};
