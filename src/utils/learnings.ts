export type Learning = {
  courseId: string;
  courseName: string;
  courseDescription: string;
  courseImage: string;
  status: string;
  progress: number;
  courseType: "individual" | "corporate" | "institution";
  assignLimit?: number;
  assignCount?: number;
};

const learnings: Learning[] = [
  {
    courseId: "course-001",
    courseName: "Full-Stack Web Development with React & Node.js",
    courseDescription:
      "Learn to build full-stack web applications using React and Node.js",
    courseImage: "https://i.ytimg.com/vi/5i8ej1-GpFU/maxresdefault.jpg",
    status: "completed",
    progress: 100,
    courseType: "individual",
  },
  {
    courseId: "course-002",
    courseName: "Python for Data Science & Machine Learning",
    courseDescription:
      "Learn to build data science and machine learning models using Python",
    courseImage:
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg",
    status: "in-progress",
    progress: 50,
    courseType: "institution",
    assignLimit: 10,
    assignCount: 4,
  },
  {
    courseId: "course-003",
    courseName: "UI/UX Design Essentials: Figma to Prototyping",
    courseDescription:
      "Learn to design user interfaces and prototypes using Figma",
    courseImage:
      "https://static.skillshare.com/uploads/video/thumbnails/0bcdb57f80be0d1cceb3f11e51408c6e/original",
    status: "in-progress",
    progress: 50,
    courseType: "individual",
  },
];

export const getLearnings = () => {
  return learnings;
};
