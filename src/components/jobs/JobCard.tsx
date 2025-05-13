// components/jobs/JobCard.tsx
"use client";

import Image from "next/image";
import { Job } from "@/data/JobsData"; // Assuming data files are in root `data` folder
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/ShareOutlined"; // Using Outlined for a lighter look

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Image
            src={job.logoUrl}
            alt={`${job.company} logo`}
            width={50}
            height={50}
            className="rounded-md"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="flex gap-2 text-gray-500">
          <button aria-label="Bookmark job" className="hover:text-blue-600">
            <BookmarkBorderIcon />
          </button>
          <button aria-label="Share job" className="hover:text-blue-600">
            <ShareIcon />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 my-2">
        {job.location && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            {job.location}
          </span>
        )}
        {job.type && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            {job.type}
          </span>
        )}
        {job.salaryRange && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            {job.salaryRange}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
    </div>
  );
};

export default JobCard;
