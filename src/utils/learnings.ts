import { CourseWithProgress, Learning } from "@/types/learning";
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

export const getCourseWithProgress = async (
  course_id: string,
  user_id: string
): Promise<CourseWithProgress | null> => {
  if (!course_id || !user_id) {
    console.warn("No course ID or user ID provided to getCourseWithProgress");
    return null;
  }
  try {
    const response = await axios.get(
      `${baseUrl}/student-progress/course-modules?course_id=${course_id}&user_id=${user_id}`
    );
    return response.data as CourseWithProgress;
  } catch (error) {
    console.error("Error fetching course with progress:", error);
    return null;
  }
};
export const MakeProgress = async (data: {
  enrollment_id: string;
  material_id: string;
  status: "completed" | "not completed";
}) => {
  if (!data.enrollment_id || !data.material_id) {
    console.warn("No enrollment ID or material ID provided to MakeProgress");
    return false;
  }
  try {
    await axios.post(`${baseUrl}/student-progress`, data);
    return true;
  } catch (error) {
    console.error("Error making progress:", error);
    return false;
  }
};

export const shareCourse = async (data: {
  email: string;
  enrollment_id: string;
}) => {
  if (!data.email || !data.enrollment_id) {
    console.warn("No email or enrollment ID provided to shareCourse");
    return {
      success: false,
      message: "No email or enrollment ID provided to shareCourse",
    };
  }
  try {
    await axios.post(`${baseUrl}/course-share`, data);
    return { success: true, message: "Course shared successfully" };
  } catch (error: any) {
    console.error("Error sharing course:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Error sharing course",
    };
  }
};
