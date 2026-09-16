"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user.context";

export default function SignOutButton() {
  const router = useRouter();

  const { signOutUser } = useContext(UserContext);

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    const success = await signOutUser();

    if (!success) {
      setIsSigningOut(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSigningOut ? "Signing out..." : "Sign Out"}
    </button>
  );
}
