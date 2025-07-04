import axios from "axios";
import {
  Course,
  CourseArgs,
  CoursePriceArgs,
  CourseRatingArgs,
  DetailedCourse,
} from "../types/courses";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCourses = async (
  query: string = "",
  page: number = 1,
  all: boolean = true
): Promise<{
  courses: Course[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_courses: number;
    has_next: boolean;
    has_prev: boolean;
  };
}> => {
  try {
    const response = await axios.get(
      `${baseUrl}/courses/courses-enhanced?query=${query}&page=${page}&all=${all}`
    );
    return {
      courses: response.data.courses,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      courses: [],
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_courses: 0,
        has_next: false,
        has_prev: false,
      },
    };
  }
};

export const getDetailedCourse = async (
  id: string
): Promise<DetailedCourse | null> => {
  try {
    const response = await axios.get(`${baseUrl}/courses/course/${id}`);
    return response.data.course;
  } catch (error) {
    console.error("Error fetching detailed course:", error);
    return null;
  }
};

export const createCourse = async (data: {
  course: CourseArgs;
  pricing: CoursePriceArgs;
}): Promise<Boolean> => {
  try {
    const course = await axios.post(`${baseUrl}/courses/create-complete`, data);
    const courseId = course.data.course.id;
    await updateCoursePricing(courseId, data.pricing);
    await updateCourseRating({
      courseId,
      rating: 0,
      total_ratings: 0,
    });
    return true;
  } catch (error) {
    console.error("Error creating course:", error);
    return false;
  }
};

export const updateCourse = async (
  id: string,
  data: Partial<CourseArgs>
): Promise<Boolean> => {
  try {
    await axios.put(`${baseUrl}/courses/course/${id}`, data);
    return true;
  } catch (error) {
    console.error("Error updating course:", error);
    return false;
  }
};

export const publishUnpublishCourse = async (
  id: string,
  publish: boolean
): Promise<Boolean> => {
  try {
    await axios.put(`${baseUrl}/courses/course/${id}`, {
      is_published: publish,
      is_active: publish,
    });
    return true;
  } catch (error) {
    console.error("Error publishing course:", error);
    return false;
  }
};

export const updateCoursePricing = async (
  id: string,
  data: CoursePriceArgs
): Promise<Boolean> => {
  try {
    await axios.put(`${baseUrl}/courses/course/pricing/${id}`, data);
    return true;
  } catch (error) {
    console.error("Error updating course:", error);
    return false;
  }
};

export const updateCourseRating = async (
  data: CourseRatingArgs
): Promise<Boolean> => {
  try {
    await axios.put(`${baseUrl}/courses/rating`, data);
    return true;
  } catch (error) {
    console.error("Error updating course rating:", error);
    return false;
  }
};

export const updateCourseThumbnail = async (
  id: string,
  file: File
): Promise<Boolean> => {
  const formData = new FormData();
  formData.append("thumbnail", file);
  try {
    await axios.put(`${baseUrl}/courses/update-thumbnail/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (error) {
    console.error("Error updating course thumbnail:", error);
    return false;
  }
};
