// import { checkUserAuth } from "@/actions/auth";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//   const user = await checkUserAuth();

//   if (!user) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/login"; // Redirect to login if not authenticated
//     return NextResponse.redirect(url);
//   }

//   // Optionally, you can check if the user is an admin
//   if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/"; // Redirect to home if not admin
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"], // Apply middleware to admin routes
// };
