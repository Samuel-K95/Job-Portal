import React from "react";
import { Job } from "@/data/JobsData";
import { Bookmark, Share2 } from "lucide-react";

interface JobCardProps {
  job: Job;
}

const JobsDescriptionCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-6 space-y-4 relative">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={job.logoUrl}
            alt={`${job.company} logo`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600">
              {job.company} <span className="text-yellow-500">★★★★☆</span>
            </p>
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-gray-500 cursor-pointer" />
            <Share2 className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>

          <div>
            <button className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition">
              Apply now
            </button>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div>
        <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-800">
          <div>
            <p className="font-semibold">Job type:</p>
            <p>{job.type}</p>
          </div>
          <div>
            <p className="font-semibold">Location:</p>
            <p>{job.location}</p>
          </div>
          <div>
            <p className="font-semibold">Experience:</p>
            <p>5 years</p>
          </div>
          <div>
            <p className="font-semibold">Number of Applicants:</p>
            <p>40</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="font-semibold text-gray-900">Job description</p>
          <p className="text-sm text-gray-700 mt-1">{job.description}</p>
        </div>

        {/* Key Responsibilities */}
        {job.keyResponsibilities && job.keyResponsibilities.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold text-gray-900">Key Responsibilities</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
              {job.keyResponsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsDescriptionCard;
