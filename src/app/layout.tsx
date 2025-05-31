import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { JobsProvider } from "@/contexts/JobsContext";
import { CompaniesProvider } from '@/contexts/CompaniesContext';
import { BookmarkProvider } from '@/contexts/BookmarkContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobSphere - Find Your Dream Job",
  description: "Connect with top employers and discover exciting career opportunities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <AuthProvider>
          <JobsProvider>
            <CompaniesProvider>
              <BookmarkProvider>
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </BookmarkProvider>
            </CompaniesProvider>
          </JobsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
