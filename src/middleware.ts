import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/utils/supabase/middleware";
import { verifyAdmin } from "./lib/utils/supabase/adminMiddleware";

export async function middleware(request: NextRequest) {
  const userRoutes = ["/s"]; // Add more protected routes as needed
  const adminRoutes = ["/admin/dashboard", "/admin/products", "/admin/orders"]; // Add more protected routes as needed

  const path = request.nextUrl.pathname;

  const isUserRoutes = userRoutes.some((route) => path.startsWith(route));
  const isAdminRoutes = adminRoutes.some((route) => path.startsWith(route));

  if (isUserRoutes) {
    return await updateSession(request);
  }
  if (isAdminRoutes) {
    return await verifyAdmin(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
