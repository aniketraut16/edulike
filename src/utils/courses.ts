import {
  FlaskConical,
  Sigma,
  Cpu,
  Settings,
  Palette,
  Briefcase,
} from "lucide-react";
export type Course = {
  name: string;
  icon:
    | typeof FlaskConical
    | typeof Sigma
    | typeof Cpu
    | typeof Settings
    | typeof Palette
    | typeof Briefcase;
  noofcourses: number;
  courseList: {
    name: string;
    slug: string;
  }[];
};

const rawCategories: Course[] = [
  {
    name: "Science",
    icon: FlaskConical,
    noofcourses: 10,
    courseList: [
      {
        name: "Introduction to Physics",
        slug: "introduction-to-physics",
      },
      {
        name: "General Chemistry",
        slug: "general-chemistry",
      },
      {
        name: "Biology: The Science of Life",
        slug: "biology-the-science-of-life",
      },
      {
        name: "Environmental Science",
        slug: "environmental-science",
      },
      {
        name: "Astronomy: Exploring the Universe",
        slug: "astronomy-exploring-the-universe",
      },
      {
        name: "Organic Chemistry",
        slug: "organic-chemistry",
      },
      {
        name: "Genetics and Evolution",
        slug: "genetics-and-evolution",
      },
      {
        name: "Earth Science Fundamentals",
        slug: "earth-science-fundamentals",
      },
      {
        name: "Human Anatomy & Physiology",
        slug: "human-anatomy-physiology",
      },
      {
        name: "Scientific Research Methods",
        slug: "scientific-research-methods",
      },
    ],
  },
  {
    name: "Mathematics",
    icon: Sigma,
    noofcourses: 8,
    courseList: [
      {
        name: "Calculus I",
        slug: "calculus-i",
      },
      {
        name: "Linear Algebra",
        slug: "linear-algebra",
      },
      {
        name: "Statistics and Probability",
        slug: "statistics-and-probability",
      },
      {
        name: "Discrete Mathematics",
        slug: "discrete-mathematics",
      },
      {
        name: "Differential Equations",
        slug: "differential-equations",
      },
      {
        name: "Mathematical Logic",
        slug: "mathematical-logic",
      },
      {
        name: "Number Theory",
        slug: "number-theory",
      },
      {
        name: "Geometry Essentials",
        slug: "geometry-essentials",
      },
    ],
  },
  {
    name: "Technology",
    icon: Cpu,
    noofcourses: 12,
    courseList: [
      {
        name: "Introduction to Computer Science",
        slug: "introduction-to-computer-science",
      },
      {
        name: "Web Development Fundamentals",
        slug: "web-development-fundamentals",
      },
      {
        name: "Data Structures and Algorithms",
        slug: "data-structures-and-algorithms",
      },
      {
        name: "Introduction to Artificial Intelligence",
        slug: "introduction-to-artificial-intelligence",
      },
      {
        name: "Cybersecurity Basics",
        slug: "cybersecurity-basics",
      },
      {
        name: "Mobile App Development",
        slug: "mobile-app-development",
      },
      {
        name: "Cloud Computing Essentials",
        slug: "cloud-computing-essentials",
      },
      {
        name: "Database Management Systems",
        slug: "database-management-systems",
      },
      {
        name: "Machine Learning Foundations",
        slug: "machine-learning-foundations",
      },
      {
        name: "Internet of Things (IoT)",
        slug: "internet-of-things-iot",
      },
      {
        name: "Software Engineering Principles",
        slug: "software-engineering-principles",
      },
      {
        name: "Blockchain Technology",
        slug: "blockchain-technology",
      },
    ],
  },
  {
    name: "Engineering",
    icon: Settings,
    noofcourses: 7,
    courseList: [
      {
        name: "Fundamentals of Engineering",
        slug: "fundamentals-of-engineering",
      },
      {
        name: "Electrical Engineering Basics",
        slug: "electrical-engineering-basics",
      },
      {
        name: "Mechanical Engineering Principles",
        slug: "mechanical-engineering-principles",
      },
      {
        name: "Civil Engineering Design",
        slug: "civil-engineering-design",
      },
      {
        name: "Thermodynamics",
        slug: "thermodynamics",
      },
      {
        name: "Materials Science",
        slug: "materials-science",
      },
      {
        name: "Engineering Project Management",
        slug: "engineering-project-management",
      },
    ],
  },
  {
    name: "Arts",
    icon: Palette,
    noofcourses: 6,
    courseList: [
      {
        name: "Modern Art History",
        slug: "modern-art-history",
      },
      {
        name: "Introduction to Painting",
        slug: "introduction-to-painting",
      },
      {
        name: "Digital Photography",
        slug: "digital-photography",
      },
      {
        name: "Music Theory Basics",
        slug: "music-theory-basics",
      },
      {
        name: "Creative Writing Workshop",
        slug: "creative-writing-workshop",
      },
      {
        name: "Graphic Design Fundamentals",
        slug: "graphic-design-fundamentals",
      },
    ],
  },
  {
    name: "Business",
    icon: Briefcase,
    noofcourses: 9,
    courseList: [
      {
        name: "Principles of Marketing",
        slug: "principles-of-marketing",
      },
      {
        name: "Financial Accounting",
        slug: "financial-accounting",
      },
      {
        name: "Business Management Essentials",
        slug: "business-management-essentials",
      },
      {
        name: "Entrepreneurship 101",
        slug: "entrepreneurship-101",
      },
      {
        name: "Human Resource Management",
        slug: "human-resource-management",
      },
      {
        name: "Business Communication",
        slug: "business-communication",
      },
      {
        name: "Operations Management",
        slug: "operations-management",
      },
      {
        name: "International Business",
        slug: "international-business",
      },
      {
        name: "Business Ethics and Law",
        slug: "business-ethics-and-law",
      },
    ],
  },
];

export const getCourses = () => {
  return rawCategories;
};
