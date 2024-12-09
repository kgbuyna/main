import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

export type ApiResponse<T> =
  | {
      status?: "success" | "error"; // Indicates if the operation was successful
      message: string; // Required when `message` is used
      messages?: never; // Ensures `messages` cannot be used simultaneously
      data?: T; // Optional: Contains the response data for successful operations
      error?: {
        code: number; // Application-specific error code
        details: string; // Detailed error description
      }; // Optional: Contains error information
    }
  | {
      status?: "success" | "error"; // Indicates if the operation was successful
      message?: never; // Ensures `message` cannot be used simultaneously
      messages: string[]; // Required when `messages` is used
      data?: T; // Optional: Contains the response data for successful operations
      error?: {
        code: number; // Application-specific error code
        details: string; // Detailed error description
      }; // Optional: Contains error information
    };

const postRequest = async function <T>(
  url: string,
  data: object,
  config = {},
  baseUrl: string = ""
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient(
      baseUrl
    ).post(url, data, config);
    if (response.data.status === "error") {
      throw new Error(response.data.message || response.data.messages);
    }
    return response.data;
  } catch (error) {
    console.log("Error making POST request:", error);
    throw new Error(error);
  }
};

export { postRequest };
