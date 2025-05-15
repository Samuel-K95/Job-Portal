export interface Job {
  id: string;
  logoUrl: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  description: string;
  keyResponsibilities: string[];
}

export const dummyJobs: Job[] = [
  {
    id: "1",
    logoUrl: "https://via.placeholder.com/50/92c9a1/ffffff?Text=PD",
    title: "Product Design",
    company: "Binford Ltd.",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$200 - $1,200",
    description:
      "Design intuitive and visually appealing user interfaces for web and mobile applications. Conduct user research and create wireframes, prototypes, and mockups to improve user experience. Work closely with developers to implement designs.",
    keyResponsibilities: [
      "Design and develop user-centric interfaces for web and mobile applications.",
      "Conduct user research, usability testing, and gather feedback to improve designs.",
      "Create wireframes, prototypes, and mockups using Figma or Sketch.",
      "Collaborate with developers to ensure design feasibility.",
      "Stay updated on UI/UX trends and best practices.",
    ],
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
    keyResponsibilities: [
      "Develop responsive user interfaces using modern web technologies.",
      "Implement components using React, Angular, or Vue.js.",
      "Collaborate with designers to translate UI/UX designs into code.",
      "Ensure cross-browser compatibility and performance optimization.",
      "Participate in code reviews and contribute to technical documentation.",
    ],
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
    keyResponsibilities: [
      "Plan and execute digital marketing campaigns across various channels.",
      "Implement SEO and SEM strategies to boost online visibility.",
      "Monitor and analyze KPIs to improve campaign performance.",
      "Manage content creation for social media and email marketing.",
      "Collaborate with designers to produce marketing assets.",
    ],
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
    keyResponsibilities: [
      "Analyze structured and unstructured datasets to extract insights.",
      "Create dashboards and visualizations using tools like Power BI or Tableau.",
      "Work with stakeholders to define KPIs and reporting needs.",
      "Use SQL and Python/R for data extraction and analysis.",
      "Present findings in a clear and actionable manner to non-technical teams.",
    ],
  },
];
