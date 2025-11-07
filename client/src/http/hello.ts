import axiosInstance from "../config/axiosInstance";

export interface HelloResponse {
  message: string;
}

export const getHello = async (): Promise<HelloResponse> => {
  const response = await axiosInstance.get<HelloResponse>("/hello");
  return response.data;
};
