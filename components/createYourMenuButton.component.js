"use client";
import React, { useContext } from "react";
import { UserContext } from "@/context/user.context";
import Link from "next/link";

const CreateYourMenuButton = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Link
      className="primary-button hidden sm:inline-flex"
      href={currentUser ? "/dashboard" : "/auth/sign-in"}
    >
      Create Your Menu <span aria-hidden="true">↗</span>
    </Link>
  );
};

export default CreateYourMenuButton;
