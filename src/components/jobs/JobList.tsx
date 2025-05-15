"use client";

import { dummyJobs, Job } from "@/data/JobsData";
import JobCard from "./JobCard";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useRouter } from "next/navigation";

const JobList = () => {
  // In a real app, jobs would come from props or a global state/fetch
  const jobs: Job[] = dummyJobs;
  const router = useRouter();

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
          />
        </div>
        <div className="flex-grow flex items-center border border-gray-300 rounded-md px-3 py-2">
          <LocationOnOutlinedIcon className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="w-full outline-none text-sm"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md text-sm">
          Search
        </button>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => router.push(`${job.id}`)}
            className="hover:cursor-pointer"
          >
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
