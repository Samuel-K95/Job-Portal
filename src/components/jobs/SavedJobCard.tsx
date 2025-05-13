// components/jobs/SavedJobCard.tsx
"use client";

import Image from "next/image";
import { SavedJob } from "@/data/SavedJobsData";
import CloseIcon from "@mui/icons-material/Close";

interface SavedJobCardProps {
  savedJob: SavedJob;
}

const SavedJobCard: React.FC<SavedJobCardProps> = ({ savedJob }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center gap-3">
      <Image
        src={savedJob.logoUrl}
        alt={`${savedJob.company} logo`}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-grow">
        <h4 className="text-sm font-semibold text-gray-800">
          {savedJob.title}
        </h4>
        <p className="text-xs text-gray-500">{savedJob.company}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {savedJob.location && (
            <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full">
              {savedJob.location}
            </span>
          )}
          {savedJob.salaryRange && (
            <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full">
              {savedJob.salaryRange}
            </span>
          )}
        </div>
      </div>
      <button
        aria-label="Remove saved job"
        className="text-gray-400 hover:text-red-500"
      >
        <CloseIcon fontSize="small" />
      </button>
    </div>
  );
};

export default SavedJobCard;
