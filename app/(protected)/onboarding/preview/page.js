"use client";

import { useState } from "react";
import Link from "next/link";

export default function DemoMenuPage() {
  const [published, setPublished] = useState(false);

  const dishes = [
    {
      id: 1,
      name: "Chicken Teriyaki",
      description:
        "Grilled chicken glazed with house teriyaki sauce, served with steamed rice and vegetables.",
      price: "$16.99",
    },
    {
      id: 2,
      name: "Spicy Ramen",
      description:
        "Rich spicy broth with noodles, soft-boiled egg, scallions, corn, and tender pork.",
      price: "$14.99",
    },
    {
      id: 3,
      name: "Beef Bulgogi",
      description:
        "Marinated beef cooked with onions and sesame, served with rice and fresh vegetables.",
      price: "$18.99",
    },
  ];

  const handlePublish = () => {
    setPublished(true);
  };

  return (
    <main className="min-h-screen bg-[#f5f3ef] px-4 py-8">
      <div className="mx-auto max-w-md">
        {/* Top Bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/onboarding/photos"
            className="text-sm font-medium text-gray-500 transition hover:text-black"
          >
            ← Back
          </Link>

          <span className="text-sm font-semibold text-gray-900">
            Menu Preview
          </span>

          <div className="w-10" />
        </div>

        {/* Mobile Menu Card */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-xl">
          {/* Restaurant Header */}
          <div className="border-b border-gray-100 px-6 py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
              SK
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-950">
              Sakura Kitchen
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Japanese Kitchen • Freshly Made
            </p>
          </div>

          {/* Hero */}
          <div className="px-6 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Our Menu
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-950">
              Choose what looks good.
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Browse our dishes visually before you order.
            </p>
          </div>

          {/* Dishes */}
          <div className="space-y-6 px-6 py-8">
            {dishes.map((dish, index) => (
              <div key={dish.id}>
                {/* Image Placeholder */}
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>

                    <p className="mt-3 text-sm font-medium text-gray-400">
                      Dish photo
                    </p>
                  </div>
                </div>

                {/* Dish Info */}
                <div className="mt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {index === 0 && (
                        <span className="mb-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                          Popular
                        </span>
                      )}

                      <h3 className="text-xl font-bold text-gray-950">
                        {dish.name}
                      </h3>
                    </div>

                    <span className="text-base font-bold text-gray-950">
                      {dish.price}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-6 py-6 text-center">
            <p className="text-xs text-gray-400">Powered by PlateView</p>
          </div>
        </div>

        {/* Publish Section */}
        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          {!published ? (
            <>
              <h3 className="font-semibold text-gray-950">Ready to publish?</h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Your visual menu will be ready to share with customers.
              </p>

              <button
                onClick={handlePublish}
                className="mt-5 w-full rounded-xl bg-black px-5 py-4 font-semibold text-white transition hover:bg-gray-800"
              >
                Publish Menu
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl font-bold text-green-600">
                ✓
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-950">
                Your menu is live
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Your PlateView menu has been published successfully.
              </p>

              <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
                plateview.app/sakura-kitchen
              </div>

              <Link
                href="/"
                className="mt-4 inline-block text-sm font-semibold text-gray-900 hover:underline"
              >
                Back to home
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
