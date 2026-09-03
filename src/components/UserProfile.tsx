"use client";

import { checkAdminAuth, logoutUser } from "@/actions/auth";
import { StoreUser, useUserData } from "@/store";
import { User } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UserProfile = ({ user }: { user: StoreUser }) => {
  const router = useRouter();
  const [triggerDD, setTriggerDD] = React.useState<boolean>(false);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const { setUser } = useUserData();

  useEffect(() => {
    // Guard against setting state from a stale request if `user` changes
    // again (or this unmounts) before checkAdminAuth() resolves.
    let cancelled = false;

    checkAdminAuth().then((result) => {
      if (!cancelled) setIsAdmin(result.isAdmin);
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const logOut = async () => {
    const response = await logoutUser();
    if (response.success) {
      setUser(null); // Clears Zustand state
      router.push("/home"); // Redirects client-side
    } else {
      console.error("Logout failed:", response.error);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => setTriggerDD(!triggerDD)}
        className="h-[30px] aspect-square grid place-items-center cursor-pointer"
      >
        <User size={16} weight="bold" />
      </div>
      <div
        className={`cursor-pointer absolute w-[160px] right-0 mt-8 bg-paper border border-ink/30 flex flex-col z-[9] overflow-hidden ${
          triggerDD
            ? "visible translate-y-[0px]"
            : "invisible translate-y-[-30px]"
        }`}
      >
        <div
          onClick={() => setTriggerDD(!triggerDD)}
          className="px-4 py-3 w-full text-start hover:bg-ink/5"
        >
          <Link
            href={"/orders"}
            className="text-nowrap font-sans text-sm font-semibold uppercase tracking-wide text-ink"
          >
            My Orders
          </Link>
        </div>
        {isAdmin && (
          <div className="px-4 py-3 w-full text-start hover:bg-ink/5">
            <Link
              href={"/admin/dashboard"}
              className="text-nowrap font-sans text-sm font-semibold uppercase tracking-wide text-ink"
            >
              Dashboard
            </Link>
          </div>
        )}
        <button
          onClick={logOut}
          className="cursor-pointer px-4 py-3 w-full text-nowrap font-sans text-sm font-semibold uppercase tracking-wide text-start text-ink hover:bg-ink/5"
          type="submit"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
