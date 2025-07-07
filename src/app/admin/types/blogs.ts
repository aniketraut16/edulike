export type Blog = {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type BlogsResponse = {
  blogs: Blog[];
  pagination: pagination;
};

export type BlogArgs = {
  title: string;
  content: string;
  image_url: string;
};
