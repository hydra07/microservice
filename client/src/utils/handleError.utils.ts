import { AxiosError } from "axios";

function handleAxiosError(error: unknown, message: string): void {
    if (error instanceof AxiosError) {
      console.error(`${message}:`, error.response?.data || error.message);
    } else {
      console.error(`${message}:`, error);
    }
  }

export default handleAxiosError;