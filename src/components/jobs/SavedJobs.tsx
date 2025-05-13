// components/jobs/SavedJobs.tsx
"use client";

import { dummySavedJobs, SavedJob } from "@/data/SavedJobsData";
import SavedJobCard from "./SavedJobCard";

const SavedJobs = () => {
  // In a real app, saved jobs would come from props or a global state/fetch
  const savedJobs: SavedJob[] = dummySavedJobs;

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-800">Saved Jobs</h3>
      <div className="space-y-3">
        {savedJobs.map((job) => (
          <SavedJobCard key={job.id} savedJob={job} />
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
