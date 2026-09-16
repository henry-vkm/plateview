"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import GoogleButton from "../../../components/googleButton.component";

export default function SignInPage() {
  const router = useRouter();

  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();
    console.log(email, password);

    setIsLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    console.log("Signed in user: ", data.user);

    router.push("/dashboard");

    router.refresh();
  };
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md flex-col justify-center">
        {/* Brand */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-gray-950"
          >
            PlateView
          </Link>
        </div>

        {/* Sign In Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-950">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to manage your restaurant and visual menu.
            </p>
          </div>

          {/* Error */}

          {errorMessage && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-900"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-gray-500 transition hover:text-black"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                required
              />
            </div>

            {/* Sign In */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-black px-5 py-4 font-semibold text-white transition hover:bg-gray-800"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              or
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google */}
          <GoogleButton />

          {/* Sign Up */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-gray-950 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          By continuing, you agree to PlateView&apos;s Terms and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
