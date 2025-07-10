import { UserSubscription } from "@/types/subscription";
import { Course } from "@/types/courses";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const subscribe = async (data: {
  user_id: string;
  expiry_date: string;
  subscription_id: string;
}) => {
  try {
    await axios.post(`${baseUrl}/subscriptions/${data.subscription_id}/users`, {
      user_id: data.user_id,
      expiry_date: data.expiry_date,
      status: "active",
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getSubscription = async (
  user_id: string
): Promise<UserSubscription[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/subscriptions/users/${user_id}/subscriptions`
    );
    return response.data.subscriptions;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getSubscriptionCourses = async (
  subscription_id: string
): Promise<Course[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/subscriptions/${subscription_id}/courses`
    );
    return response.data.courses;
  } catch (error) {
    console.error(error);
    return [];
  }
};
