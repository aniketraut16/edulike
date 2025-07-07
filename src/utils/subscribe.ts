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
