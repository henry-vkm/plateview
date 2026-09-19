"use client";

import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/user.context";
import SignOutButton from "@/components/signOutButton.component";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const { currentUser } = useContext(UserContext);

  const [restaurant, setRestaurant] = useState(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setRestaurantLoading(false);
      return;
    }

    const getRestaurant = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("owner_id", currentUser.id)
        .maybeSingle();

      if (error) {
        console.error("Error getting restaurant: ", error.message);
      }

      setRestaurant(data);
      setRestaurantLoading(false);
    };

    getRestaurant();
  }, [currentUser]);

  const stepOrder = {
    restaurant_details: 0,
    menu_upload: 1,
    dish_photos: 2,
    preview: 3,
    complete: 4,
  };

  const currentStep = restaurant
    ? (stepOrder[restaurant.onboarding_step] ?? 0)
    : 0;

  const setupSteps = [
    {
      id: 1,
      title: "Add restaurant details",
      description: "Add your restaurant name, cuisine, and logo.",
      completed: currentStep > 0,
      href: "/onboarding",
    },
    {
      id: 2,
      title: "Upload your existing menu",
      description: "Let PlateView extract your dishes and prices.",
      completed: currentStep > 1,
      href: "/onboarding/menu",
    },
    {
      id: 3,
      title: "Add dish photos",
      description: "Upload photos so customers can see what they’re ordering.",
      completed: currentStep > 2,
      href: "/onboarding/photos",
    },
    {
      id: 4,
      title: "Publish your visual menu",
      description: "Review your menu and make it available to customers.",
      completed: restaurant?.onboarding_completed === true,
      href: "/onboarding/preview",
    },
  ];

  const completedSteps = setupSteps.filter((step) => step.completed).length;

  const progress = (completedSteps / setupSteps.length) * 100;

  const menuPublished = restaurant?.is_published ?? false;

  const continueSetupHref = !restaurant
    ? "/onboarding"
    : restaurant.onboarding_step === "menu_upload"
      ? "/onboarding/menu"
      : restaurant.onboarding_step === "dish_photos"
        ? "/onboarding/photos"
        : restaurant.onboarding_step === "preview"
          ? "/onboarding/preview"
          : "/onboarding";

  if (restaurantLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
        <div className="text-center">
          <div className="flex justify-center gap-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-black" />

            <div className="h-3 w-3 animate-bounce rounded-full bg-black [animation-delay:150ms]" />

            <div className="h-3 w-3 animate-bounce rounded-full bg-black [animation-delay:300ms]" />
          </div>

          <p className="mt-5 text-sm text-gray-500">Loading restaurant...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      {/* Top Navigation */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="text-xl font-bold tracking-tight text-gray-950"
          >
            PlateView
          </Link>

          <div className="flex items-center gap-4">
            <button className="hidden text-sm font-medium text-gray-500 transition hover:text-black sm:block">
              Help
            </button>

            <p>{currentUser ? <SignOutButton /> : "Sign In"} </p>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r border-gray-200 bg-white p-5 lg:block">
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-950"
            >
              <DashboardIcon />
              Dashboard
            </Link>

            <Link
              href="/dashboard/menu"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-950"
            >
              <MenuIcon />
              Menu
            </Link>

            <Link
              href="/dashboard/photos"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-950"
            >
              <PhotoIcon />
              Photos
            </Link>

            <Link
              href="/dashboard/qr"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-950"
            >
              <QRIcon />
              QR Code
            </Link>

            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-950"
            >
              <ChartIcon />
              Analytics
            </Link>
          </nav>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-950"
            >
              <SettingsIcon />
              Settings
            </Link>
          </div>
        </aside>

        {/* Dashboard Content */}
        <section className="w-full px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Welcome to PlateView
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  {restaurant ? restaurant.name : "Let's build your menu"}
                </h1>

                <p className="mt-2 max-w-xl text-gray-500">
                  {restaurant
                    ? restaurant.cuisine
                    : "Complete your restaurant setup and publish your first visual menu."}
                </p>
              </div>

              <Link
                href={continueSetupHref}
                className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Continue Setup
              </Link>
            </div>

            {/* Setup Progress */}
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Restaurant setup
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-950">
                    {completedSteps} of {setupSteps.length} steps completed
                  </h2>
                </div>

                {restaurant?.onboarding_completed ? (
                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    Setup complete
                  </span>
                ) : (
                  <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                    Setup incomplete
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-black transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Steps */}
              <div className="mt-8 space-y-3">
                {setupSteps.map((step, index) => (
                  <Link
                    href={step.href}
                    key={step.id}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-gray-200 hover:bg-gray-50"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        step.completed
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {step.completed ? "✓" : index + 1}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-950">
                        {step.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {step.description}
                      </p>
                    </div>

                    <span className="text-xl text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-500">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-950">Quick access</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <QuickCard
                  title="Your Menu"
                  description="View and manage your dishes."
                  href="/dashboard/menu"
                  icon={<MenuIcon />}
                />

                <QuickCard
                  title="Dish Photos"
                  description="Upload and manage food photos."
                  href="/dashboard/photos"
                  icon={<PhotoIcon />}
                />

                <QuickCard
                  title="QR Code"
                  description="Get your restaurant QR code."
                  href="/dashboard/qr"
                  icon={<QRIcon />}
                />
              </div>
            </div>

            {/* Menu Status */}
            <div className="mt-8 rounded-3xl bg-gray-950 p-6 text-white sm:p-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Menu status
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        menuPublished ? "bg-green-400" : "bg-orange-400"
                      }`}
                    />

                    <h2 className="text-xl font-bold">
                      {menuPublished
                        ? "Your menu is live"
                        : "Not published yet"}
                    </h2>
                  </div>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
                    Complete the setup process before sharing your visual menu
                    with customers.
                  </p>
                </div>

                <Link
                  href="/menu/demo"
                  className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-100"
                >
                  Preview Menu
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function QuickCard({ title, description, href, icon }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
        {icon}
      </div>

      <h3 className="mt-5 font-bold text-gray-950">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>

      <p className="mt-5 text-sm font-semibold text-gray-900">
        Open <span className="transition group-hover:ml-1">→</span>
      </p>
    </Link>
  );
}

/* Icons */

function DashboardIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-4-4L5 21" />
    </svg>
  );
}

function QRIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="6" height="6" />
      <rect x="15" y="3" width="6" height="6" />
      <rect x="3" y="15" width="6" height="6" />
      <path d="M15 15h2v2h-2z" />
      <path d="M19 15h2v2h-2z" />
      <path d="M15 19h2v2h-2z" />
      <path d="M19 19h2v2h-2z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.1.4.3.7.6 1 .3.2.7.4 1.1.4h.1v4h-.1a1.7 1.7 0 0 0-1.7.6Z" />
    </svg>
  );
}
