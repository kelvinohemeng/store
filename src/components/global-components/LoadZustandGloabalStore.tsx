"use client";

import { useSession } from "@/lib/auth/client";
import { useUserData } from "@/store";
import { useEffect } from "react";

export default function LoadZustandGloabalStore() {
  const { data } = useSession();
  const { setUser } = useUserData();

  useEffect(() => {
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
    });
  }, [data, setUser]);

  return null;
}
