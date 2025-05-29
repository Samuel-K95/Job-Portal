import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    token: string;
    userType: "job_seeker" | "employer";
  }

  interface Session {
    user: User & {
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userType: "job_seeker" | "employer";
    accessToken: string;
  }
} 