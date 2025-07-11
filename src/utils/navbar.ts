import axios from "axios";
import React from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

import {
  FlaskConical,
  Sigma,
  Cpu,
  Settings,
  Palette,
  Briefcase,
  BookOpen,
  Brain,
  Camera,
  Code,
  Database,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  Music,
  Paintbrush,
  Rocket,
  Shield,
  Stethoscope,
  Target,
  Trophy,
  Users,
  Zap,
  Circle,
  Square,
  Hexagon,
  Star,
  CircleDashed,
  CircleEllipsis,
  CircleDot,
  CircleSlash,
  CircleCheck,
  CircleHelp,
  CircleUser,
  CircleEqual,
  CircleOff,
  CirclePause,
  CirclePlay,
  CirclePlus,
  CircleMinus,
  CircleX,
  Dot,
  Ellipsis,
  MoreHorizontal,
  MoreVertical,
  SquareDashedBottom,
  SquareEqual,
  SquareUser,
  SquareCheck,
  SquarePlus,
  SquareMinus,
  SquareX,
  StarHalf,
  StarOff,
  Octagon,
  Pentagon,
  Triangle,
  Diamond,
  Infinity,
  Shapes,
  LayoutGrid,
  LayoutList,
  Layers,
  Grid,
  AppWindow,
} from "lucide-react";

// Only include neutral icons in the type (not category-specific)
export type Course = {
  category_id: string;
  name: string;
  icon:
    | typeof FlaskConical
    | typeof Sigma
    | typeof Cpu
    | typeof Settings
    | typeof Palette
    | typeof Briefcase
    | typeof BookOpen
    | typeof Brain
    | typeof Camera
    | typeof Code
    | typeof Database
    | typeof Globe
    | typeof GraduationCap
    | typeof Heart
    | typeof Lightbulb
    | typeof Music
    | typeof Paintbrush
    | typeof Rocket
    | typeof Shield
    | typeof Stethoscope
    | typeof Target
    | typeof Trophy
    | typeof Users
    | typeof Zap
    // Neutral icons:
    | typeof Circle
    | typeof Square
    | typeof Hexagon
    | typeof Star
    | typeof CircleDashed
    | typeof CircleEllipsis
    | typeof CircleDot
    | typeof CircleSlash
    | typeof CircleCheck
    | typeof CircleHelp
    | typeof CircleUser
    | typeof CircleEqual
    | typeof CircleOff
    | typeof CirclePause
    | typeof CirclePlay
    | typeof CirclePlus
    | typeof CircleMinus
    | typeof CircleX
    | typeof Dot
    | typeof Ellipsis
    | typeof MoreHorizontal
    | typeof MoreVertical
    | typeof SquareDashedBottom
    | typeof SquareEqual
    | typeof SquareUser
    | typeof SquareCheck
    | typeof SquarePlus
    | typeof SquareMinus
    | typeof SquareX
    | typeof StarHalf
    | typeof StarOff
    | typeof Octagon
    | typeof Pentagon
    | typeof Triangle
    | typeof Diamond
    | typeof Infinity
    | typeof Shapes
    | typeof LayoutGrid
    | typeof LayoutList
    | typeof Layers
    | typeof Grid
    | typeof AppWindow;
  noofcourses: number;
  courseList: {
    name: string;
    slug: string;
    id: string;
  }[];
  iconElement: React.ReactNode;
  bg: string;
  border: string;
};

// Neutral icons: geometric shapes, layout, generic UI, etc.
const neutralIcons = [
  Circle,
  Square,
  Hexagon,
  Star,
  CircleDashed,
  CircleEllipsis,
  CircleDot,
  CircleSlash,
  CircleCheck,
  CircleHelp,
  CircleUser,
  CircleEqual,
  CircleOff,
  CirclePause,
  CirclePlay,
  CirclePlus,
  CircleMinus,
  CircleX,
  Dot,
  Ellipsis,
  MoreHorizontal,
  MoreVertical,
  SquareDashedBottom,
  SquareEqual,
  SquareUser,
  SquareCheck,
  SquarePlus,
  SquareMinus,
  SquareX,
  StarHalf,
  StarOff,
  Octagon,
  Pentagon,
  Triangle,
  Diamond,
  Infinity,
  Shapes,
  LayoutGrid,
  LayoutList,
  Layers,
  Grid,
  AppWindow,
];

// All icons available for random selection (category + neutral)
const availableIcons = [
  FlaskConical,
  Sigma,
  Cpu,
  Settings,
  Palette,
  Briefcase,
  BookOpen,
  Brain,
  Camera,
  Code,
  Database,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  Music,
  Paintbrush,
  Rocket,
  Shield,
  Stethoscope,
  Target,
  Trophy,
  Users,
  Zap,
  ...neutralIcons,
];

const colorPalette = [
  { bg: "bg-blue-100", border: "hover:border-blue-500", icon: "#3B82F6" },
  { bg: "bg-orange-100", border: "hover:border-orange-500", icon: "#F97316" },
  { bg: "bg-green-100", border: "hover:border-green-500", icon: "#10B981" },
  { bg: "bg-indigo-100", border: "hover:border-indigo-500", icon: "#6366F1" },
  { bg: "bg-pink-100", border: "hover:border-pink-500", icon: "#EC4899" },
  { bg: "bg-yellow-100", border: "hover:border-yellow-500", icon: "#FBBF24" },
  { bg: "bg-purple-100", border: "hover:border-purple-500", icon: "#A855F7" },
  { bg: "bg-red-100", border: "hover:border-red-500", icon: "#EF4444" },
  { bg: "bg-teal-100", border: "hover:border-teal-500", icon: "#14B8A6" },
  { bg: "bg-lime-100", border: "hover:border-lime-500", icon: "#84CC16" },
  { bg: "bg-rose-100", border: "hover:border-rose-500", icon: "#F43F5E" },
  { bg: "bg-cyan-100", border: "hover:border-cyan-500", icon: "#06B6D4" },
  { bg: "bg-amber-100", border: "hover:border-amber-500", icon: "#F59E0B" },
  { bg: "bg-sky-100", border: "hover:border-sky-500", icon: "#0EA5E9" },
  { bg: "bg-fuchsia-100", border: "hover:border-fuchsia-500", icon: "#D946EF" },
  { bg: "bg-emerald-100", border: "hover:border-emerald-500", icon: "#059669" },
  { bg: "bg-violet-100", border: "hover:border-violet-500", icon: "#7C3AED" },
  { bg: "bg-slate-100", border: "hover:border-slate-500", icon: "#475569" },
];

const getRandomIcon = () => {
  return availableIcons[Math.floor(Math.random() * availableIcons.length)];
};

const getRandomColor = () => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};

export const getNavbarCourses = (navbarCourses: NavbarCourses[]): Course[] => {
  try {
    const transformedCourses: Course[] = navbarCourses.map((category) => {
      const randomIcon = getRandomIcon();
      const randomColor = getRandomColor();

      return {
        name: category.name,
        category_id: category.id,
        icon: randomIcon,
        noofcourses: category.total_courses,
        courseList: category.sample_courses.map((course) => ({
          name: course.title,
          slug: course.slug,
          id: course.id,
        })),
        iconElement: React.createElement(randomIcon, {
          size: 28,
          color: randomColor.icon,
        }),
        bg: randomColor.bg,
        border: randomColor.border,
      };
    });

    return transformedCourses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

type NavbarCourses = {
  id: string;
  name: string;
  slug: string;
  total_courses: number;
  sample_courses: {
    id: string;
    title: string;
    slug: string;
  }[];
};

export const getRawNavbarCourses = async (): Promise<NavbarCourses[]> => {
  try {
    const response = await axios.get(`${baseUrl}/courses/dashboard`);
    return response.data.categories as NavbarCourses[];
  } catch (error) {
    console.error("Error fetching navbar courses:", error);
    return [];
  }
};
