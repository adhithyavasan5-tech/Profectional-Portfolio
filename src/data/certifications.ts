export type Certification = {
  id: number;
  title: string;
  issuer: string;
  category:
    | "AI & Machine Learning"
    | "Web Development"
    | "Programming"
    | "UI/UX Design"
    | "Cloud & Tools"
    | "Other";
  date: string;
  credentialId?: string;
  skills: string[];
  image: string;
  credentialUrl?: string;
  description: string;
};

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Certificate 01",
    issuer: "Issuing Organization",
    category: "AI & Machine Learning",
    date: "2026",
    credentialId: "",
    skills: ["AI", "Machine Learning"],
    image: "/certificates/certificate-01.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 2,
    title: "Certificate 02",
    issuer: "Issuing Organization",
    category: "Web Development",
    date: "2026",
    credentialId: "",
    skills: ["HTML", "CSS", "JavaScript"],
    image: "/certificates/certificate-02.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 3,
    title: "Certificate 03",
    issuer: "Issuing Organization",
    category: "Programming",
    date: "2026",
    credentialId: "",
    skills: ["Programming"],
    image: "/certificates/certificate-03.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 4,
    title: "Certificate 04",
    issuer: "Issuing Organization",
    category: "UI/UX Design",
    date: "2026",
    credentialId: "",
    skills: ["UI Design", "UX Design", "Figma"],
    image: "/certificates/certificate-04.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 5,
    title: "Certificate 05",
    issuer: "Issuing Organization",
    category: "Cloud & Tools",
    date: "2026",
    credentialId: "",
    skills: ["Cloud", "Tools"],
    image: "/certificates/certificate-05.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 6,
    title: "Certificate 06",
    issuer: "Issuing Organization",
    category: "Web Development",
    date: "2026",
    credentialId: "",
    skills: ["React", "TypeScript"],
    image: "/certificates/certificate-06.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 7,
    title: "Certificate 07",
    issuer: "Issuing Organization",
    category: "Programming",
    date: "2026",
    credentialId: "",
    skills: ["Python"],
    image: "/certificates/certificate-07.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 8,
    title: "Certificate 08",
    issuer: "Issuing Organization",
    category: "AI & Machine Learning",
    date: "2026",
    credentialId: "",
    skills: ["Generative AI", "LLM"],
    image: "/certificates/certificate-08.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 9,
    title: "Certificate 09",
    issuer: "Issuing Organization",
    category: "Cloud & Tools",
    date: "2026",
    credentialId: "",
    skills: ["Git", "GitHub"],
    image: "/certificates/certificate-09.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 10,
    title: "Certificate 10",
    issuer: "Issuing Organization",
    category: "Web Development",
    date: "2026",
    credentialId: "",
    skills: ["Full Stack", "Web Development"],
    image: "/certificates/certificate-10.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 11,
    title: "Certificate 11",
    issuer: "Issuing Organization",
    category: "Other",
    date: "2026",
    credentialId: "",
    skills: ["Technology"],
    image: "/certificates/certificate-11.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },

  {
    id: 12,
    title: "Certificate 12",
    issuer: "Issuing Organization",
    category: "Other",
    date: "2026",
    credentialId: "",
    skills: ["Technology"],
    image: "/certificates/certificate-12.png",
    credentialUrl: "",
    description: "Add your certificate description here.",
  },
];

export const certificationCategories = [
  "All",
  "AI & Machine Learning",
  "Web Development",
  "Programming",
  "UI/UX Design",
  "Cloud & Tools",
  "Other",
] as const;