// components/jobs/JobCard.tsx
"use client";

import { Job } from '@/types/job';
import { formatDistanceToNow, isValid } from 'date-fns';
import { Briefcase, Building2, MapPin, Clock, DollarSign, CheckCircle, Bookmark, BookmarkX } from 'lucide-react';
import Link from 'next/link';
import { useJobs } from '@/contexts/JobsContext';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { Button } from '../ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface JobCardProps {
  job: Job;
  showApplyButton?: boolean;
}

export default function JobCard({ job, showApplyButton = true }: JobCardProps) {
  const { loading: jobsLoading, hasApplied } = useJobs();
  const { isBookmarked, toggleBookmark, loading: bookmarkLoading } = useBookmarks();
  const { user } = useAuth();
  const [isHovering, setIsHovering] = useState(false);
  
  const applied = hasApplied(job.id);
  const bookmarked = isBookmarked(job.id);

  const formatSalary = (min: number | undefined, max: number | undefined) => {
    if (!min || !max) return 'Salary not specified';
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const formatPostedDate = (dateString: string | undefined) => {
    if (!dateString) return 'Date not specified';
    const date = new Date(dateString);
    if (!isValid(date)) return 'Recently posted';
    try {
      return `Posted ${formatDistanceToNow(date)} ago`;
    } catch (error) {
      return 'Recently posted';
    }
  };

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the bookmark button
    if (!user) {
      // Redirect to login or show auth modal
      window.location.href = '/login';
      return;
    }
    if (!bookmarkLoading) {
      await toggleBookmark(job.id);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow max-w-[calc(100%-120px)]">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
            <Link href={`/dashboard/${job.id}`}>{job.title || 'Untitled Position'}</Link>
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Company Name</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{job.location || 'Location not specified'}</span>
            </div>
          </div>
        </div>

        {user && (
          <div className="flex flex-col flex-shrink-0 gap-2">
            <button
              onClick={handleBookmarkToggle}
              disabled={bookmarkLoading}
              className={`p-2 rounded-full transition-colors self-end ${
                isHovering ? 'bg-gray-100' : ''
              }`}
              title={user ? "Bookmark this job" : "Sign in to bookmark jobs"}
            >
              {bookmarked ? (
                <BookmarkX className="w-5 h-5 text-blue-600" />
              ) : (
                <Bookmark className={`w-5 h-5 ${isHovering ? 'text-blue-600' : 'text-gray-400'}`} />
              )}
            </button>

            {showApplyButton && (
              applied ? (
                <div className="flex items-center text-green-600 justify-end">
                  <CheckCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Applied</span>
                </div>
              ) : (
                <Link href={`/dashboard/${job.id}/apply`}>
                  <Button 
                    variant="default" 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={jobsLoading}
                  >
                    Apply Now
                  </Button>
                </Link>
              )
            )}
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
        <div className="flex items-center">
          <Briefcase className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{job.job_type?.replace('_', ' ') || 'Not specified'}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{formatSalary(job.salary_min, job.salary_max)}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{formatPostedDate(job.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
