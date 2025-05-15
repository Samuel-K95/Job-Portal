import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SocialLoginButtons from "@/components/social-login-buttons";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Illustration */}
      <div className="hidden w-1/2 bg-slate-100 items-center justify-center p-8 lg:flex">
        <div className="relative h-full w-full max-w-md">
          <Image
            src="/login.svg"
            alt="Login illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
              <span className="text-xl">JobSphere</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold">Log in to your account</h1>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Input type="email" placeholder="Email" className="pr-10" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 -ml-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="h-1 w-1 bg-red-500 rounded-full ml-2"></div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pr-10"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 -ml-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">OR</div>

          <SocialLoginButtons />

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
