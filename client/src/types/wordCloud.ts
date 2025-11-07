export type WordCloudWord = {
  text: string;
  value: number;
};

export type WordCloudOptions = {
  rotations?: number;
  rotationAngles?: number[];
  fontSizes?: [number, number];
  fontFamily?: string;
  padding?: number;
  colors?: string[];
};
