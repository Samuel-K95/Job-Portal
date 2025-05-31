"use client";
import Filter from "@/components/Filter";
import Hero from "@/components/Hero";
import JobList from "@/components/jobs/JobList";
import SavedJobs from "@/components/jobs/SavedJobs";
import { useState, useEffect } from "react";
import { JobFilters } from "@/types/job";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [filters, setFilters] = useState<JobFilters>({});
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Log user properties
      console.log('Job Seeker Dashboard - User Properties:', {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        fullUser: user
      });

      // Redirect employer to their dashboard
      if (user.user_type === 'employer') {
        console.log('Redirecting employer to employer dashboard...');
        router.push('/employer/dashboard');
        return;
      }
    }
  }, [user, router]);

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
  };

  // Don't render the dashboard if user is not a job seeker
  if (user && user.user_type !== 'job_seeker') {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      <Hero />
      <section className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 m-10">
        <div className="w-full lg:w-1/4 lg:max-w-xs xl:max-w-sm flex-shrink-0">
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full lg:w-1/2 flex-grow">
          <JobList filters={filters} />
        </div>

        {/* Right Panel: Saved Jobs */}
        <div className="w-full lg:w-1/4 lg:max-w-xs xl:max-w-sm flex-shrink-0">
          <SavedJobs />
        </div>
      </section>
    </div>
  );
}
