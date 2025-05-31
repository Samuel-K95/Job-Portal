// components/jobs/SavedJobs.tsx
"use client";

import { Job } from "@/types/job";
import JobCard from "./JobCard";
import { useJobs } from "@/contexts/JobsContext";
import { dummySavedJobs } from "@/data/dummyData";

const SavedJobs = () => {
  const { jobs } = useJobs();
  
  // Use dummy data if saved jobs are empty
  const savedJobs = jobs.length === 0 ? dummySavedJobs : jobs;

  if (jobs.length === 0) {
    console.log("Using dummy saved jobs data - No saved jobs found");
  }

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-800">Saved Jobs</h3>
      <div className="space-y-3">
        {savedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
