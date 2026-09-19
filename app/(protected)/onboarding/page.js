"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import { UserContext } from "@/context/user.context";
import { createClient } from "@/lib/supabase/client";

import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();

  const { currentUser } = useContext(UserContext);

  const [restaurantName, setRestaurantName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [logoName, setLogoName] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!restaurantName || !cuisine || !currentUser) return;

    setIsSaving(true);
    setErrorMessage("");

    const supabase = createClient();

    const { data, error } = await supabase
      .from("restaurants")
      .insert({
        owner_id: currentUser.id,
        name: restaurantName,
        cuisine: cuisine,
        onboarding_step: "menu_upload",
      })
      .select()
      .single();

    if (error) {
      console.error(error);

      setErrorMessage(error.message);
      setIsSaving(false);

      return;
    }

    console.log("Restaurant created: ", data);
    router.push("/onboarding/menu");
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="mx-auto max-w-xl">
        {/* Logo / Brand */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-950"
          >
            PlateView
          </Link>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-900">
              Restaurant details
            </span>

            <span className="text-gray-400">Step 1 of 3</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/3 rounded-full bg-black" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Tell us about your restaurant
          </h1>

          <p className="mt-3 text-base leading-7 text-gray-500">
            We&apos;ll use this information to create your visual menu.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleContinue}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Restaurant Name */}
          <div>
            <label
              htmlFor="restaurantName"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Restaurant Name
            </label>

            <input
              id="restaurantName"
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="e.g. Sakura Kitchen"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Cuisine */}
          <div className="mt-6">
            <label
              htmlFor="cuisine"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Restaurant Type / Cuisine
            </label>

            <input
              id="cuisine"
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="e.g. Japanese, Italian, Cafe"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Logo Upload */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Restaurant Logo
            </label>

            <label
              htmlFor="logo"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center transition hover:border-gray-300 hover:bg-gray-100"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              <p className="text-sm font-semibold text-gray-900">
                {logoName || "Upload your logo"}
              </p>

              {!logoName && (
                <p className="mt-1 text-xs text-gray-400">PNG, JPG or SVG</p>
              )}

              <input
                id="logo"
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setLogoName(file.name);
                  }
                }}
              />
            </label>
          </div>

          {/* Continue */}
          <button
            type="submit"
            disabled={!restaurantName || !cuisine || isSaving}
            className="mt-8 w-full rounded-xl bg-black px-5 py-4 text-base font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isSaving ? "Saving..." : "Continue"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-400">
          You can change these details later.
        </p>
      </div>
    </main>
  );
}
