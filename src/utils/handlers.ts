import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { UserStateType } from "@/types/base";
import { UserType } from "@/types/userType";

export const updateUserData = (
  userKey: string,
  key: keyof Omit<UserStateType, "userKey">,
  value: object | string | null
) => {
  const userData = JSON.parse(localStorage.getItem(userKey) || "{}");
  localStorage.setItem(userKey, JSON.stringify({ ...userData, [key]: value }));
};

export const getUserData = (
  userKey: string,
  key: keyof Omit<UserStateType, "userKey">
): string | null | UserType => {
  const userData = JSON.parse(localStorage.getItem(userKey) || "{}");
  return userData[key];
};

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
  config: { userKey: string } = { userKey: "" },
  baseUrl: string = ""
): Promise<ApiResponse<T>> {
  try {
    const { userKey } = config;
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient(
      baseUrl,
      userKey
    ).post(url, data);
    if (response.data.status === "error") {
      if (response.data.message) throw new Error(response.data.message);
      else if (response.data.messages) {
        response.data.messages.forEach((msg) => {
          throw new Error(msg);
        });
      }
    }
    return response.data;
  } catch (error) {
    console.log("Error making POST request:", error);
    throw new Error(error);
  }
};
const getRequest = async function <T>(
  url: string,
  config: { userKey: string },
  baseUrl: string = ""
): Promise<ApiResponse<T>> {
  try {
    const { userKey } = config;
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient(
      baseUrl,
      userKey
    ).get(url);
    if (response.data.status === "error") {
      if (response.data.message) throw new Error(response.data.message);
      else if (response.data.messages) {
        response.data.messages.forEach((msg) => {
          throw new Error(msg);
        });
      }
    }
    return response.data;
  } catch (error) {
    console.log("Error making POST request:", error);
    throw new Error(error);
  }
};

export { postRequest, getRequest };
