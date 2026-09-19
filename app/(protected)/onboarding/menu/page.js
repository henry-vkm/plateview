"use client";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function MenuUploadPage() {
  const router = useRouter();

  const { currentUser } = useContext(UserContext);

  const [restaurant, setRestaurant] = useState(null);
  const [saving, setSaving] = useState(false);

  const [fileName, setFileName] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [extracting, setExtracting] = useState(false);

  const sampleDishes = [
    {
      name: "Spicy Chicken",
      category: "Appetizers",
      price: 11.99,
    },
    {
      name: "Spicy Ramen",
      category: "Noodles",
      price: 14.99,
    },
    {
      name: "Beef Bulgogi",
      category: "Entrees",
      price: 18.99,
    },
    {
      name: "Garlic Noodles",
      category: "Noodles",
      price: 12.99,
    },
  ];

  useEffect(() => {
    if (!currentUser) return;

    const getRestaurant = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("owner_id", currentUser.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setRestaurant(data);
    };

    getRestaurant();
  }, [currentUser]);

  const handleConfirmMenu = async () => {
    if (!restaurant) return;

    const supabase = createClient();

    try {
      setSaving(true);

      // 1. Get Unique Categories
      const categoryNames = [
        ...new Set(sampleDishes.map((dish) => dish.category)),
      ];

      // 2. Create category rows
      const categoryRows = categoryNames.map((categoryName, index) => ({
        restaurant_id: restaurant.id,
        name: categoryName,
        position: index,
      }));

      // 3. Insert catgories to database
      const { data: categories, error: categoryError } = await supabase
        .from("menu_categories")
        .upsert(categoryRows, {
          onConflict: "restaurant_id, name",
        })
        .select();

      if (categoryError) {
        console.error("Category Error: ", categoryError);

        throw new Error(categoryError.message);
      }

      // 4. Create dishes
      const dishRows = sampleDishes.map((dish, index) => {
        const category = categories.find((item) => item.name === dish.category);

        return {
          restaurant_id: restaurant.id,
          category_id: category?.id ?? null,
          name: dish.name,
          description: dish.description ?? null,
          price: dish.price,
          position: index,
        };
      });

      // 5. Insert dishes
      const { data: dishes, error: dishError } = await supabase
        .from("dishes")
        .upsert(dishRows, {
          onConflict: "restaurant_id, category_id, name, price",
        })
        .select();

      if (dishError) {
        console.error("Dish Error: ", dishError);
        throw new Error(dishError.message);
      }

      // 6. Update onboarding
      const { error: restaurantError } = await supabase
        .from("restaurants")
        .update({
          onboarding_step: "dish_photos",
        })
        .eq("id", restaurant.id);

      if (restaurantError) {
        console.error("Restaurant Error: ", restaurantError);
        throw new Error(restaurantError.message);
      }

      // 7. Move Forward
      router.push("/onboarding/photos");
    } catch (error) {
      console.error("Error saving menu:", error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setUploaded(false);
    }
  };

  const handleUpload = () => {
    if (!fileName) return;

    setExtracting(true);

    // Fake AI extraction for MVP
    setTimeout(() => {
      setExtracting(false);
      setUploaded(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="mx-auto max-w-2xl">
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
            <span className="font-medium text-gray-900">Upload menu</span>

            <span className="text-gray-400">Step 2 of 3</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-2/3 rounded-full bg-black" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Upload your existing menu
          </h1>

          <p className="mt-3 max-w-xl text-base leading-7 text-gray-500">
            Upload a photo, PDF, or screenshot of your current menu. PlateView
            will extract your dishes automatically.
          </p>
        </div>

        {/* Upload Card */}
        {!uploaded && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <label
              htmlFor="menuFile"
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              <p className="font-semibold text-gray-900">
                {fileName || "Choose your menu file"}
              </p>

              <p className="mt-2 text-sm text-gray-400">
                PDF, PNG, JPG or JPEG
              </p>

              <input
                id="menuFile"
                type="file"
                accept=".pdf,image/png,image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {fileName && (
              <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-sm font-medium text-gray-700">
                  Selected file
                </p>

                <p className="mt-1 truncate text-sm text-gray-500">
                  {fileName}
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!fileName || extracting}
              className="mt-6 w-full rounded-xl bg-black px-5 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {extracting ? "Extracting dishes..." : "Upload Menu"}
            </button>
          </div>
        )}

        {/* Fake Extracted Menu */}
        {uploaded && (
          <div>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  <span>✓</span>
                  Menu extracted
                </div>

                <h2 className="text-2xl font-bold text-gray-950">
                  We found {sampleDishes.length} dishes
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Review the items before continuing.
                </p>
              </div>

              <button
                onClick={() => {
                  setUploaded(false);
                  setFileName("");
                }}
                className="text-sm font-medium text-gray-500 hover:text-black"
              >
                Upload again
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              {sampleDishes.map((dish, index) => (
                <div
                  key={dish.name}
                  className={`flex items-center justify-between gap-4 p-5 ${
                    index !== sampleDishes.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div>
                    <p className="font-semibold text-gray-950">{dish.name}</p>

                    <p className="mt-1 text-sm text-gray-400">
                      {dish.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900">
                      {dish.price}
                    </span>

                    <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleConfirmMenu}
              disabled={saving}
              className="mt-8 w-full rounded-xl bg-black px-5 py-4 font-semibold text-white transition hover:bg-gray-800"
            >
              {saving ? "Saving Menu..." : "Looks Good — Continue"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
