"use client";

import { logoutUser } from "@/actions/auth";
import Link from "next/link";
import React from "react";

const UserProfile = () => {
  const logOut = () => logoutUser();
  return (
    <div className="relative">
      <div className="h-[30px] border-slate-400 border-[3px] aspect-square rounded-full bg-black"></div>
      <div className="absolute right-0 mt-3 bg-slate-100 flex flex-col">
        <div className="px-4 py-1 border-b w-full text-start">
          <Link href={"/profile"} className=" text-nowrap text-base">
            Profile
          </Link>
        </div>
        <div className="px-4 py-1 border-b w-full text-start">
          <Link href={"/orders"} className=" text-nowrap text-base">
            My Orders
          </Link>
        </div>
        <form action={logOut}>
          <button
            className="px-4 py-1 border-b w-full text-nowrap text-base text-start"
            type="submit"
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
