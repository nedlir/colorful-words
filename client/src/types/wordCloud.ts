export interface WordCloudWord {
  text: string;
  value: number;
}

export interface WordCloudOptions {
  rotations?: number;
  rotationAngles?: number[];
  fontSizes?: [number, number];
  fontFamily?: string;
  padding?: number;
  colors?: string[];
}
