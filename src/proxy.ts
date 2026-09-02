import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Cookie-presence checks only — no DB access here. Cloudflare's OpenNext
// adapter treats any middleware that touches D1/Node APIs as experimental
// "Node.js middleware", so the real admin-role check lives in
// admin/(protected)/layout.tsx instead, on the normal request path.
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const homeRoute = ["/"];
  const userRoutes = ["/orders"];
  const authRoutes = ["/login", "/signup"]; // Authentication routes

  const isHomeRoute = homeRoute.includes(path);
  const isUserRoute = userRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  if (isHomeRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  const hasSession = !!getSessionCookie(request);

  // Redirect logged-in users away from login/signup
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Protect user routes: redirect if no session cookie is present
  if (isUserRoute && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
