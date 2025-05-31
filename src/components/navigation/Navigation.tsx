"use client";
import Image from "next/image";
import BlueButton from "../BlueButton";
import WhiteButton from "../WhiteButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const routes = [
  { name: "Job Search", path: "dashboard" },
  { name: "My Applications", path: "dashboard/my-applications" },
  { name: "Saved Jobs", path: "dashboard/saved-jobs" },
  { name: "Companies", path: "dashboard/companies" },
  { name: "Profile", path: "dashboard/profile" },
  { name: "Contact Us", path: "dashboard/contact-us" },
];

const Navigation = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const isActivePath = (path: string) => {
    if (path === 'dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname === `/${path}` || pathname.startsWith(`/${path}`);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center w-full py-3 px-4 border-b relative bg-white z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <div className="flex items-center gap-2">
            <Image src="/Logo.svg" alt="logo" width={40} height={40} />
            <span className="text-xl font-bold hidden sm:inline">JOB SPHERE</span>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {routes.map((data, index) => (
          <Link 
            href={`/${data.path}`} 
            key={index}
            className="group relative"
          >
            <div className={`flex items-center gap-1 ${
              isActivePath(data.path) 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
            } transition-colors`}>
              {data.name === "Saved Jobs" && (
                <Bookmark className="w-4 h-4" />
              )}
              {data.name}
            </div>
            <div className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
              isActivePath(data.path)
                ? 'w-full opacity-100'
                : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
            }`} />
          </Link>
        ))}
      </div>

      <div className="hidden md:flex gap-3">
        {user ? (
          <>
            <span className="text-gray-700">Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <BlueButton text="Log In" />
            </Link>
            <Link href="/signup">
              <WhiteButton text="Sign Up" />
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button onClick={() => setOpen(true)} className="md:hidden">
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="w-3/4 max-w-xs bg-white h-full p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <Image src="/Logo.svg" alt="logo" width={30} height={30} />
              <button onClick={() => setOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {routes.map((data, index) => (
                <Link
                  key={index}
                  href={`/${data.path}`}
                  onClick={() => setOpen(false)}
                  className={`text-base font-medium flex items-center gap-2 ${
                    isActivePath(data.path) 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  } transition-colors`}
                >
                  {data.name === "Saved Jobs" && <Bookmark className="w-4 h-4" />}
                  {data.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              {user ? (
                <>
                  <span className="text-gray-700">Welcome, {user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <BlueButton text="Log In" />
                  </Link>
                  <Link href="/signup">
                    <WhiteButton text="Sign Up" />
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex-1" onClick={() => setOpen(false)}></div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
