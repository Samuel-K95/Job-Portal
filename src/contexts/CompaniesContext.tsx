'use client';

import React, { createContext, useContext, useState } from 'react';
import { Company, CompanyFilters } from '@/types/company';
import { useAuth } from './AuthContext';
import { dummyCompanies } from '@/data/dummyData';

interface CompaniesContextType {
  companies: Company[];
  loading: boolean;
  error: string | null;
  fetchCompanies: (page?: number, filters?: CompanyFilters) => Promise<void>;
  fetchCompanyDetails: (companyId: string) => Promise<Company>;
  createCompany: (companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => Promise<Company>;
  updateCompany: (companyId: string, companyData: Partial<Company>) => Promise<Company>;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(undefined);

export function CompaniesProvider({ children }: { children: React.ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiRequest } = useAuth();

  const fetchCompanies = async (page = 1, filters: CompanyFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {
        page: page.toString(),
      };

      if (filters.search) params.search = filters.search;
      if (filters.industry) params.industry = filters.industry;
      if (filters.location) params.location = filters.location;

      const queryParams = new URLSearchParams(params);
      const response = await apiRequest(`/api/companies/?${queryParams}`);
      
      // Use dummy data if API returns empty results
      const companiesData = response.results?.length > 0 ? response.results : dummyCompanies;
      setCompanies(companiesData);
      return response;
    } catch (err) {
      console.log('Using dummy data due to API error');
      setCompanies(dummyCompanies);
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyDetails = async (companyId: string): Promise<Company> => {
    setLoading(true);
    setError(null);
    try {
      const company = await apiRequest(`/api/companies/${companyId}/`);
      return company;
    } catch (err) {
      // Return dummy company if API fails
      const dummyCompany = dummyCompanies.find(c => c.id === parseInt(companyId));
      if (dummyCompany) return dummyCompany;
      
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<Company> => {
    setLoading(true);
    setError(null);
    try {
      const newCompany = await apiRequest('/api/companies/', 'POST', companyData);
      setCompanies(prevCompanies => [...prevCompanies, newCompany]);
      return newCompany;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (companyId: string, companyData: Partial<Company>): Promise<Company> => {
    setLoading(true);
    setError(null);
    try {
      const updatedCompany = await apiRequest(`/api/companies/${companyId}/`, 'PUT', companyData);
      setCompanies(prevCompanies => 
        prevCompanies.map(company => 
          company.id === parseInt(companyId) ? updatedCompany : company
        )
      );
      return updatedCompany;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    companies,
    loading,
    error,
    fetchCompanies,
    fetchCompanyDetails,
    createCompany,
    updateCompany,
  };

  return <CompaniesContext.Provider value={value}>{children}</CompaniesContext.Provider>;
}

export function useCompanies() {
  const context = useContext(CompaniesContext);
  if (context === undefined) {
    throw new Error('useCompanies must be used within a CompaniesProvider');
  }
  return context;
} 