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

export type Category = {
  id: string;
  name: string;
  course_count: number;
};
