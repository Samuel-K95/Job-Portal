// data/savedJobsData.ts
export interface SavedJob {
  id: string;
  logoUrl: string;
  title: string;
  company: string;
  location: string; // e.g., "Remote"
  salaryRange: string;
}

export const dummySavedJobs: SavedJob[] = [
  {
    id: "s1",
    logoUrl: "https://via.placeholder.com/40/4caf50/ffffff?Text=Rx", // Placeholder green
    title: "UI/UX Designer",
    company: "Barone LLC.",
    location: "Remote",
    salaryRange: "$200 - $800",
  },
  {
    id: "s2",
    logoUrl: "https://via.placeholder.com/40/2196f3/ffffff?Text=Ac", // Placeholder blue
    title: "UI/UX Designer",
    company: "Acme Co.",
    location: "Remote",
    salaryRange: "$200 - $800",
  },
  {
    id: "s3",
    logoUrl: "https://via.placeholder.com/40/f44336/ffffff?Text=BK", // Placeholder red
    title: "UI/UX Designer",
    company: "Big Kahuna Burger Ltd.",
    location: "Remote",
    salaryRange: "$200 - $800",
  },
  {
    id: "s4",
    logoUrl: "https://via.placeholder.com/40/d32f2f/ffffff?Text=Bf", // Placeholder dark red
    title: "UI/UX Designer",
    company: "Biffco Enterprises Ltd.",
    location: "Remote",
    salaryRange: "$200 - $800",
  },
];
