import axios from "axios";
import { Subscription, SubscriptionArgs } from "../types/subscription";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
