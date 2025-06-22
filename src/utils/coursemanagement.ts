export type Course = {
  title: string;
  description: string;
  image: string;
  instructor: string;
  price: number;
  originalPrice: number;
  lessons: number;
  difficulty: string;
  language: string;
  rating: number;
  category: string;
};

export const courses = [
  // --- Web Development & Programming ---
  {
    title: "Full-Stack Web Development with React & Node.js",
    description:
      "Master modern web development by building real-world applications using React, Node.js, Express, and MongoDB.",
    image: "https://i.ytimg.com/vi/5i8ej1-GpFU/maxresdefault.jpg",
    instructor: "Sarah Thompson",
    price: 149,
    originalPrice: 249,
    lessons: 42,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.8,
    category: "Web Development",
  },
  {
    title: "Advanced JavaScript: ES6+, TypeScript & Patterns",
    description:
      "Deep dive into modern JavaScript, TypeScript, and advanced programming patterns for scalable applications.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Michael Lee",
    price: 139,
    originalPrice: 199,
    lessons: 34,
    difficulty: "Advanced",
    language: "English",
    rating: 4.7,
    category: "Web Development",
  },
  {
    title: "Introduction to HTML & CSS",
    description:
      "Start your web development journey by learning the building blocks of the web: HTML and CSS.",
    image: "https://www.htmlcsscolor.com/preview/gallery/html-css.png",
    instructor: "Ava Patel",
    price: 59,
    originalPrice: 99,
    lessons: 18,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Web Development",
  },
  {
    title: "TypeScript for Modern Web Apps",
    description:
      "Learn TypeScript from scratch and use it to build robust, scalable web applications.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Lucas Wang",
    price: 89,
    originalPrice: 139,
    lessons: 24,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.5,
    category: "Web Development",
  },
  {
    title: "Node.js & Express: Backend Development",
    description:
      "Build scalable backend APIs and services using Node.js and Express.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Carlos Martinez",
    price: 99,
    originalPrice: 159,
    lessons: 28,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "Web Development",
  },
  {
    title: "Mobile App Development with Flutter",
    description:
      "Create beautiful cross-platform mobile apps using Flutter and Dart.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Sofia Rossi",
    price: 119,
    originalPrice: 179,
    lessons: 32,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Mobile Development",
  },
  {
    title: "Data Structures and Algorithms in Java",
    description:
      "Master core data structures and algorithms using Java for technical interviews and real-world projects.",
    image: "https://www.geeksforgeeks.org/wp-content/uploads/DSA.png",
    instructor: "Rajesh Kumar",
    price: 129,
    originalPrice: 199,
    lessons: 36,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.8,
    category: "Programming",
  },
  {
    title: "C++ Programming: From Basics to Advanced",
    description:
      "Learn C++ programming from scratch, including OOP, STL, and advanced concepts.",
    image:
      "https://www.codingninjas.com/blog/wp-content/uploads/2020/09/C-1.png",
    instructor: "Elena Petrova",
    price: 109,
    originalPrice: 169,
    lessons: 30,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Programming",
  },
  {
    title: "Go Language for Backend Systems",
    description:
      "Build high-performance backend systems and microservices using Go.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Tom Becker",
    price: 119,
    originalPrice: 179,
    lessons: 26,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.5,
    category: "Programming",
  },
  {
    title: "Rust Programming Essentials",
    description:
      "Get started with Rust and learn how to build safe, fast, and concurrent applications.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Maya Singh",
    price: 129,
    originalPrice: 189,
    lessons: 22,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "Programming",
  },
  // --- Data Science & AI ---
  {
    title: "Python for Data Science & Machine Learning",
    description:
      "Learn Python from scratch and apply it to data analysis, visualization, and machine learning projects.",
    image:
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg",
    instructor: "Dr. Anil Mehra",
    price: 129,
    originalPrice: 199,
    lessons: 38,
    difficulty: "Beginner",
    language: "English",
    rating: 4.9,
    category: "Data Science",
  },
  {
    title: "Machine Learning with scikit-learn",
    description:
      "Build predictive models and understand core ML concepts using Python and scikit-learn.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Olivia Brown",
    price: 139,
    originalPrice: 209,
    lessons: 29,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Data Science",
  },
  {
    title: "Deep Learning with TensorFlow & Keras",
    description:
      "Master deep learning by building neural networks for image and text data using TensorFlow and Keras.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Dr. Ahmed El-Sayed",
    price: 149,
    originalPrice: 229,
    lessons: 35,
    difficulty: "Advanced",
    language: "English",
    rating: 4.8,
    category: "Data Science",
  },
  {
    title: "Data Visualization with Python",
    description:
      "Create stunning data visualizations using Matplotlib, Seaborn, and Plotly.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Julia Müller",
    price: 89,
    originalPrice: 139,
    lessons: 20,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Data Science",
  },
  {
    title: "Natural Language Processing with Python",
    description:
      "Explore NLP techniques and build text analysis models using NLTK and spaCy.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Samuel Green",
    price: 119,
    originalPrice: 179,
    lessons: 24,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Data Science",
  },
  {
    title: "Big Data Analytics with Spark",
    description: "Analyze massive datasets using Apache Spark and PySpark.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
    instructor: "Wei Zhang",
    price: 149,
    originalPrice: 219,
    lessons: 28,
    difficulty: "Advanced",
    language: "English",
    rating: 4.8,
    category: "Data Science",
  },
  // --- UI/UX & Design ---
  {
    title: "UI/UX Design Essentials: Figma to Prototyping",
    description:
      "Design beautiful and user-friendly interfaces with Figma, and learn the fundamentals of UX research and prototyping.",
    image:
      "https://static.skillshare.com/uploads/video/thumbnails/0bcdb57f80be0d1cceb3f11e51408c6e/original",
    instructor: "Emily Carter",
    price: 99,
    originalPrice: 159,
    lessons: 27,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Design",
  },
  {
    title: "Adobe Photoshop for Beginners",
    description:
      "Learn the basics of Adobe Photoshop and start editing photos like a pro.",
    image: "https://www.adobe.com/content/dam/cc/icons/photoshop-mobile.svg",
    instructor: "Liam O'Connor",
    price: 79,
    originalPrice: 129,
    lessons: 18,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Design",
  },
  {
    title: "Graphic Design Masterclass",
    description:
      "Master the principles of graphic design and create stunning visuals for web and print.",
    image: "https://www.canva.com/design/DAE6QwQwQwQ/view",
    instructor: "Sophia Lee",
    price: 119,
    originalPrice: 179,
    lessons: 30,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Design",
  },
  {
    title: "Motion Graphics with After Effects",
    description:
      "Create engaging motion graphics and animations using Adobe After Effects.",
    image: "https://www.adobe.com/content/dam/cc/icons/aftereffects.svg",
    instructor: "Noah Smith",
    price: 129,
    originalPrice: 189,
    lessons: 22,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "Design",
  },
  {
    title: "3D Modeling with Blender",
    description: "Learn 3D modeling, texturing, and rendering using Blender.",
    image:
      "https://www.blender.org/wp-content/uploads/2019/11/blender_logo.png",
    instructor: "Isabella Rossi",
    price: 139,
    originalPrice: 199,
    lessons: 28,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Design",
  },
  // --- Business & Marketing ---
  {
    title: "Digital Marketing Masterclass: SEO, SEM & Analytics",
    description:
      "Grow your business or career with hands-on digital marketing strategies, SEO, SEM, and Google Analytics.",
    image:
      "https://media.assettype.com/analyticsinsight/2024-08-06/9k7iet26/Top-75-Digital-Marketing-Courses-to-Explore.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true",
    instructor: "Priya Sharma",
    price: 119,
    originalPrice: 179,
    lessons: 30,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.8,
    category: "Business",
  },
  {
    title: "Principles of Marketing",
    description:
      "Understand the core principles of marketing and how to apply them in real-world scenarios.",
    image:
      "https://www.marketing91.com/wp-content/uploads/2018/09/Principles-of-Marketing.jpg",
    instructor: "Dr. John Miller",
    price: 89,
    originalPrice: 139,
    lessons: 20,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Business",
  },
  {
    title: "Financial Accounting Fundamentals",
    description:
      "Learn the basics of financial accounting, including balance sheets, income statements, and cash flow.",
    image:
      "https://www.accountingcoach.com/wp-content/uploads/2021/01/accounting-fundamentals.jpg",
    instructor: "Linda Chen",
    price: 99,
    originalPrice: 149,
    lessons: 22,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Business",
  },
  {
    title: "Entrepreneurship 101",
    description:
      "Start your entrepreneurial journey by learning how to launch and grow a successful business.",
    image:
      "https://www.entrepreneur.com/sites/default/files/20150408171309-entrepreneur-rocket.jpeg",
    instructor: "Alex Johnson",
    price: 109,
    originalPrice: 169,
    lessons: 24,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Business",
  },
  {
    title: "Business Communication Skills",
    description:
      "Develop effective communication skills for the workplace, including presentations and negotiations.",
    image: "https://www.skillsyouneed.com/images/business-communication.jpg",
    instructor: "Maria Garcia",
    price: 79,
    originalPrice: 129,
    lessons: 16,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Business",
  },
  {
    title: "Operations Management",
    description:
      "Learn how to manage business operations efficiently and effectively.",
    image: "https://www.investopedia.com/thmb/operations-management.jpg",
    instructor: "Dr. Peter Evans",
    price: 109,
    originalPrice: 169,
    lessons: 20,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Business",
  },
  {
    title: "Human Resource Management",
    description:
      "Understand HR principles, recruitment, and employee management.",
    image: "https://www.hrzone.com/sites/default/files/hr-management.jpg",
    instructor: "Samantha Lee",
    price: 99,
    originalPrice: 149,
    lessons: 18,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Business",
  },
  {
    title: "Business Ethics and Law",
    description: "Explore ethical issues and legal frameworks in business.",
    image:
      "https://www.businessnewsdaily.com/images/i/000/004/234/original/business-ethics.jpg",
    instructor: "Dr. Henry Clark",
    price: 89,
    originalPrice: 139,
    lessons: 16,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.5,
    category: "Business",
  },
  {
    title: "International Business",
    description:
      "Learn about global business strategies, trade, and cross-cultural management.",
    image: "https://www.investopedia.com/thmb/international-business.jpg",
    instructor: "Yuki Tanaka",
    price: 119,
    originalPrice: 179,
    lessons: 22,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Business",
  },
  // --- Cloud, DevOps & Security ---
  {
    title: "Introduction to Cloud Computing with AWS",
    description:
      "Get started with cloud computing and learn how to deploy, manage, and scale applications on AWS.",
    image:
      "https://images.squarespace-cdn.com/content/v1/60cfd646701da4034512a1c5/ca3d678a-cbfc-4c9c-bc79-9d3be9fb907e/AWS-Cloud.png?format=2500w",
    instructor: "David Kim",
    price: 109,
    originalPrice: 169,
    lessons: 22,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Cloud Computing",
  },
  {
    title: "DevOps Fundamentals: CI/CD & Automation",
    description:
      "Learn the basics of DevOps, continuous integration, and deployment automation.",
    image:
      "https://www.redhat.com/cms/managed-files/styles/wysiwyg_full_width/s3/devops-automation.png",
    instructor: "Nina Ivanova",
    price: 129,
    originalPrice: 189,
    lessons: 24,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "DevOps",
  },
  {
    title: "Kubernetes for Developers",
    description:
      "Deploy, manage, and scale containerized applications using Kubernetes.",
    image: "https://kubernetes.io/images/favicon.png",
    instructor: "Omar Farouk",
    price: 139,
    originalPrice: 199,
    lessons: 26,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "DevOps",
  },
  {
    title: "Cybersecurity Basics",
    description:
      "Understand the fundamentals of cybersecurity, threats, and protection strategies.",
    image:
      "https://www.csoonline.com/wp-content/uploads/2023/10/cybersecurity_threats_by_traffic_analyzer_gettyimages-1354897117-100919006-orig.jpg",
    instructor: "Jessica Turner",
    price: 99,
    originalPrice: 149,
    lessons: 18,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Security",
  },
  {
    title: "Ethical Hacking & Penetration Testing",
    description:
      "Learn ethical hacking techniques and penetration testing tools.",
    image:
      "https://www.eccouncil.org/wp-content/uploads/2020/12/ethical-hacking.jpg",
    instructor: "Mohammed Ali",
    price: 149,
    originalPrice: 219,
    lessons: 28,
    difficulty: "Advanced",
    language: "English",
    rating: 4.8,
    category: "Security",
  },
  // --- Science & Engineering ---
  {
    title: "Introduction to Physics",
    description:
      "Explore the fundamental concepts of physics, including motion, energy, and forces.",
    image:
      "https://www.sciencenews.org/wp-content/uploads/2020/01/010820_mt_physics_feat-1028x579.jpg",
    instructor: "Dr. Emily White",
    price: 89,
    originalPrice: 139,
    lessons: 20,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Science",
  },
  {
    title: "General Chemistry",
    description:
      "Learn the basics of chemistry, including atoms, molecules, and chemical reactions.",
    image:
      "https://www.chemistryworld.com/pictures/960x640fit/6/2/2/chemistry-lab-960.jpg",
    instructor: "Dr. Mark Robinson",
    price: 99,
    originalPrice: 149,
    lessons: 22,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Science",
  },
  {
    title: "Biology: The Science of Life",
    description:
      "Discover the principles of biology, from cells to ecosystems.",
    image:
      "https://www.nature.com/immersive/d41586-019-02745-6/assets/biologist.jpg",
    instructor: "Dr. Anna Müller",
    price: 89,
    originalPrice: 139,
    lessons: 18,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Science",
  },
  {
    title: "Environmental Science",
    description:
      "Study the environment, ecosystems, and sustainability challenges.",
    image:
      "https://www.nationalgeographic.com/content/dam/environment/2019/07/environmental-science/01-environmental-science-nationalgeographic_1457034.jpg",
    instructor: "Dr. Lucas Silva",
    price: 99,
    originalPrice: 149,
    lessons: 20,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Science",
  },
  {
    title: "Astronomy: Exploring the Universe",
    description:
      "Learn about stars, planets, galaxies, and the mysteries of the universe.",
    image:
      "https://www.nasa.gov/sites/default/files/thumbnails/image/edu_what_is_astronomy.jpg",
    instructor: "Dr. Rachel Kim",
    price: 109,
    originalPrice: 169,
    lessons: 22,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Science",
  },
  {
    title: "Organic Chemistry",
    description:
      "Dive into the world of organic molecules and chemical reactions.",
    image:
      "https://www.chemistryworld.com/pictures/960x640fit/6/2/2/chemistry-lab-960.jpg",
    instructor: "Dr. Ethan Brown",
    price: 119,
    originalPrice: 179,
    lessons: 24,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "Science",
  },
  {
    title: "Genetics and Evolution",
    description: "Explore the science of genes, heredity, and evolution.",
    image:
      "https://www.genome.gov/sites/default/files/tg/en/illustration/genetics.jpg",
    instructor: "Dr. Priya Nair",
    price: 109,
    originalPrice: 169,
    lessons: 20,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Science",
  },
  {
    title: "Human Anatomy & Physiology",
    description: "Understand the structure and function of the human body.",
    image: "https://www.visiblebody.com/sites/default/files/anatomy.jpg",
    instructor: "Dr. William Lee",
    price: 119,
    originalPrice: 179,
    lessons: 22,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Science",
  },
  {
    title: "Scientific Research Methods",
    description:
      "Learn how to design, conduct, and analyze scientific research.",
    image:
      "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/ResearchMethods_1280x720.jpg",
    instructor: "Dr. Laura Chen",
    price: 99,
    originalPrice: 149,
    lessons: 18,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Science",
  },
  // --- Mathematics ---
  {
    title: "Calculus I",
    description:
      "Master the fundamentals of calculus, including limits, derivatives, and integrals.",
    image: "https://www.mathsisfun.com/calculus/images/calculus-title.svg",
    instructor: "Dr. Benjamin Carter",
    price: 109,
    originalPrice: 169,
    lessons: 24,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Mathematics",
  },
  {
    title: "Linear Algebra",
    description: "Learn about vectors, matrices, and linear transformations.",
    image: "https://www.mathsisfun.com/algebra/images/linear-algebra-title.svg",
    instructor: "Dr. Alice Nguyen",
    price: 99,
    originalPrice: 149,
    lessons: 20,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "Mathematics",
  },
  {
    title: "Statistics and Probability",
    description:
      "Understand probability, distributions, and statistical inference.",
    image:
      "https://www.statisticshowto.com/wp-content/uploads/2013/09/statistics.png",
    instructor: "Dr. Daniel Kim",
    price: 89,
    originalPrice: 139,
    lessons: 18,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Mathematics",
  },
  {
    title: "Discrete Mathematics",
    description: "Study logic, sets, combinatorics, and graph theory.",
    image: "https://www.cuemath.com/learn/images/discrete-mathematics.png",
    instructor: "Dr. Fatima Zahra",
    price: 99,
    originalPrice: 149,
    lessons: 20,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "Mathematics",
  },
  {
    title: "Differential Equations",
    description:
      "Solve ordinary differential equations and apply them to real-world problems.",
    image:
      "https://www.mathsisfun.com/calculus/images/differential-equations-title.svg",
    instructor: "Dr. George Ivanov",
    price: 109,
    originalPrice: 169,
    lessons: 22,
    difficulty: "Advanced",
    language: "English",
    rating: 4.7,
    category: "Mathematics",
  },
  {
    title: "Mathematical Logic",
    description:
      "Explore propositional and predicate logic, proofs, and reasoning.",
    image: "https://www.cuemath.com/learn/images/mathematical-logic.png",
    instructor: "Dr. Chloe Martin",
    price: 89,
    originalPrice: 139,
    lessons: 16,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "Mathematics",
  },
  {
    title: "Number Theory",
    description:
      "Dive into the properties of integers, primes, and modular arithmetic.",
    image: "https://www.cuemath.com/learn/images/number-theory.png",
    instructor: "Dr. Ahmed Hassan",
    price: 99,
    originalPrice: 149,
    lessons: 18,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "Mathematics",
  },
  {
    title: "Geometry Essentials",
    description: "Learn about shapes, theorems, and geometric constructions.",
    image: "https://www.cuemath.com/learn/images/geometry.png",
    instructor: "Dr. Isabella Rossi",
    price: 89,
    originalPrice: 139,
    lessons: 16,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Mathematics",
  },
  // --- Personal Development & Soft Skills ---
  {
    title: "Public Speaking & Presentation Skills",
    description: "Overcome stage fright and deliver impactful presentations.",
    image:
      "https://www.toastmasters.org/-/media/images/education/education-programs/public-speaking.jpg",
    instructor: "James Anderson",
    price: 79,
    originalPrice: 129,
    lessons: 14,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Personal Development",
  },
  {
    title: "Time Management for Professionals",
    description:
      "Boost your productivity with proven time management techniques.",
    image:
      "https://www.lifehack.org/wp-content/uploads/2015/03/time-management.jpg",
    instructor: "Olga Petrova",
    price: 69,
    originalPrice: 109,
    lessons: 10,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Personal Development",
  },
  {
    title: "Critical Thinking & Problem Solving",
    description:
      "Sharpen your analytical skills and learn to solve complex problems.",
    image: "https://www.skillsyouneed.com/images/critical-thinking.jpg",
    instructor: "Dr. Steven Clark",
    price: 89,
    originalPrice: 139,
    lessons: 12,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Personal Development",
  },
  {
    title: "Emotional Intelligence at Work",
    description: "Develop self-awareness and manage relationships effectively.",
    image: "https://www.skillsyouneed.com/images/emotional-intelligence.jpg",
    instructor: "Dr. Aisha Rahman",
    price: 79,
    originalPrice: 129,
    lessons: 10,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Personal Development",
  },
  // --- Language & Communication ---
  {
    title: "English Grammar & Writing Skills",
    description:
      "Improve your English grammar and writing for academic and professional success.",
    image:
      "https://www.grammarly.com/blog/wp-content/uploads/2018/10/Grammar-101.jpg",
    instructor: "Emma Wilson",
    price: 69,
    originalPrice: 109,
    lessons: 16,
    difficulty: "Beginner",
    language: "English",
    rating: 4.8,
    category: "Language",
  },
  {
    title: "Spanish for Beginners",
    description:
      "Start speaking Spanish with essential vocabulary and phrases.",
    image: "https://www.transparent.com/learn-spanish/images/spanish-flag.jpg",
    instructor: "Carlos Ramirez",
    price: 79,
    originalPrice: 129,
    lessons: 18,
    difficulty: "Beginner",
    language: "Spanish",
    rating: 4.7,
    category: "Language",
  },
  {
    title: "French Language Essentials",
    description: "Learn basic French grammar, vocabulary, and conversation.",
    image: "https://www.transparent.com/learn-french/images/french-flag.jpg",
    instructor: "Marie Dubois",
    price: 79,
    originalPrice: 129,
    lessons: 18,
    difficulty: "Beginner",
    language: "French",
    rating: 4.7,
    category: "Language",
  },
  {
    title: "Mandarin Chinese for Beginners",
    description:
      "Master Mandarin pronunciation, tones, and basic conversation.",
    image: "https://www.transparent.com/learn-chinese/images/chinese-flag.jpg",
    instructor: "Li Wei",
    price: 89,
    originalPrice: 139,
    lessons: 20,
    difficulty: "Beginner",
    language: "Chinese",
    rating: 4.7,
    category: "Language",
  },
  // --- Miscellaneous & Creative ---
  {
    title: "Photography Basics: From Auto to Manual",
    description: "Take control of your camera and capture stunning photos.",
    image:
      "https://www.nationalgeographic.com/content/dam/photography/rights-exempt/Best-of-2018/best-photos-2018-national-geographic_1.jpg",
    instructor: "Lucas Martin",
    price: 99,
    originalPrice: 149,
    lessons: 16,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Creative",
  },
  {
    title: "Music Theory for Beginners",
    description:
      "Understand the basics of music theory, notation, and composition.",
    image:
      "https://www.musicnotes.com/now/wp-content/uploads/Music-Theory-For-Beginners.jpg",
    instructor: "Sophia Kim",
    price: 69,
    originalPrice: 109,
    lessons: 12,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Creative",
  },
  {
    title: "Creative Writing Workshop",
    description:
      "Unlock your creativity and write compelling stories and poems.",
    image:
      "https://www.writersdigest.com/.image/t_share/MTc0NDI2NjQwNjQwNjQwNjQw/creative-writing.jpg",
    instructor: "Oliver Scott",
    price: 79,
    originalPrice: 129,
    lessons: 14,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Creative",
  },
  {
    title: "Personal Finance & Investing",
    description:
      "Learn how to manage your money, budget, and invest for the future.",
    image: "https://www.investopedia.com/thmb/personal-finance.jpg",
    instructor: "Jessica Lee",
    price: 99,
    originalPrice: 149,
    lessons: 18,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Personal Finance",
  },
  {
    title: "Yoga & Mindfulness for Beginners",
    description:
      "Practice yoga and mindfulness techniques for a healthier life.",
    image:
      "https://www.yogajournal.com/wp-content/uploads/2021/06/yoga-mindfulness.jpg",
    instructor: "Anjali Sharma",
    price: 59,
    originalPrice: 99,
    lessons: 10,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Health",
  },
  {
    title: "Cooking Fundamentals: From Prep to Plate",
    description:
      "Master essential cooking techniques and recipes for delicious meals.",
    image:
      "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/cooking-fundamentals.jpg",
    instructor: "Chef Marco Rossi",
    price: 89,
    originalPrice: 139,
    lessons: 16,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Creative",
  },
  {
    title: "Gardening for Urban Spaces",
    description: "Grow your own herbs and vegetables in small spaces.",
    image:
      "https://www.gardendesign.com/pictures/images/900x705Max/site_3/urban-gardening-ideas-garden-design_11313.jpg",
    instructor: "Linda Green",
    price: 69,
    originalPrice: 109,
    lessons: 10,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Creative",
  },
  {
    title: "Introduction to Philosophy",
    description:
      "Explore the big questions of existence, knowledge, and ethics.",
    image: "https://www.philosophybasics.com/images/philosophy.jpg",
    instructor: "Dr. Ethan Carter",
    price: 79,
    originalPrice: 129,
    lessons: 12,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Humanities",
  },
  {
    title: "Art History: From Renaissance to Modern",
    description:
      "Discover the evolution of art from the Renaissance to the present.",
    image: "https://www.theartstory.org/images20/hero/renaissance.jpg",
    instructor: "Dr. Isabella Moretti",
    price: 99,
    originalPrice: 149,
    lessons: 18,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Humanities",
  },
  {
    title: "Film Making Basics",
    description: "Learn the essentials of film making, from script to screen.",
    image: "https://www.filmmaking.net/images/filmmaking.jpg",
    instructor: "David Park",
    price: 109,
    originalPrice: 169,
    lessons: 16,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Creative",
  },
  // --- Health & Wellness ---
  {
    title: "Nutrition & Healthy Living",
    description:
      "Understand the basics of nutrition and how to live a healthy lifestyle.",
    image:
      "https://www.healthline.com/hlcmsresource/images/AN_images/healthy-eating-1296x728-feature.jpg",
    instructor: "Dr. Maria Lopez",
    price: 79,
    originalPrice: 129,
    lessons: 12,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Health",
  },
  {
    title: "First Aid & Emergency Response",
    description: "Learn essential first aid skills for emergencies.",
    image: "https://www.redcross.org/content/dam/redcross/first-aid.jpg",
    instructor: "Dr. John Smith",
    price: 69,
    originalPrice: 109,
    lessons: 8,
    difficulty: "Beginner",
    language: "English",
    rating: 4.6,
    category: "Health",
  },
  {
    title: "Personal Fitness Training",
    description: "Get fit with personalized workout routines and fitness tips.",
    image: "https://www.verywellfit.com/thmb/personal-fitness.jpg",
    instructor: "Alexandra Novak",
    price: 89,
    originalPrice: 139,
    lessons: 14,
    difficulty: "Beginner",
    language: "English",
    rating: 4.7,
    category: "Health",
  },
  // --- Technology & IT ---
  {
    title: "Introduction to Computer Science",
    description:
      "Learn the basics of computer science, algorithms, and programming.",
    image:
      "https://www.computerscience.org/wp-content/uploads/2020/10/computer-science.jpg",
    instructor: "Dr. Michael Brown",
    price: 99,
    originalPrice: 149,
    lessons: 20,
    difficulty: "Beginner",
    language: "English",
    rating: 4.8,
    category: "Technology",
  },
  {
    title: "Database Management Systems",
    description: "Understand relational databases, SQL, and data modeling.",
    image: "https://www.geeksforgeeks.org/wp-content/uploads/DBMS.png",
    instructor: "Dr. Sunita Rao",
    price: 109,
    originalPrice: 169,
    lessons: 22,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Technology",
  },
  {
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps using React Native.",
    image: "https://reactnative.dev/img/header_logo.svg",
    instructor: "Daniel Kim",
    price: 119,
    originalPrice: 179,
    lessons: 24,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Mobile Development",
  },
  {
    title: "Blockchain Fundamentals",
    description:
      "Learn the basics of blockchain technology and its applications.",
    image: "https://www.investopedia.com/thmb/blockchain.jpg",
    instructor: "Satoshi Nakamoto",
    price: 129,
    originalPrice: 189,
    lessons: 18,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Technology",
  },
  {
    title: "Internet of Things (IoT) Essentials",
    description: "Explore IoT devices, protocols, and real-world applications.",
    image: "https://www.cisco.com/c/en/us/solutions/internet-of-things/iot.jpg",
    instructor: "Dr. Priya Patel",
    price: 109,
    originalPrice: 169,
    lessons: 16,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.6,
    category: "Technology",
  },
  {
    title: "Game Development with Unity",
    description: "Create 2D and 3D games using Unity and C#.",
    image:
      "https://unity.com/sites/default/files/styles/16_9_1200px/public/2021-09/unity-hero.jpg",
    instructor: "Chris Evans",
    price: 139,
    originalPrice: 199,
    lessons: 28,
    difficulty: "Intermediate",
    language: "English",
    rating: 4.7,
    category: "Technology",
  },
];

export const getAllCourses = (
  page: number,
  query: string,
  language: string,
  category: string,
  rating: number,
  difficulty: string
) => {
  const seletedLanguages = language ? language.split(",") : [];
  const seletedCategories = category ? category.split(",") : [];
  const filteredCourses = courses.filter((course) => {
    const matchesLanguage =
      seletedLanguages.length === 0 ||
      seletedLanguages.includes(course.language);
    const matchesCategory =
      seletedCategories.length === 0 ||
      seletedCategories.includes(course.category);
    const matchesRating = rating === 0 || course.rating >= rating;
    const matchesDifficulty =
      difficulty === "" || course.difficulty === difficulty;
    const matchesQuery =
      query === "" || course.title.toLowerCase().includes(query.toLowerCase());
    return (
      matchesLanguage &&
      matchesCategory &&
      matchesRating &&
      matchesDifficulty &&
      matchesQuery
    );
  });
  const limit = 15;
  const totalCourses = filteredCourses.length;
  const totalPages = Math.ceil(totalCourses / limit);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * limit,
    page * limit
  );
  return {
    courses: paginatedCourses,
    totalPages,
    currentPage: page,
  };
};
