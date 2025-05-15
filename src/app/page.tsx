"use client";
import Filter from "@/components/Filter";
import Hero from "@/components/Hero";
import JobList from "@/components/jobs/JobList";
import SavedJobs from "@/components/jobs/SavedJobs";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      <Hero />
      <section className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 m-10">
        <div className="w-full lg:w-1/4 lg:max-w-xs xl:max-w-sm flex-shrink-0">
          <Filter />
        </div>
        <div className="w-full lg:w-1/2 flex-grow">
          <JobList />
        </div>

        {/* Right Panel: Saved Jobs */}
        <div className="w-full lg:w-1/4 lg:max-w-xs xl:max-w-sm flex-shrink-0">
          <SavedJobs />
        </div>
      </section>
    </div>
  );
}
