export interface Job {
  id: number;
  title: string;
  company: number;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  salary_min: number;
  salary_max: number;
  job_type: 'full_time' | 'part_time' | 'contract';
  experience_level: 'entry' | 'mid' | 'senior';
  skills_required: string;
  deadline: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: number;
  job: number;
  job_title: string;
  company_name: string;
  user: number;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  cover_letter?: string;
  resume?: string;
  created_at: string;
  updated_at: string;
}

export interface JobFilters {
  search?: string;
  location?: string;
  job_type?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
} 