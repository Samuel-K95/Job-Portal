import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirect to login if not authenticated
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check user type specific routes
    if (path.startsWith("/employer") && token.userType !== "employer") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (path.startsWith("/job-seeker") && token.userType !== "job_seeker") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employer/:path*",
    "/job-seeker/:path*",
    "/profile/:path*",
  ],
}; 