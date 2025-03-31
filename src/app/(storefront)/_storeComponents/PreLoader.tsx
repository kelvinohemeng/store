"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleReady = () => {
      // Once document is ready, wait 10 seconds before hiding the loader
      setTimeout(() => {
        setLoading(false);
      }, 5000); // 10 seconds timeout after document is ready
    };

    // Check if document is already ready
    if (document.readyState === "complete") {
      handleReady();
    } else {
      // If not ready, add event listener for when it becomes ready
      window.addEventListener("load", handleReady);
      return () => window.removeEventListener("load", handleReady);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed z-[999] h-screen w-full grid place-items-center bg-black">
        <h2 className="text-2xl font-bold uppercase">OM — K</h2>
      </div>
    );
  }

  return null;
}
