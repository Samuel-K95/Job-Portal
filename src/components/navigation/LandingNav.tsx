'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function LandingNav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                JobSphere
              </span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {user ? (
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="font-semibold"
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button 
                      variant="outline"
                      className="font-semibold"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
} 