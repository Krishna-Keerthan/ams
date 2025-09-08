// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth?.token?.role as
      | "STUDENT"
      | "WORKER"
      | "ADMIN"
      | "SUPER_ADMIN"
      | undefined;

    // 1️⃣ Public routes (accessible without login)
    if (pathname === "/" || pathname.startsWith("/login")) {
      return NextResponse.next();
    }

    // 2️⃣ Block unauthenticated users
    if (!role) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // 3️⃣ Restrict ADMIN routes
    if (
      (pathname.startsWith("/admin")  && role !== "ADMIN" ) ||
      (pathname.startsWith("/superadmin")  && role !== "SUPER_ADMIN" )
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/user-dashboard";
      return NextResponse.redirect(url);
    }

    // 4️⃣ Restrict USER dashboard
    if (pathname.startsWith("/user-dashboard")) {
      if (role !== "STUDENT" && role !== "WORKER") {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    // ✅ If all checks pass → allow
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        // Always allow; we handle role restrictions in middleware manually
        return true;
      },
    },
  }
);

// Configure paths where middleware should run
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // all pages except static/api
  ],
};
