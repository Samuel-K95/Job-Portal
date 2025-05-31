'use client';

import { Sidebar } from "@/components/navigation/Sidebar";
import { Building2, BriefcaseIcon, Users2, Bell, Settings } from "lucide-react";

const sidebarItems = [
  {
    icon: Building2,
    label: 'Posted Jobs',
    href: '/employer/dashboard',
  },
  {
    icon: BriefcaseIcon,
    label: 'Post New Job',
    href: '/employer/dashboard/post-job',
  },
  {
    icon: Users2,
    label: 'Applicants',
    href: '/employer/dashboard/applicants',
  },
  {
    icon: Bell,
    label: 'Notifications',
    href: '/employer/dashboard/notifications',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/employer/dashboard/settings',
  },
];

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
} 