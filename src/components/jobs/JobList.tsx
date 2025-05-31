"use client";

import { Job, JobFilters } from "@/types/job";
import JobCard from "./JobCard";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useRouter } from "next/navigation";
import { useJobs } from "@/contexts/JobsContext";
import { dummyJobs } from "@/data/dummyData";
import { useState, useEffect } from "react";

interface JobListProps {
  filters: JobFilters;
}

const JobList = ({ filters }: JobListProps) => {
  const { jobs, loading, fetchJobs } = useJobs();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  // Use dummy data if no real jobs are available
  const displayJobs = jobs.length === 0 ? dummyJobs : jobs;
  
  useEffect(() => {
    if (jobs.length === 0) {
      console.log("Using dummy jobs data - No real jobs available");
    }
  }, [jobs.length]);

  useEffect(() => {
    const combinedFilters = {
      ...filters,
      search: searchTerm,
      location: location
    };
    fetchJobs(1, combinedFilters);
  }, [filters, searchTerm, location, fetchJobs]);

  const handleSearch = () => {
    console.log("Searching with terms:", { searchTerm, location });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3 border border-gray-200">
        <div className="flex-grow flex items-center border border-gray-300 rounded-md px-3 py-2">
          <SearchIcon className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Job title, Keywords, or Company name"
            className="w-full outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-grow flex items-center border border-gray-300 rounded-md px-3 py-2">
          <LocationOnOutlinedIcon className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="w-full outline-none text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button 
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md text-sm"
        >
          Search
        </button>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {displayJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No jobs found matching your criteria.</p>
          </div>
        ) : (
          displayJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => router.push(`dashboard/${job.id}`)}
              className="hover:cursor-pointer"
            >
              <JobCard job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
