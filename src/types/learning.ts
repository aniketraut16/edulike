export type Learning = {
  enrollmentId: string;
  courseId: string;
  courseName: string;
  courseDescription: string;
  courseImage: string;
  status: "not-started" | "in-progress" | "completed";
  progress: number; // 0-100 percentage
  courseType: "institution" | "individual" | "corporate";
  assignLimit?: number; // Only for institution/corporate courses
  assignCount?: number; // Only for institution/corporate courses
};
