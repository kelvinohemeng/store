"use client";

import { useSlide } from "@/store";
import { useEffect } from "react";

export default function FixedBodyOnCartOpen() {
  const { state } = useSlide();
  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;

    if (state !== "") {
      const scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
    } else {
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [state]);
  return null;
}
