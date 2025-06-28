export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  pricing: {
    individual?: {
      price: number;
      tobegive: string;
      assignlimit: number;
    };
    institution: {
      assignLimit: number;
      price: number;
    }[];
    corporate: {
      assignLimit: number;
      price: number;
    }[];
  };
  lessons: number;
  difficulty_level: string;
  language: string;
  rating: number;
  category: string;
  kcType?: string;
  enrollment_count: number;
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
  pricing: {
    individual?: {
      price: string;
      tobegive: string;
      assignlimit: number;
    };
    institution: {
      assignLimit: number;
      price: string;
    }[];
    corporate: {
      assignLimit: number;
      price: string;
    }[];
  };
  rating: number | null;
  rating_count: number;
  what_you_will_learn: string[];
  target_audience: string;
  total_duration: number;
  timetofinish: string | null;
  modules: Module[];
  enrollment_count: number;
  module_count: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  course_count: number;
};
