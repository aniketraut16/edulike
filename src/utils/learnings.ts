import { Learning } from "@/types/learning";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getLearnings = async (userId: string): Promise<Learning[]> => {
  if (!userId) {
    console.warn("No user ID provided to getLearnings");
    return [];
  }

  if (!baseUrl) {
    console.error("API URL not configured");
    return [];
  }

  try {
    const response = await axios.get(
      `${baseUrl}/student-progress/enrolled-courses?user_id=${userId}`
    );

    if (response.data && Array.isArray(response.data.courses)) {
      return response.data.courses as Learning[];
    } else {
      console.warn("Unexpected response format from learnings API");
      return [];
    }
  } catch (error) {
    console.error("Error fetching learnings:", error);
    return [];
  }
};
