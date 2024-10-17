import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

const loggedInRoutes = ["/dashboard", '/inventory'];
const loggedOutRoutes = ["/auth/login"];

// The main middleware function
export default auth((req) => {
  const isAuthenticated = !!req.auth; // Check if the user is authenticated
  const { pathname } = req.nextUrl;

  if (
    !isAuthenticated &&
    loggedInRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL(`/auth/login`, req.nextUrl));
  }

  if (
    isAuthenticated &&
    loggedOutRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL(`/inventory`, req.nextUrl));
  }

  return NextResponse.next();
});
