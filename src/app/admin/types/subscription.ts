export type Subscription = {
  id: string;
  duration: number;
  title: string | null;
  amount: string;
  currency: string;
  description: string;
  created_at: string;
  updated_at: string;
  _count: {
    subscription_courses: number;
    subscription_users: number;
  };
};

export type SubscriptionArgs = {
  title: string;
  duration: number;
  amount: number;
  currency: "INR";
  description: string;
};
