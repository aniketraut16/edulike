import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export type User = {
  firebase_uid: string;
  name: string;
  profile_image: string | null;
  email: string;
  phone: string;
  gender: string;
  dob: string;
};
export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export const getAllUsers = async (
  token: string,
  page: number = 1,
  query: string = ""
): Promise<{ users: User[]; pagination: Pagination }> => {
  try {
    const response = await axios.get(
      `${baseUrl}/user/getAllUsers?page=${page}&query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { users: response.data.users, pagination: response.data.pagination };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      users: [],
      pagination: {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
};
