export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  course_count: number;
};

export type CategoryArgs = {
  name: string;
  description: string;
};
