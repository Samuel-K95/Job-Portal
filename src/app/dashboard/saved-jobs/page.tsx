'use client';

import { useEffect } from 'react';
import { useBookmarks } from '@/contexts/BookmarkContext';
import JobCard from '@/components/jobs/JobCard';
import { Button } from '@/components/ui/button';
import { Bookmark, Search } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SavedJobsPage() {
  const { bookmarkedJobs, error, fetchBookmarks } = useBookmarks();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [fetchBookmarks, user]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to Save Jobs
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Create an account or sign in to save jobs you're interested in. 
            Keep track of opportunities and apply when you're ready.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-gray-600 mt-1">
            Keep track of jobs you're interested in
          </p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">
            Browse More Jobs
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="text-red-600 mb-2">Error: {error}</div>
          <Button onClick={() => fetchBookmarks()} variant="outline" className="mt-4">
            Try Again
          </Button>
        </div>
      ) : bookmarkedJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Saved Jobs Yet
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            When you find jobs you're interested in, click the bookmark icon to save them here. 
            Start exploring opportunities that match your interests.
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Explore Jobs
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-6">
            {bookmarkedJobs.length} {bookmarkedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
          <div className="space-y-6">
            {bookmarkedJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job}
                showApplyButton={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 