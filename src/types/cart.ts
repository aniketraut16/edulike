export type AddToCart = {
  courseId: string;
  cartId: string;
  userId?: string;
  quantity: number;
  accessType: "individual" | "institution" | "corporate";
  assignLimit?: number;
};

export type CartItem = {
  courseId: string;
  courseName: string;
  coursePrice: number;
  courseImage: string;
  courseCategory: string;
  courseModulesLength: number;
  courseTotalDuration: number;
  courseLanguage: string;
  quantity: number;
  for: "individual" | "institution" | "corporate";
  assignLimit?: number;
};

export type updateCart = {
  cartId: string;
  courseId: string;
  quantity: number;
};
