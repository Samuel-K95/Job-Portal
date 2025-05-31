export interface Company {
  id: number;
  name: string;
  description: string;
  industry: string;
  location: string;
  website?: string;
  logo_url?: string;
  employee_count?: number;
  founded_year?: number;
  created_at: string;
  updated_at: string;
}

export interface CompanyFilters {
  search?: string;
  industry?: string;
  location?: string;
} 