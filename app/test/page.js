"use client";

import { useEffect } from "react";
import { createClient } from "../../lib/supabase/client";

export default function TestPage() {
  useEffect(() => {
    const supabase = createClient();

    console.log("Supabase client:", supabase);
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Supabase test</h1>

      <p className="mt-2 text-gray-500">Open your browser console.</p>
    </main>
  );
}
