"use client";

import { useEffect } from "react";
import StatusPage from "@/components/global-components/StatusPage";

// Root error boundary — catches render-time throws anywhere in the app that
// aren't caught by a more specific error.tsx closer to the route. There was
// no boundary at any level before this, so an uncaught throw fell through to
// Next's default (unbranded) crash screen instead of a page a visitor could
// recover from.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      eyebrow="Error"
      title="Something went wrong"
      description="An unexpected error occurred. You can try again, or head back to the homepage."
      action={
        <button
          type="button"
          onClick={reset}
          className="border border-ink bg-ink px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-paper hover:bg-ink/85"
        >
          Try again
        </button>
      }
    />
  );
}
