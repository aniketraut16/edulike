export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  difficulty_level: "beginner" | "intermediate" | "advanced";
  language: string;
  total_duration: number;
  is_published?: boolean;
  pricing: {
    individual?: {
      price: number;
      tobegive: "individual";
      assignlimit: number;
    };
    institution?: {
      assignLimit: number;
      price: number;
    }[];
    corporate?: {
      assignLimit: number;
      price: number;
    }[];
  };
  rating: number | null;
  rating_count: number;
  lessons: number;
  enrollment_count: number;
  created_at: string;
};

export type CourseArgs = {
  title: string;
  description: string;
  category_id: string;
  difficulty_level: "beginner" | "intermediate" | "advanced";
  language: string;
  prerequisites: string;
  what_you_will_learn: string[];
  target_audience: string;
  is_active: boolean;
  is_published: boolean;
  timetofinish: number;
};

export type CourseRatingArgs = {
  courseId: string;
  rating: number;
  total_ratings: number;
};

export type DetailedCourse = {
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
  difficulty_level: "beginner" | "intermediate" | "advanced";
  language: string;
  prerequisites: string;
  what_you_will_learn: string[];
  target_audience: string;
  total_duration: number;
  timetofinish: number | null;
  modules: {
    moduleId: string;
    title: string;
    description: string;
    order_index: number;
    is_active: boolean;
  }[];
  enrollment_count: number;
  module_count: number;
  created_at: string;
  updated_at: string;
  pricing: {
    individual?: {
      price: number | string;
      tobegive: "individual";
      assignlimit: number;
    };
    institution?: {
      assignLimit: number;
      price: number | string;
    }[];
    corporate?: {
      assignLimit: number;
      price: number | string;
    }[];
  };
  rating: number | null;
  rating_count: number;
};

export type CoursePriceArgs = {
  tobegive: "individual" | "institution" | "corporate";
  pricing: { price: number; assignlimit: number }[];
};
