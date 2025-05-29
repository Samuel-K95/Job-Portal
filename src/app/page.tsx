'use client';

import Image from "next/image";
import Link from "next/link";
import BlueButton from "@/components/BlueButton";
import WhiteButton from "@/components/WhiteButton";
import { ArrowRight, Briefcase, Building2, Users } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import { dummyJobs } from "@/data/JobsData";

export default function LandingPage() {
  // Take only the first 3 jobs for the featured section
  const featuredJobs = dummyJobs.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up max-w-xl">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                Find Your Dream Job with{" "}
                <span className="text-blue-600">JobSphere</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with top employers, discover exciting opportunities, and take
                the next step in your career journey.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/signup">
                  <BlueButton text="Get Started" />
                </Link>
                <Link href="/login">
                  <WhiteButton text="Sign In" />
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>10K+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span>500+ Companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>1000+ Jobs</span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] w-full max-w-2xl mx-auto lg:mx-0 animate-slide-up">
              <Image
                src="/hero-image.svg"
                alt="Job search illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose JobSphere?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-blue-50 space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Smart Job Matching</h3>
              <p className="text-gray-600">
                Our AI-powered system matches you with jobs that perfectly align
                with your skills and preferences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-blue-50 space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Top Companies</h3>
              <p className="text-gray-600">
                Connect with leading companies across industries and find
                opportunities that match your career goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-blue-50 space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Career Resources</h3>
              <p className="text-gray-600">
                Access expert tips, interview guides, and career development
                resources to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Jobs</h2>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All Jobs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of professionals who have found their dream jobs through
            JobSphere. Your next career move is just a click away.
          </p>
          <Link href="/signup">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2 text-lg">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
