import axios from "axios";
import { Module, ModuleArgs } from "../types/modules";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getModules = async (courseId: string): Promise<Module[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/modules?course_id=${courseId}`
    );
    return response.data.modules;
  } catch (error) {
    console.error("Error fetching modules:", error);
    return [];
  }
};

export const createModule = async (data: ModuleArgs): Promise<Boolean> => {
  try {
    await axios.post(`${baseUrl}/modules`, data);
    return true;
  } catch (error) {
    console.error("Error creating module:", error);
    return false;
  }
};

export const updateModule = async (
  moduleId: string,
  data: ModuleArgs
): Promise<Boolean> => {
  try {
    await axios.put(`${baseUrl}/modules/${moduleId}`, data);
    return true;
  } catch (error) {
    console.error("Error updating module:", error);
    return false;
  }
};

export const deleteModule = async (moduleId: string): Promise<Boolean> => {
  try {
    await axios.delete(`${baseUrl}/modules/${moduleId}`);
    return true;
  } catch (error) {
    console.error("Error deleting module:", error);
    return false;
  }
};
