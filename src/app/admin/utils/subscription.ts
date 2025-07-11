import axios from "axios";
import { Subscription, SubscriptionArgs } from "../types/subscription";
import { Course } from "../types/courses";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export interface SimpleCourse {
  course_id: string;
  subscription_id: string;
  courses: {
    id: string;
    title: string;
    thumbnail: string;
    difficulty_level: string;
    language: string;
    total_duration: number;
  };
}

export const getSubscription = async (): Promise<Subscription[]> => {
  try {
    const response = await axios.get(`${baseUrl}/subscriptions`);
    return response.data.subscriptions as Subscription[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createSubscription = async (
  data: SubscriptionArgs
): Promise<Boolean> => {
  try {
    await axios.post(`${baseUrl}/subscriptions`, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const updateSubscription = async (
  id: string,
  data: SubscriptionArgs
): Promise<Boolean> => {
  try {
    await axios.put(`${baseUrl}/subscriptions/${id}`, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const deleteSubscription = async (id: string): Promise<Boolean> => {
  try {
    await axios.delete(`${baseUrl}/subscriptions/${id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const addCourseToSubscription = async (
  subscriptionId: string,
  courseId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await axios.post(`${baseUrl}/subscriptions/${subscriptionId}/courses`, {
      course_id: courseId,
    });
    return { success: true, message: "Course added to subscription" };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Failed to add course to subscription",
    };
  }
};
export const removeCourseFromSubscription = async (
  subscriptionId: string,
  course_id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await axios.delete(
      `${baseUrl}/subscriptions/${subscriptionId}/courses/${course_id}`
    );
    return { success: true, message: "Course removed from subscription" };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Failed to remove course from subscription",
    };
  }
};
export const getSubscriptionCoursesForAdmin = async (
  subscriptionId: string
): Promise<SimpleCourse[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/subscriptions/${subscriptionId}/courses`
    );
    const res = response.data.courses.map((course: Course) => ({
      course_id: course.id,
      subscription_id: subscriptionId,
      courses: {
        id: course.id,
        title: course.title,
        thumbnail: course.image,
        difficulty_level: course.difficulty_level,
        language: course.language,
        total_duration: course.total_duration,
      },
    })) as SimpleCourse[];
    return res as SimpleCourse[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
