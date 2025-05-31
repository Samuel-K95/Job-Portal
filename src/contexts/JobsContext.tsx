'use client';

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface Job {
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

interface Application {
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

interface JobFilters {
  search?: string;
  location?: string;
  job_type?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
}

interface JobsContextType {
  jobs: Job[];
  applications: Application[];
  loading: boolean;
  error: string | null;
  fetchJobs: (page?: number, filters?: JobFilters) => Promise<void>;
  fetchJobDetails: (jobId: string) => Promise<Job>;
  createJob: (jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => Promise<Job>;
  applyForJob: (jobId: number, applicationData: { cover_letter?: string; resume?: File }) => Promise<void>;
  fetchApplications: () => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: Application['status']) => Promise<void>;
  hasApplied: (jobId: number) => boolean;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiRequest } = useAuth();

  const hasApplied = (jobId: number) => {
    return applications.some(app => app.job === jobId);
  };

  const fetchJobs = async (page = 1, filters: JobFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {
        page: page.toString(),
      };

      // Add filters if they exist, converting all values to strings
      if (filters.search) params.search = filters.search;
      if (filters.location) params.location = filters.location;
      if (filters.job_type) params.job_type = filters.job_type;
      if (filters.experience_level) params.experience_level = filters.experience_level;
      if (filters.salary_min) params.salary_min = filters.salary_min.toString();
      if (filters.salary_max) params.salary_max = filters.salary_max.toString();

      const queryParams = new URLSearchParams(params);
      const response = await apiRequest(`/api/jobs/?${queryParams}`);
      setJobs(response.results);
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchJobDetails = async (jobId: string): Promise<Job> => {
    setLoading(true);
    setError(null);
    try {
      const job = await apiRequest(`/api/jobs/${jobId}/`);
      return job;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job> => {
    setLoading(true);
    setError(null);
    try {
      const newJob = await apiRequest('/api/jobs/', 'POST', jobData);
      setJobs(prevJobs => [...prevJobs, newJob]);
      return newJob;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (jobId: number, applicationData: { cover_letter?: string; resume?: File }) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('job', jobId.toString());
      if (applicationData.cover_letter) {
        formData.append('cover_letter', applicationData.cover_letter);
      }
      if (applicationData.resume) {
        formData.append('resume', applicationData.resume);
      }

      await apiRequest('/api/applications/', 'POST', formData);
      await fetchApplications(); // Refresh applications list
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest('/api/applications/');
      setApplications(response.results);
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: Application['status']) => {
    setLoading(true);
    setError(null);
    try {
      await apiRequest(`/api/applications/${applicationId}/`, 'PATCH', { status });
      await fetchApplications(); // Refresh applications list
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    jobs,
    applications,
    loading,
    error,
    fetchJobs,
    fetchJobDetails,
    createJob,
    applyForJob,
    fetchApplications,
    updateApplicationStatus,
    hasApplied,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
} 