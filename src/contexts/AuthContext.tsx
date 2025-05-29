"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Set token from localStorage once we're in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      } else {
        setLoading(false);
      }
    }
  }, []);

  // API request helper
  const apiRequest = async (endpoint: string, method = 'GET', data?: any) => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (token) {
        options.headers = {
          ...options.headers,
          'Authorization': `Token ${token}`,
        };
      }

      if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`https://job-portal-api-cx5r.onrender.com${endpoint}`, options);

      if (response.status === 204) {
        return { success: true };
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || JSON.stringify(responseData));
      }

      return responseData;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    }
  };

  const fetchUserProfile = async () => {
    return apiRequest('/api/accounts/profile/');
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token) {
        try {
          const userData = await fetchUserProfile();
          setUser(userData);
        } catch (err) {
          console.error('Auth verification failed:', err);
          localStorage.removeItem('token');
          setToken(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [token]);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const data = await apiRequest('/api/accounts/login/', 'POST', credentials);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user_id);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userType', data.user_type);

      const userData = await fetchUserProfile();
      setUser(userData);

      return userData;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
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
      const data = await apiRequest('/api/accounts/register/', 'POST', userData);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiRequest('/api/accounts/logout/', 'POST');
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('userType');
      setToken(null);
      setUser(null);
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
