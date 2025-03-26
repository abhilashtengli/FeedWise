import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
import { NextResponse, type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("middleware execution started");
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token"
  });
  console.log("Token : " + token);
  console.log("middleware execution ended");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|static|public).*)"]
};
