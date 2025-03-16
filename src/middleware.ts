import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/utils/supabase/middleware";
import { verifyAdmin } from "./lib/utils/supabase/adminMiddleware";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const homeRoute = ["/"];
  const userRoutes = ["/orders"];
  const adminRoutes = ["/admin/dashboard", "/admin/products", "/admin/orders"];
  const adminAuthRoutes = ["/admin/login"]; // Admin authentication routes
  const authRoutes = ["/login", "/signup"]; // Authentication routes

  const isHomeRoute = homeRoute.includes(path);
  const isUserRoute = userRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const isAdminAuthRoute = adminAuthRoutes.includes(path);

  // Fetch session & user from `updateSession`
  const { response, user } = await updateSession(request);
  const { adminResponse, adminUser } = await verifyAdmin(request);

  if (isHomeRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  // const checkAdmin = await

  // Redirect logged-in users away from login/signup
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // ✅ Prevent authenticated admin from accessing admin login page
  if (isAdminAuthRoute && adminUser?.role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // ✅ Prevent unauthenticated users from accessing admin routes
  if (isAdminRoute && adminUser?.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // ✅ Protect user routes: redirect if no user is found
  if (isUserRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow user routes
  if (isUserRoute) {
    return response;
  }

  // Handle admin routes
  if (isAdminRoute) {
    return adminResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
