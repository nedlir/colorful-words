import axiosInstance from "../config/axiosInstance";

export interface NumberResponse {
  number: number;
}

export const getNumber = async (): Promise<NumberResponse> => {
  const response = await axiosInstance.get<NumberResponse>("/number");
  return response.data;
};
