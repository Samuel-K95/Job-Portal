'use client';

import React, { createContext, useContext, useState } from 'react';
import { Job } from '@/types/job';
import { useAuth } from './AuthContext';

interface BookmarkContextType {
  bookmarkedJobs: Job[];
  loading: boolean;
  error: string | null;
  fetchBookmarks: () => Promise<void>;
  toggleBookmark: (jobId: number) => Promise<void>;
  isBookmarked: (jobId: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiRequest } = useAuth();

  const fetchBookmarks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest('/api/bookmarks/');
      setBookmarkedJobs(response.results);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (jobId: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiRequest(`/api/bookmarks/toggle/${jobId}/`, 'POST');
      
      // Fetch the job details if we're adding a bookmark
      const jobDetails = await apiRequest(`/api/jobs/${jobId}/`);
      
      // Update local state
      setBookmarkedJobs(prev => {
        const isCurrentlyBookmarked = prev.some(job => job.id === jobId);
        if (isCurrentlyBookmarked) {
          return prev.filter(job => job.id !== jobId);
        } else {
          return [...prev, jobDetails];
        }
      });
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isBookmarked = (jobId: number) => {
    return bookmarkedJobs.some(job => job.id === jobId);
  };

  const value = {
    bookmarkedJobs,
    loading,
    error,
    fetchBookmarks,
    toggleBookmark,
    isBookmarked,
  };

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
} 