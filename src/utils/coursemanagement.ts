import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  price: number;
  originalPrice: number;
  lessons: number;
  difficulty_level: string;
  language: string;
  rating: number;
  category: string;
  kcType?: string;
  enrollment_count: number;
};

export const getAllCourses = async (
  page: number,
  query: string,
  language: string,
  category: string,
  rating: number,
  difficulty: string,
  kcType: string = "",
  order_by: string = "created_at",
  order: string = "desc"
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
    const coursesResponse = await axios.get(
      `${baseUrl}/courses/courses-enhanced`,
      {
        params: {
          page,
          query,
          language: language.toLowerCase(),
          category,
          rating,
          difficulty: difficulty.toLowerCase(),
          kcType: kcType.toLowerCase(),
          order_by,
          order,
        },
      }
    );
    return {
      courses: coursesResponse.data.courses as Course[],
      pagination: coursesResponse.data.pagination,
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

export type Category = {
  id: string;
  name: string;
  course_count: number;
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${baseUrl}/categories/categories`);
    return response.data.categories as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export type Module = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DetailCourse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
  };
  thumbnail: string;
  is_active: boolean;
  is_published: boolean;
  difficulty_level: string;
  language: string;
  prerequisites: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  what_you_will_learn: string[];
  target_audience: string;
  total_duration: number;
  timetofinish: string;
  modules: Module[];
  enrollment_count: number;
  module_count: number;
  created_at: string;
  updated_at: string;
};

export const getOneCourse = async (
  id: string
): Promise<{
  success: boolean;
  course: DetailCourse | null;
}> => {
  // const course: DetailCourse = {
  //   id: "9a4e98b2-f20d-4b9f-a3c7-df4c572321f2",
  //   title: "Full Stack Web Development with MERN",
  //   slug: "full-stack-web-development-mern",
  //   description:
  //     "Learn to build scalable web applications using MongoDB, Express.js, React.js, and Node.js. This hands-on course walks you through real-world full stack projects.",
  //   shortDescription: "Master the MERN stack with real-world projects.",
  //   categoryId: "fe3f8c7d-4f02-4721-abc3-7759826d1b21",
  //   thumbnail: "https://i.ytimg.com/vi/5i8ej1-GpFU/maxresdefault.jpg",
  //   promotionalVideo: "https://www.youtube.com/watch?v=abcd1234",
  //   isActive: true,
  //   isPublished: true,
  //   difficultyLevel: "INTERMEDIATE",
  //   language: "en",
  //   prerequisites: "Basic HTML, CSS, JavaScript knowledge",
  //   whatYouWillLearn: [
  //     "Build responsive UIs with React",
  //     "Design REST APIs with Node.js and Express",
  //     "Integrate MongoDB for data persistence",
  //     "Deploy full stack apps to Vercel/Render",
  //     "Handle authentication and protected routes",
  //   ],
  //   targetAudience:
  //     "Students, job seekers, and devs who want to become full stack developers",
  //   totalDuration: 40,
  //   createdById: "7e2d47b9-cdf7-4c6e-bd3e-04191e30df6b",
  //   createdAt: "2025-06-01T10:00:00.000Z",
  //   updatedAt: "2025-06-21T18:30:00.000Z",
  //   lastContentUpdate: "2025-06-20T12:15:00.000Z",
  //   category: {
  //     id: "fe3f8c7d-4f02-4721-abc3-7759826d1b21",
  //     name: "Web Development",
  //     slug: "web-development",
  //     description:
  //       "Courses focused on frontend, backend, and full stack development.",
  //     Thumbnail: "https://example.com/images/categories/web-dev.png",
  //     isActive: true,
  //   },
  //   modules: [
  //     {
  //       id: "mod-1a",
  //       courseId: "9a4e98b2-f20d-4b9f-a3c7-df4c572321f2",
  //       title: "Introduction to Full Stack",
  //       description: "Overview of the MERN stack and development roadmap.",
  //       orderIndex: 1,
  //       isActive: true,
  //       createdAt: "2025-06-01T10:15:00.000Z",
  //       updatedAt: "2025-06-01T10:15:00.000Z",
  //     },
  //     {
  //       id: "mod-2b",
  //       courseId: "9a4e98b2-f20d-4b9f-a3c7-df4c572321f2",
  //       title: "Frontend with React",
  //       description:
  //         "Build responsive frontend using components, hooks, and routing.",
  //       orderIndex: 2,
  //       isActive: true,
  //       createdAt: "2025-06-02T12:00:00.000Z",
  //       updatedAt: "2025-06-02T12:00:00.000Z",
  //     },
  //     {
  //       id: "mod-3c",
  //       courseId: "9a4e98b2-f20d-4b9f-a3c7-df4c572321f2",
  //       title: "Backend with Node & Express",
  //       description: "Design secure REST APIs, handle auth, and server logic.",
  //       orderIndex: 3,
  //       isActive: true,
  //       createdAt: "2025-06-03T15:00:00.000Z",
  //       updatedAt: "2025-06-03T15:00:00.000Z",
  //     },
  //     {
  //       id: "mod-4d",
  //       courseId: "9a4e98b2-f20d-4b9f-a3c7-df4c572321f2",
  //       title: "MongoDB Integration",
  //       description: "Model and query data using Mongoose and MongoDB Atlas.",
  //       orderIndex: 4,
  //       isActive: true,
  //       createdAt: "2025-06-04T17:00:00.000Z",
  //       updatedAt: "2025-06-04T17:00:00.000Z",
  //     },
  //     {
  //       id: "mod-5e",
  //       courseId: "9a4e98b2-f20d-4b9f-a3c7-df4c572321f2",
  //       title: "Final Project & Deployment",
  //       description: "Create a complete MERN app and deploy to production.",
  //       orderIndex: 5,
  //       isActive: true,
  //       createdAt: "2025-06-05T19:00:00.000Z",
  //       updatedAt: "2025-06-05T19:00:00.000Z",
  //     },
  //   ],
  // };
  try {
    const response = await axios.get(`${baseUrl}/courses/course/${id}`);
    return {
      success: true,
      course: response.data.course as DetailCourse,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      success: false,
      course: null,
    };
  }
};
