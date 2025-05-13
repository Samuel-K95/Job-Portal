// data/jobsData.ts
export interface Job {
  id: string;
  logoUrl: string;
  title: string;
  company: string;
  location: string;
  type: string; // e.g., "Full-time", "Remote"
  salaryRange: string;
  description: string;
}

export const dummyJobs: Job[] = [
  {
    id: "1",
    logoUrl: "https://via.placeholder.com/50/92c9a1/ffffff?Text=PD", // Placeholder with initials
    title: "Product Design",
    company: "Binford Ltd.",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$200 - $1,200",
    description:
      "Design intuitive and visually appealing user interfaces for web and mobile applications. Conduct user research and create wireframes, prototypes, and mockups to improve user experience. Work closely with developers to implement designs.",
  },
  {
    id: "2",
    logoUrl: "https://via.placeholder.com/50/f9a825/ffffff?Text=FD",
    title: "Frontend Developer",
    company: "Abstergo Ltd.",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$200 - $1,200",
    description:
      "Develop and implement user-facing features using HTML, CSS, and JavaScript frameworks like React or Angular. Collaborate with UI/UX designers to ensure responsive and visually appealing web pages. Optimize applications for speed and scalability.",
  },
  {
    id: "3",
    logoUrl: "https://via.placeholder.com/50/e53935/ffffff?Text=DM",
    title: "Digital Marketing Specialist",
    company: "Sushi shop",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$200 - $1,200",
    description:
      "Create and execute digital marketing campaigns to drive online traffic and increase brand awareness. Utilize SEO, SEM, and social media strategies to engage target audiences. Analyze performance metrics to optimize campaigns.",
  },
  {
    id: "4",
    logoUrl: "https://via.placeholder.com/50/1e88e5/ffffff?Text=DA",
    title: "Data Analyst",
    company: "GreenVita",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$200 - $1,200",
    description:
      "Interpret complex datasets to provide actionable insights. Use statistical tools to identify trends, patterns, and correlations in data. Create reports and visualizations to communicate findings to stakeholders.",
  },
];
