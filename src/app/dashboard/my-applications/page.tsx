'use client';

import { useEffect } from 'react';
import { useJobs } from '@/contexts/JobsContext';
import { formatDistanceToNow } from 'date-fns';
import { Briefcase, Clock, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';
import { dummyApplications } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import AuthRequiredState from '@/components/AuthRequiredState';

export default function MyApplicationsPage() {
  const { applications, fetchApplications } = useJobs();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [fetchApplications, user]);

  if (!user) {
    return (
      <AuthRequiredState 
        title="Sign in to View Applications"
        description="Create an account or sign in to track your job applications and stay updated on their status."
      />
    );
  }

  // Use dummy data if no applications are available
  const displayApplications = applications.length === 0 ? dummyApplications : applications;

  if (applications.length === 0) {
    console.log("Using dummy applications data - No real applications available");
  }

  if (!displayApplications || displayApplications.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <EmptyState
          icon={Briefcase}
          title="No applications yet"
          description="Start exploring job opportunities and submit your first application."
          actionLabel="Browse Jobs"
          actionHref="/dashboard"
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h1>
      <div className="space-y-4">
        {displayApplications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {application.job_title}
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>{application.company_name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Applied {formatDistanceToNow(new Date(application.created_at))} ago</span>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium" style={{
                backgroundColor: getStatusColor(application.status).bg,
                color: getStatusColor(application.status).text
              }}>
                {application.status}
              </div>
            </div>

            {application.cover_letter && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Cover Letter</p>
                <p className="text-gray-700 line-clamp-3">{application.cover_letter}</p>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <Link
                href={`/dashboard/${application.job}`}
                className="text-blue-600 hover:text-blue-700 inline-flex items-center"
              >
                View Job Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return { bg: '#FEF3C7', text: '#92400E' }; // Yellow
    case 'reviewed':
      return { bg: '#DBEAFE', text: '#1E40AF' }; // Blue
    case 'rejected':
      return { bg: '#FEE2E2', text: '#B91C1C' }; // Red
    case 'accepted':
      return { bg: '#D1FAE5', text: '#065F46' }; // Green
    default:
      return { bg: '#F3F4F6', text: '#374151' }; // Gray
  }
} 