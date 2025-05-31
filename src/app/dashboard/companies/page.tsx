'use client';

import { useEffect, useState } from 'react';
import { useCompanies } from '@/contexts/CompaniesContext';
import CompanyCard from '@/components/companies/CompanyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompanyFilters } from '@/types/company';
import { Search, MapPin, Building2 } from 'lucide-react';

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Energy',
  'Other'
];

export default function CompaniesPage() {
  const { companies, loading, error, fetchCompanies } = useCompanies();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<CompanyFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');

  useEffect(() => {
    fetchCompanies(page, filters);
  }, [page, filters]);

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      location: location,
      industry: industry,
    }));
    setPage(1);
  };

  const handleFilterChange = (key: keyof CompanyFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Browse Companies</h1>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 mb-6">
        <div className="flex-grow min-w-[200px]">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-grow min-w-[200px]">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <MapPin className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-grow min-w-[200px]">
          <Select value={industry} onValueChange={(value) => setIndustry(value)}>
            <SelectTrigger className="w-full">
              <Building2 className="text-gray-400 w-5 h-5 mr-2" />
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind.toLowerCase()}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          Search
        </Button>
      </div>

      {/* Company Listings */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading companies...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">Error: {error}</p>
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No companies found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={companies.length < 10 || loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
