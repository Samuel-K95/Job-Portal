import { Job, Application } from "@/types/job";
import { Company } from "@/types/company";

export const dummyJobs: Job[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: 1,
    description: "We are looking for a Senior Software Engineer...",
    requirements: "5+ years of experience in web development",
    responsibilities: "Lead development of web applications",
    location: "New York, NY",
    salary_min: 120000,
    salary_max: 180000,
    job_type: "full_time",
    experience_level: "senior",
    skills_required: "React, Node.js, TypeScript",
    deadline: "2024-12-31",
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: 2,
    description: "Join our frontend team...",
    requirements: "3+ years of experience with React",
    responsibilities: "Build responsive web interfaces",
    location: "Remote",
    salary_min: 90000,
    salary_max: 130000,
    job_type: "full_time",
    experience_level: "mid",
    skills_required: "React, CSS, JavaScript",
    deadline: "2024-12-31",
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  }
];

export const dummyApplications: Application[] = [
  {
    id: 1,
    job: 1,
    job_title: "Senior Software Engineer",
    company_name: "Tech Corp",
    user: 1,
    status: "pending",
    cover_letter: "I am excited to apply for this position...",
    created_at: "2024-01-15",
    updated_at: "2024-01-15"
  },
  {
    id: 2,
    job: 2,
    job_title: "Frontend Developer",
    company_name: "Web Solutions Inc",
    user: 1,
    status: "reviewed",
    cover_letter: "With my strong frontend experience...",
    created_at: "2024-01-10",
    updated_at: "2024-01-12"
  },
  {
    id: 3,
    job: 3,
    job_title: "Full Stack Developer",
    company_name: "Digital Innovations",
    user: 1,
    status: "accepted",
    cover_letter: "I would love to join your team...",
    created_at: "2024-01-05",
    updated_at: "2024-01-08"
  }
];

export const dummySavedJobs = dummyJobs.map(job => ({
  ...job,
  saved_at: "2024-01-01"
}));

export const dummyCompanies: Company[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    description: "Leading provider of innovative software solutions...",
    industry: "Technology",
    location: "San Francisco, CA",
    website: "https://techcorp.example.com",
    logo_url: "https://via.placeholder.com/150/0066cc/ffffff?text=TC",
    employee_count: 500,
    founded_year: 2010,
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    id: 2,
    name: "GreenEnergy Innovations",
    description: "Sustainable energy solutions for a better future...",
    industry: "Energy",
    location: "Austin, TX",
    website: "https://greenenergy.example.com",
    logo_url: "https://via.placeholder.com/150/00cc66/ffffff?text=GE",
    employee_count: 200,
    founded_year: 2015,
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    id: 3,
    name: "HealthTech Solutions",
    description: "Revolutionizing healthcare through technology...",
    industry: "Healthcare",
    location: "Boston, MA",
    website: "https://healthtech.example.com",
    logo_url: "https://via.placeholder.com/150/ff6666/ffffff?text=HT",
    employee_count: 300,
    founded_year: 2012,
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    id: 4,
    name: "FinServe Global",
    description: "Modern financial services for the digital age...",
    industry: "Finance",
    location: "New York, NY",
    website: "https://finserve.example.com",
    logo_url: "https://via.placeholder.com/150/9933cc/ffffff?text=FG",
    employee_count: 1000,
    founded_year: 2008,
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  }
]; 