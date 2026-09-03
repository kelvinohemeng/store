"use client";

import { useSession } from "@/lib/auth/client";
import { StoreUser, useUserData } from "@/store";
import { isDemoEmail } from "@/lib/demo";
import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect does nothing (and warns) during SSR — falling back to
// useEffect there is fine since the seed below only ever needs to run in
// the browser anyway.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function LoadZustandGloabalStore({
  initialUser,
}: {
  initialUser: StoreUser | null;
}) {
  const { data, isPending } = useSession();
  const { setUser } = useUserData();

  // Seed the store from the server-rendered session synchronously, before
  // the browser paints. Without this, the store starts as `user: null` and
  // stays that way until the effect below's client-side session fetch
  // resolves — Navigation reads that gap as "logged out" even for a user
  // who is actually signed in.
  //
  // Runs once on mount only: this component lives in the storefront layout,
  // which doesn't remount on client-side navigations, so `initialUser` is
  // the session as of the page's original server render. useSession() below
  // takes over from there for anything that changes afterwards (login,
  // logout, expiry, another tab).
  useIsomorphicLayoutEffect(() => {
    setUser(initialUser);
  }, []);

  useEffect(() => {
    // While the client-side session fetch is still in flight, `data` is
    // `null` regardless of who's actually logged in — that's not the same
    // as a confirmed logged-out response. Bail out here rather than
    // stomping the seeded/optimistic user with a false "logged out".
    if (isPending) return;

    if (!data?.user) {
      setUser(null);
      return;
    }

    setUser({
      id: data.user.id,
      email: data.user.email,
      display_name: data.user.name,
      role: (data.user as { role?: string }).role ?? "user",
      created_at: new Date(data.user.createdAt).toISOString(),
      isDemo: isDemoEmail(data.user.email),
    });
  }, [data, isPending, setUser]);

  return null;
}
