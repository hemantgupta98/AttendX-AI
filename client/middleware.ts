import { NextRequest, NextResponse } from "next/server";

const publicAdminRoutes = ["/src/admin/auth", "/src/admin/login", "/src/admin/logout" , "/src/student/auth/signup" , "/src/student/auth/login", "/src/student/logout", "/src/teacher/auth/signup", "/src/teacher/auth/login" , "/src/teacher/logout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicAdminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/src/admin/:path*" , 
    "/src/student/:path*",
     "/src/teacher/:path*" ],
};