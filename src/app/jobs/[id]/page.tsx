'use client';

import { useEffect, useState } from 'react';
import { useJobs } from '@/contexts/JobsContext';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Building2, MapPin, Clock, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { fetchJobDetails, loading, error } = useJobs();
  const [job, setJob] = useState<Job | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadJob = async () => {
      try {
        const jobData = await fetchJobDetails(params.id);
        setJob(jobData);
      } catch (error) {
        console.error('Error loading job:', error);
      }
    };
    loadJob();
  }, [params.id, fetchJobDetails]);

  const formatSalary = (min: number | undefined, max: number | undefined) => {
    if (!min || !max) return 'Salary not specified';
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title || 'Untitled Position'}</h1>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Building2 className="w-5 h-5 mr-2" />
                  <span>Company Name</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{job.location || 'Location not specified'}</span>
                </div>
              </div>
            </div>
            {user && (
              <Link href={`/jobs/${job.id}/apply`}>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  Apply Now
                </Button>
              </Link>
            )}
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-5 h-5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="font-medium capitalize">{job.job_type?.replace('_', ' ') || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p className="font-medium">
                  {job.created_at ? 
                    `${formatDistanceToNow(new Date(job.created_at))} ago` : 
                    'Recently posted'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-5 h-5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Salary Range</p>
                <p className="font-medium">{formatSalary(job.salary_min, job.salary_max)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{job.description || 'No description available'}</p>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <p className="text-gray-600 whitespace-pre-line">{job.requirements || 'No requirements specified'}</p>
          </div>

          {/* Responsibilities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
            <p className="text-gray-600 whitespace-pre-line">{job.responsibilities || 'No responsibilities specified'}</p>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills_required ? 
                job.skills_required.split(',').map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                )) : 
                <span className="text-gray-500">No skills specified</span>
              }
            </div>
          </div>

          {/* Apply Button (Bottom) */}
          {user && (
            <div className="mt-8 text-center">
              <Link href={`/jobs/${job.id}/apply`}>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                  size="lg"
                >
                  Apply for this Position
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 