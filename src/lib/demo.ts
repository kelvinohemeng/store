// The public demo account anyone can use to explore admin features live.
// The email isn't a secret — it's meant to be shared — so this file has no
// server-only restriction: the exact same check runs server-side (blocking
// writes in the actions) and client-side (disabling the buttons), which
// keeps the two from ever drifting apart.
export const DEMO_USER_EMAIL = "demo@omankwesi.com";

export function isDemoEmail(email: string | null | undefined): boolean {
  return email?.toLowerCase() === DEMO_USER_EMAIL;
}
