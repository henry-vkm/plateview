"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function DishPhotoPage() {
  const router = useRouter();

  const dishes = [
    {
      id: 1,
      name: "Chicken Teriyaki",
      price: "$16.99",
    },
    {
      id: 2,
      name: "Spicy Ramen",
      price: "$14.99",
    },
    {
      id: 3,
      name: "Beef Bulgogi",
      price: "$18.99",
    },
    {
      id: 4,
      name: "Garlic Noodles",
      price: "$12.99",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  const currentDish = dishes[currentIndex];

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
  };

  const handleConfirmUpload = () => {
    if (!fileName) return;

    setUploading(true);

    // Fake upload delay for MVP
    setTimeout(() => {
      setUploadedPhotos((previousPhotos) => ({
        ...previousPhotos,
        [currentDish.id]: fileName,
      }));

      setUploading(false);
      setFileName("");

      if (currentIndex < dishes.length - 1) {
        setCurrentIndex((current) => current + 1);
      }
    }, 700);
  };

  const completedCount = Object.keys(uploadedPhotos).length;
  const allCompleted = completedCount === dishes.length;

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="mx-auto max-w-xl">
        {/* Brand */}
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
            <span className="font-medium text-gray-900">Dish photos</span>

            <span className="text-gray-400">Step 3 of 3</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Add photos to your dishes
          </h1>

          <p className="mt-3 text-base leading-7 text-gray-500">
            Upload one photo for each dish. PlateView will use these photos to
            create your visual menu.
          </p>
        </div>

        {/* Completed State */}
        {allCompleted ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600">
              ✓
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-950">
              All dish photos uploaded
            </h2>

            <p className="mt-2 text-gray-500">
              You added photos for all {dishes.length} dishes.
            </p>

            <button
              onClick={() => router.push("/onboarding/preview")}
              className="mt-8 w-full rounded-xl bg-black px-5 py-4 font-semibold text-white transition hover:bg-gray-800"
            >
              Generate Visual Menu
            </button>
          </div>
        ) : (
          <>
            {/* Counter */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {completedCount} of {dishes.length} completed
              </p>

              <p className="text-sm font-semibold text-gray-900">
                Dish {currentIndex + 1}
              </p>
            </div>

            {/* Upload Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-400">
                  Current dish
                </p>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-gray-950">
                    {currentDish.name}
                  </h2>

                  <span className="font-semibold text-gray-700">
                    {currentDish.price}
                  </span>
                </div>
              </div>

              {/* Photo Upload Box */}
              <label
                htmlFor="dishPhoto"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center transition hover:border-gray-300 hover:bg-gray-100"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
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
                    className="text-gray-600"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />

                    <circle cx="9" cy="9" r="2" />

                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>

                <p className="font-semibold text-gray-900">
                  {fileName ? fileName : `Upload photo for ${currentDish.name}`}
                </p>

                {!fileName && (
                  <p className="mt-2 text-sm text-gray-400">JPG, PNG or JPEG</p>
                )}

                <input
                  id="dishPhoto"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>

              {/* Selected */}
              {fileName && (
                <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Photo selected
                    </p>

                    <p className="mt-1 max-w-[250px] truncate text-sm text-gray-400">
                      {fileName}
                    </p>
                  </div>

                  <button
                    onClick={() => setFileName("")}
                    className="text-sm font-medium text-gray-500 hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              )}

              <button
                onClick={handleConfirmUpload}
                disabled={!fileName || uploading}
                className="mt-6 w-full rounded-xl bg-black px-5 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {uploading
                  ? "Uploading..."
                  : currentIndex === dishes.length - 1
                    ? "Upload Final Photo"
                    : "Upload & Next Dish"}
              </button>
            </div>

            {/* Completed Dishes */}
            {completedCount > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold text-gray-900">
                  Completed
                </p>

                <div className="space-y-2">
                  {dishes
                    .filter((dish) => uploadedPhotos[dish.id])
                    .map((dish) => (
                      <div
                        key={dish.id}
                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3"
                      >
                        <span className="text-sm font-medium text-gray-800">
                          {dish.name}
                        </span>

                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-600">
                          ✓
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
