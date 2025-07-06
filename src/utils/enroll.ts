import { Enroll } from "@/types/enroll";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const enroll = async (
  data: Enroll
): Promise<{ success: boolean; message: string }> => {
  try {
    await axios.post(`${baseUrl}/enrollments/enroll`, data);
    return { success: true, message: "Enrolled successfully" };
  } catch (error: any) {
    console.error("Error enrolling:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Error enrolling",
    };
  }
};
