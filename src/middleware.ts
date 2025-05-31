import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userType = request.cookies.get('userType')?.value;
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup'];
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check user type specific routes
  if (path.startsWith("/employer") && userType !== "employer") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (path.startsWith("/job-seeker") && userType !== "job_seeker") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Specify which routes to protect
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employer/:path*",
    "/job-seeker/:path*",
    "/profile/:path*",
  ],
}; 