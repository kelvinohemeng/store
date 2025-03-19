"use client";

import { supabase } from "@/lib/utils/supabase";
import { StoreUser, useUserData } from "@/store";
import { useEffect } from "react";

export default function LoadZustandGloabalStore() {
  const { user: storedUser, setUser } = useUserData();
  async function getUserProfileById(userId: string | undefined) {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single<StoreUser>();
    if (error) {
      console.log(error);
    }
    if (data) {
      setUser(data);
    }
  }
  async function gUser() {
    const { data, error } = await supabase.auth.getUser();
    await getUserProfileById(data.user?.id);

    if (error) {
      console.log(error);
    }
    return data;
  }

  useEffect(() => {
    gUser();
    console.log(storedUser);
  }, [setUser]);

  return null;
}
