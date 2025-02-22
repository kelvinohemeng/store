import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/utils/supabase/middleware";
import { verifyAdmin } from "./lib/utils/supabase/adminMiddleware";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const userRoutes = ["/s/orders"];
  const adminRoutes = ["/admin/dashboard", "/admin/products", "/admin/orders"];
  const authRoutes = ["/login", "/signup"]; // Add your authentication routes here

  const isUserRoute = userRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  //get user session
  const response = await updateSession(request);

  if (isAuthRoute) {
    const user = await response;
    // If user is logged in and tries to access login/signup, redirect to home (or dashboard)
    if (user) {
      return NextResponse.redirect(new URL("/s/home", request.url));
    }
  }

  if (isUserRoute) {
    return response;
  }

  if (isAdminRoute) {
    const response = await verifyAdmin(request);
    return (
      response ?? NextResponse.redirect(new URL("/unauthorized", request.url))
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
