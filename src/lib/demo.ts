// The public demo account anyone can use to explore admin features live.
// The email isn't a secret — it's meant to be shared — so this file has no
// server-only restriction: the exact same check runs server-side (blocking
// writes in the actions) and client-side (disabling the buttons), which
// keeps the two from ever drifting apart.
export const DEMO_USER_EMAIL = "demo@omankwesi.com";

// Shown on /login and /admin/login so visitors can sign in without asking
// for credentials. Has the "admin" role (see src/actions/auth.ts /
// checkAdminAuth) but every mutating action checks isDemoEmail() and
// refuses to run for it, so there's nothing to lock down by keeping this
// private — same reasoning as the email above.
export const DEMO_USER_PASSWORD = "OmanKwesiDemo26!";

export function isDemoEmail(email: string | null | undefined): boolean {
  return email?.toLowerCase() === DEMO_USER_EMAIL;
}
