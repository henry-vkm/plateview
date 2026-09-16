"use client";

import { createContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  isLoading: true,
  setIsLoading: () => true,
  signOutUser: async () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const value = {
    currentUser,
    setCurrentUser,
    isLoading,
    signOutUser,
  };

  useEffect(() => {
    const supabase = createClient();

    // Check if a user is already logged in
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setCurrentUser(user);
      setIsLoading(false);
    };

    getCurrentUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Signout Function
  async function signOutUser() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut({
      scope: "local",
    });

    if (error) {
      console.error("Sign out error: ", error.message);
      return false;
    }

    return true;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="flex gap-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-black" />
            <div className="h-3 w-3 animate-bounce rounded-full bg-black [animation-delay:150ms]" />
            <div className="h-3 w-3 animate-bounce rounded-full bg-black [animation-delay:300ms]" />
          </div>

          <p className="mt-6 text-sm font-medium text-gray-500">
            Preparing your dashboard
          </p>
        </div>
      </div>
    );
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
