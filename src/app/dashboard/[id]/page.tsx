"use client";

import BlueButton from "@/components/BlueButton";
import JobsDescriptionCard from "@/components/jobs/JobsDescriptionCard";
import { useParams } from "next/navigation";
import { dummyJobs, Job } from "@/data/JobsData";
import { dummySavedJobs } from "@/data/SavedJobsData";
import SavedJobCard from "@/components/jobs/SavedJobCard";

const JobDetails = () => {
  const params = useParams();
  const userId = params.id;
  console.log("id", userId);

  if (!userId) {
    return <div>User ID not found.</div>;
  }

  const currJob: Job | undefined = dummyJobs.find(
    (job) => job.id === (Array.isArray(userId) ? userId[0] : userId)
  );

  return (
    <div className="flex flex-col items-center justify-center m-10">
      <div className="w-full flex items-center justify-center p-5">
        <div className="flex items-center w-1/2 rounded-xl shadow-md border border-gray-300 overflow-hidden">
          <span className="pl-3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
          </span>
          <input
            type="text"
            className="flex-grow px-3 py-2 outline-none text-sm"
            placeholder="Write anything"
          />
          <BlueButton text={"Search"} />
        </div>
      </div>
      <div className="w-4/5 flex gap-10">
        <div className="w-[65%]">
          <JobsDescriptionCard job={currJob!} />
        </div>

        <div className="w-[35%]">
          <div className="w-full bg-white p-5 rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-800">Related Jobs</h3>
            <div className="space-y-3">
              {dummySavedJobs.map((job) => (
                <SavedJobCard key={job.id} savedJob={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobDetails;
