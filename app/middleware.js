// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";

export async function middleware(request) {
  const authToken = request.cookies.get("rc_token")

  if (authToken?.value === "") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/meetups/mainstage'],
};