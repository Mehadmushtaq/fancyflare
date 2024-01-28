import { AxiosError } from "axios";

export const transformError = (error) => {
  const InternalError = {
    error: "Internal Error",
    message: "Something went wrong!. Please try again later!",
    code: 500,
  };

  if (typeof error !== "object" || !error) {
    return InternalError;
  }

  if (
    error instanceof AxiosError &&
    "response" in error &&
    typeof error.response?.data?.message === "string"
  ) {
    return {
      message: error.response?.data?.message,
      code: error.response?.data?.statusCode,
      error: error.response?.data?.error,
    };
  }

  return InternalError;
};
