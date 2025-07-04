export type Module = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  timetofinish: number;
};

export type ModuleArgs = {
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  is_active: boolean;
  timetofinish: number;
};
