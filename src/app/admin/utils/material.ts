import axios from "axios";
import { MaterialArgs, OneMaterial } from "../types/material";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getMaterials = async (
  module_id: string
): Promise<OneMaterial[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/materials?module_id=${module_id}`
    );
    return response.data.materials;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const createMaterial = async (
  data: MaterialArgs,
  file?: File
): Promise<Boolean> => {
  try {
    const response = await axios.post(`${baseUrl}/materials`, data);
    if (file && data.type === "document" && response.data.success) {
      await updateDocumentMaterial(file, response.data.material.id);
    }
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const updateMaterial = async (
  data: MaterialArgs,
  material_id: string
): Promise<Boolean> => {
  try {
    await axios.put(`${baseUrl}/materials/${material_id}`, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const updateDocumentMaterial = async (
  file: File,
  material_id: string
): Promise<Boolean> => {
  try {
    const formData = new FormData();
    formData.append("document", file);
    const uploadResponse = await axios.post(
      `${baseUrl}/upload/materials/${material_id}/document`,
      formData
    );
    if (uploadResponse.data.success) {
      await axios.put(`${baseUrl}/materials/${material_id}`, {
        file_path: uploadResponse.data.path,
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const deleteMaterial = async (material_id: string): Promise<Boolean> => {
  try {
    await axios.delete(`${baseUrl}/materials/${material_id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
