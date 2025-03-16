"use client";

import { supabase } from "@/lib/utils/supabase";
import { useUserData } from "@/store";
import { useEffect } from "react";

export default function LoadZustandGloabalStore() {
  const { user: storedUser, setUser } = useUserData();
  async function gUser() {
    const { data, error } = await supabase.auth.getUser();
    setUser(data.user);

    if (error) {
      console.log;
    }
    return data;
  }

  useEffect(() => {
    gUser();
    console.log(storedUser);
  }, [setUser]);

  return null;
}
