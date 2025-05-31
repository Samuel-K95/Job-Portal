'use client';

import { useEffect } from 'react';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { useJobs } from '@/contexts/JobsContext';
import JobCard from '@/components/jobs/JobCard';
import EmptyState from '@/components/EmptyState';
import { Bookmark } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthRequiredState from '@/components/AuthRequiredState';

export default function SavedJobsPage() {
  const { bookmarkedJobs, fetchBookmarks } = useBookmarks();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [fetchBookmarks, user]);

  if (!user) {
    return (
      <AuthRequiredState 
        title="Sign in to View Saved Jobs"
        description="Create an account or sign in to save jobs and build your personalized job collection."
      />
    );
  }

  if (!bookmarkedJobs || bookmarkedJobs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          icon={Bookmark}
          title="No saved jobs"
          description="Start saving jobs you're interested in to build your collection."
          actionLabel="Browse Jobs"
          actionHref="/dashboard"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
        <span className="text-gray-500">{bookmarkedJobs.length} jobs saved</span>
      </div>
      <div className="grid gap-6">
        {bookmarkedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
} 