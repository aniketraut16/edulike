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

export type MaterialWithProgress = {
  materialId: string;
  moduleId: string;
  materialTitle: string;
  materialType: "video" | "live_session" | "external_link" | "document";
  content: string | null;
  filePath: string | null;
  duration: number;
  orderIndex: number;
  isActive: boolean;
  meetLink: string | null;
  scheduledAt: string | null;
  externalUrl: string | null;
  createdAt: string;
  updatedAt: string;
  status: "completed" | "not completed";
};

export type ModuleWithProgress = {
  moduleId: string;
  moduleTitle: string;
  moduleDescription: string;
  orderIndex: number;
  totalMaterials: number;
  completedMaterials: number;
  status: "not completed" | "completed";
  materials: MaterialWithProgress[];
};

export type CourseWithProgress = {
  total_modules: number;
  modules: ModuleWithProgress[];
};
