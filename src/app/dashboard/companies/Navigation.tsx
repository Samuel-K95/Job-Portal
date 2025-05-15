"use client";
import Image from "next/image";
import BlueButton from "../BlueButton";
import WhiteButton from "../WhiteButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const routes = [
  { name: "Job Search", path: "" },
  { name: "My Applications", path: "my-applications" },
  { name: "Companies", path: "companies" },
  { name: "Contact Us", path: "contact-us" },
];

const Navigation = () => {
  const pathname = usePathname();
  const currPage = pathname.split("/")[1] || "";
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <nav className="flex justify-between items-center w-full py-3 px-4 border-b relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/Logo.svg" alt="logo" width={40} height={40} />
        <span className="text-xl font-bold hidden sm:inline">JOB SPHERE</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {routes.map((data, index) => (
          <Link href={`/${data.path}`} key={index}>
            <div>{data.name}</div>
            {currPage == data.path ? (
              <div className="w-full h-1 rounded-full bg-[#0034D1] animate-slide-in"></div>
            ) : (
              <div className="w-full h-1 rounded-full white"></div>
            )}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex gap-3">
        <BlueButton text="Log In" />
        <WhiteButton text="Sign Up" />
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
                  className={`text-base font-medium ${
                    currPage === data.path ? "text-[#0034D1]" : "text-gray-700"
                  }`}
                >
                  {data.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <Link href="/login">
                <BlueButton text="Log In" />
              </Link>

              <Link href="/signup">
                <WhiteButton text="Sign Up" />
              </Link>
            </div>
          </div>

          <div className="flex-1" onClick={() => setOpen(false)}></div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
