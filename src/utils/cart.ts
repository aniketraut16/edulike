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
  assingLimit?: number;
};

export const getCart = () => {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [
      {
        courseId: "course-001",
        courseName: "Full-Stack Web Development with React & Node.js",
        coursePrice: 149,
        courseImage: "https://i.ytimg.com/vi/5i8ej1-GpFU/maxresdefault.jpg",
        courseCategory: "Web Development",
        courseModulesLength: 42,
        courseTotalDuration: 60,
        courseLanguage: "English",
        quantity: 1,
        for: "individual",
      },
      {
        courseId: "course-002",
        courseName: "Python for Data Science & Machine Learning",
        coursePrice: 129,
        courseImage:
          "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg",
        courseCategory: "Data Science",
        courseModulesLength: 38,
        courseTotalDuration: 48,
        courseLanguage: "English",
        quantity: 1,
        for: "institution",
        assingLimit: 10,
      },
      {
        courseId: "course-003",
        courseName: "UI/UX Design Essentials: Figma to Prototyping",
        coursePrice: 99,
        courseImage:
          "https://static.skillshare.com/uploads/video/thumbnails/0bcdb57f80be0d1cceb3f11e51408c6e/original",
        courseCategory: "Design",
        courseModulesLength: 27,
        courseTotalDuration: 30,
        courseLanguage: "English",
        quantity: 1,
        for: "individual",
      },
    ];
  }
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (item: CartItem) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (cartItem: CartItem) => cartItem.courseId === item.courseId
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  return cart;
};

export const removeFromCart = (courseId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(
    (item: CartItem) => item.courseId !== courseId
  );
  saveCart(updatedCart);
  return updatedCart;
};

export const updateCartItemQuantity = (courseId: string, quantity: number) => {
  if (quantity < 1) return getCart();

  const cart = getCart();
  const updatedCart = cart.map((item: CartItem) =>
    item.courseId === courseId ? { ...item, quantity } : item
  );

  saveCart(updatedCart);
  return updatedCart;
};

export const clearCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cart");
  return [];
};
