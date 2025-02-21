"use client";

import { checkAdminAuth, logoutUser } from "@/actions/auth";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useEffect } from "react";

const UserProfile = ({ user }: { user: User }) => {
  const [triggerDD, setTriggerDD] = React.useState<boolean>(false);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  async function checkAdmin() {
    const checkAdminAuthentication = await checkAdminAuth();
    setIsAdmin(checkAdminAuthentication.isAdmin);
  }

  useEffect(() => {
    checkAdmin();
  }, [user]);

  const logOut = () => logoutUser();
  return (
    <div className="relative overflow-visible">
      <div
        onClick={() => setTriggerDD(!triggerDD)}
        className="h-[30px] border-slate-400 border-[3px] aspect-square rounded-full bg-black"
      ></div>
      <div
        className={`cursor-pointer absolute w-[150px] right-0 mt-8 bg-white border  rounded-lg shadow-sm flex flex-col z-[9] ${
          triggerDD ? "visible" : "invisible"
        }`}
      >
        <div className="px-5 py-3 w-full text-start hover:bg-slate-50">
          <Link href={"/profile"} className=" text-nowrap text-xl">
            Profile
          </Link>
        </div>
        <div className="px-5 py-3 w-full text-start hover:bg-slate-50">
          <Link href={"/orders"} className=" text-nowrap text-xl">
            My Orders
          </Link>
        </div>
        {isAdmin && (
          <div className="px-5 py-3 w-full text-start hover:bg-slate-50">
            <Link href={"/admin/dashboard"} className=" text-nowrap text-xl">
              Dashboard
            </Link>
          </div>
        )}
        <form action={logOut}>
          <button
            className="px-5 py-3 w-full text-nowrap text-xl text-start hover:bg-slate-50"
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
