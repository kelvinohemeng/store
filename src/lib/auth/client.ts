"use client";

import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

// No baseURL passed — Better Auth defaults to same-origin, which is what we
// want since the API route lives at /api/auth on this same Next.js app.
export const authClient = createAuthClient({
  plugins: [adminClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
