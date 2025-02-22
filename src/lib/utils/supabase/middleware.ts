import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Fetch the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (!user) {
    // Redirect unauthenticated users away from protected routes
    if (!path.startsWith("/signup") && !path.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // Redirect logged-in users away from auth pages
    if (path.startsWith("/login") || path.startsWith("/signup")) {
      return NextResponse.redirect(new URL("/s/home", request.url)); // Change this to your actual homepage
    }
  }
  console.log("Middleware User:", user);

  return supabaseResponse;
}
