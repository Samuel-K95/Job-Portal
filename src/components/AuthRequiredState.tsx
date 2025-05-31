'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';

interface AuthRequiredStateProps {
  title: string;
  description: string;
}

export default function AuthRequiredState({ title, description }: AuthRequiredStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Lock className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link 
          href="/login" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
} 