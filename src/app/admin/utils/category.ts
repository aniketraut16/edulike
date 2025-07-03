import axios from "axios";
import { Category, CategoryArgs } from "../types/category";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${baseUrl}/categories/categories`);
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const createCategory = async (data: CategoryArgs): Promise<Boolean> => {
  try {
    await axios.post(`${baseUrl}/categories/create-category`, data);
    return true;
  } catch (error) {
    console.error("Error creating category:", error);
    return false;
  }
};

export const updateCategory = async (
  id: string,
  data: CategoryArgs
): Promise<Boolean> => {
  try {
    await axios.put(`${baseUrl}/categories/category/${id}`, data);
    return true;
  } catch (error) {
    console.error("Error updating category:", error);
    return false;
  }
};

export const deactiveCategory = async (id: string): Promise<Boolean> => {
  try {
    await axios.delete(`${baseUrl}/categories/category/${id}`);
    return true;
  } catch (error) {
    console.error("Error deactivating category:", error);
    return false;
  }
};
