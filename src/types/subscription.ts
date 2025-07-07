import { Course } from "@/types/courses";
export type UserSubscription = {
  user_id: string;
  subscription_id: string;
  expiry_date: string;
  status: string;
  subscriptions: {
    id: string;
    duration: number;
    title: string;
    amount: string;
    currency: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
};

export type SubscriptionCourses = {
  course_id: string;
  subscription_id: string;
  courses: Course;
};
