import axios from "axios";
import { Blog, BlogArgs, BlogsResponse } from "../types/blogs";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getBlogs = async (
  page: number = 1,
  limit: number = 9
): Promise<BlogsResponse> => {
  try {
    const response = await axios.get(
      `${baseUrl}/blogs?page=${page}&limit=${limit}`
    );
    return {
      blogs: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      blogs: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
};

export const getBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const response = await axios.get(`${baseUrl}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    return null;
  }
};
export const createBlog = async (data: BlogArgs): Promise<boolean> => {
  try {
    await axios.post(`${baseUrl}/blogs`, data);
    return true;
  } catch (error) {
    console.error("Error creating blog:", error);
    return false;
  }
};
export const updateBlog = async (
  id: string,
  data: BlogArgs
): Promise<boolean> => {
  try {
    await axios.put(`${baseUrl}/blogs/${id}`, data);
    return true;
  } catch (error) {
    console.error("Error updating blog:", error);
    return false;
  }
};
export const deleteBlog = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${baseUrl}/blogs/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return false;
  }
};
