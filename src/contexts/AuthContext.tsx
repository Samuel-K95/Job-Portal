"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'job_seeker' | 'employer';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { username: string; password: string }) => Promise<any>;
  register: (userData: {
    username: string;
    password: string;
    password2: string;
    email: string;
    first_name: string;
    last_name: string;
    user_type: 'job_seeker' | 'employer';
  }) => Promise<any>;
  logout: () => Promise<void>;
  apiRequest: (endpoint: string, method?: string, data?: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
    router.push('/login');
  };

  // API request helper
  const apiRequest = async (endpoint: string, method = 'GET', data?: any) => {
    try {
      const currentToken = token || localStorage.getItem('token');
      
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (currentToken) {
        options.headers = {
          ...options.headers,
          'Authorization': `Token ${currentToken}`,
        };
      } else if (endpoint !== '/api/accounts/login/' && endpoint !== '/api/accounts/register/') {
        handleLogout();
        return null;
      }

      if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`https://job-portal-api-kiai.onrender.com${endpoint}`, options);
      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 401 || responseData.detail?.includes('Invalid token')) {
          handleLogout();
          return null;
        }
        const errorMessage = responseData.detail || responseData.error || JSON.stringify(responseData);
        setError(errorMessage);
        return null;
      }

      return responseData;
    } catch (err) {
      handleLogout();
      return null;
    }
  };

  const fetchUserProfile = async () => {
    const userData = await apiRequest('/api/accounts/profile/');
    if (userData) {
      console.log('Fetched user profile:', userData);
      setUser(userData);
      return userData;
    }
    return null;
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('Checking auth status...');
      const storedToken = localStorage.getItem('token');
      console.log('Stored token:', storedToken);
      
      if (storedToken) {
        console.log('Token found, setting token and fetching user profile');
        setToken(storedToken);
        const userData = await fetchUserProfile();
        if (!userData) {
          console.log('Failed to fetch user profile, logging out');
          handleLogout();
        } else {
          console.log('User profile fetched successfully:', userData);
          setUser(userData);
        }
      } else {
        console.log('No token found');
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setError(null);
      setLoading(true); // Set loading state
      
      const data = await apiRequest('/api/accounts/login/', 'POST', credentials);
      if (!data) {
        console.log('Login failed - no data returned');
        setLoading(false);
        return null;
      }

      console.log('Login response:', data);
      const newToken = data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);

      // Fetch user profile
      const userData = await fetchUserProfile();
      if (!userData) {
        console.log('Failed to fetch user profile');
        setLoading(false);
        return null;
      }

      // Set user in state
      setUser(userData);
      console.log('User data set:', userData);

      // Only redirect after we confirm we have valid user data
      if (userData && userData.user_type) {
        console.log('Redirecting based on user type:', userData.user_type);
        const redirectPath = userData.user_type === 'employer' ? '/employer/dashboard' : '/dashboard';
        window.location.href = redirectPath;
      } else {
        console.log('Invalid user data - not redirecting');
      }

      setLoading(false);
      return userData;
    } catch (err) {
      console.error('Login error:', err);
      setLoading(false);
      handleLogout();
      return null;
    }
  };

  const register = async (userData: {
    username: string;
    password: string;
    password2: string;
    email: string;
    first_name: string;
    last_name: string;
    user_type: 'job_seeker' | 'employer';
  }) => {
    try {
      setError(null);
      const data = await apiRequest('/api/accounts/register/', 'POST', userData);
      if (data) {
        console.log('Registration response:', data);
        const newToken = data.token;
        setToken(newToken);
        localStorage.setItem('token', newToken);
        setUser(data.user);

        // Log user properties
        console.log('Registration Successful - User Properties:', {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          userType: data.user.user_type,
          token: newToken,
          fullUser: data.user
        });

        // Immediate redirect based on user type
        const redirectPath = data.user.user_type === 'employer' ? '/employer/dashboard' : '/dashboard';
        console.log('Redirecting to:', redirectPath);
        window.location.href = redirectPath; // Force a full page reload and redirect
        return data;
      }
      return null;
    } catch (err) {
      handleLogout();
      return null;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await apiRequest('/api/accounts/logout/', 'POST');
      }
    } finally {
      handleLogout();
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    apiRequest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
