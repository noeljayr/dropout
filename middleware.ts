import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKEN_NAME } from "./Constants/TOKEN_NAME";
import { jwtDecode } from "jwt-decode";
import { deleteCookie } from "cookies-next/server";

interface JwtPayload {
  exp: number;
  role: string;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value || "";

  // Redirect if trying to access /auth or /auth/
  if (
    request.nextUrl.pathname === "/auth" ||
    request.nextUrl.pathname === "/auth/"
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (request.nextUrl.pathname == ("/") ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // if (token) {
  //   try {
  //     const decoded = jwtDecode<JwtPayload>(token);
  //     const isExpired = decoded.exp * 1000 < Date.now();

  //     if (isExpired) {
  //       await deleteCookie(TOKEN_NAME);
  //       return NextResponse.redirect(new URL("/auth/login", request.url));
  //     }
  //   } catch (error) {
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }
  // }
}
