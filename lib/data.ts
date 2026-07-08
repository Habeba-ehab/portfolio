export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type NavId = (typeof navLinks)[number]["id"];

export const contactInfo = {
  email: "habebaehab1805@gmail.com",
  phone: "01005263830",
  phoneHref: "+201005263830",
  linkedin: "https://linkedin.com/in/habeba-ehab-b39369189",
  linkedinLabel: "linkedin.com/in/habeba-ehab-b39369189",
  location: "Alexandria, Egypt",
};

export const frontendSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Redux (Redux Toolkit)",
  "Tailwind CSS",
  "Three.js",
] as const;

export const cloudSkills = [
  "AWS",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Jenkins",
  "GitHub Actions",
  "Ansible",
  "Prometheus",
  "Grafana",
] as const;

export interface ProjectEntry {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: ProjectEntry[] = [
  {
    title: "PrometaV",
    description:
      "A 3D web platform that transforms how organizations communicate with their audiences through immersive, browser-based virtual environments. Includes pre-built modular spaces for onboarding, health & safety, and clinical trials that teams can customize via a drag-and-drop dashboard, uploading videos, documents, and images without writing code. Members are invited through secure email links with no app downloads, while real-time analytics, gamified assessments, and an integrated AI chatbot help track engagement and answer questions based on the uploaded material.",
    tags: ["3D Web Platform", "AI Chatbot", "Corporate Training"],
    image: "/pmv.png",
    liveUrl: "https://www.prometav.com/en",
  },
  {
    title: "Gamein",
    description:
      "The official website for Gamein, a Dubai-based technology company building immersive digital solutions across VR, AR, the metaverse, blockchain, and AI for industries like healthcare, construction, real estate, and government. The site showcases the company's portfolio of game development, Web3 infrastructure, AI-driven products, IoT and digital twin solutions, and tech-enabled event hardware rentals across the Middle East, UK, and beyond.",
    tags: ["Company Website", "Immersive Tech", "3D/AR/VR"],
    image: "/gamein.png",
    liveUrl: "https://www.gamein.ae/eg-en",
  },
  {
    title: "SanadiBot",
    description:
      "An AI assistant platform for business data management and automation, letting teams create and manage intelligent \"SanBots\" that turn daily work into clear, actionable insights. Built with a strong emphasis on data privacy, the platform supports local, on-premises operation so business information stays under the user's control instead of being sent to external servers.",
    tags: ["AI Assistant", "Business Automation", "Data Privacy"],
    image: "/sanadibot.png",
    liveUrl: "https://www.sanadibot.ai/",
  },
  {
    title: "HydroScope",
    description:
      "An AI-powered web app that helps identify harmful bacteria in water samples from a simple microscope photo. Users upload an image of a bacteria slide and are guided step-by-step through an interactive visual decision tree, mimicking the biochemical testing process microbiologists use in real labs, to pinpoint the exact species with a confidence score. HydroScope then recommends appropriate water treatment steps and keeps a history of past analyses, backed by an AI chat assistant and an educational guide on water safety.",
    tags: ["AI", "Chatbot", "Backend Integration"],
    image: "/hydroscope2.png",
    liveUrl: "https://hydroscope.vercel.app/",
  },
];

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    role: "DevOps Engineer Trainee",
    period: "Nov 2025 to Jun 2026",
    location: "Alexandria, Egypt",
    points: [
      "Provisioned and managed cloud infrastructure on AWS using Terraform, applying infrastructure-as-code principles to automate resource deployment",
      "Containerized and orchestrated applications using Docker and Kubernetes, practicing real-world deployment and scaling workflows",
      "Built CI/CD pipelines using Jenkins, GitHub Actions, and Travis CI, and automated server configuration using Ansible",
    ],
  },
  {
    company: "Gamein",
    role: "Part-Time, Frontend Developer",
    period: "Jan 2025 to Present",
    location: "Alexandria, Egypt",
    points: [
      "Reduced sprint cycle time by 30% through integrating Jira and Agile methodologies, accelerating delivery across multiple development phases",
      "Collaborated with the AI team to optimize the 3D model response system, significantly improving load times and delivering a seamless experience at scale",
      "Coordinated with backend and version control teams using Git and GitHub to streamline deployment workflows and maintain high code integrity",
    ],
  },
];

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  location: string;
  cgpa?: string;
  grade?: string;
  coursework?: string[];
}

export const education: EducationEntry[] = [
  {
    institution: "Alexandria University, Faculty of Science",
    degree: "B.S in Computer Science (Software Industry and Multimedia Department)",
    period: "2026",
    location: "Alexandria, Egypt",
    cgpa: "3.83/4.0",
    grade: "Excellence",
    coursework: [
      "Data Structures & Algorithm Analysis",
      "Object-Oriented Programming",
      "Software Engineering",
      "Database Systems",
      "Cloud Software Development",
    ],
  },
];
