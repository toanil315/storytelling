import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN,
  BASE_HOST,
  BASE_URL,
  REFRESH_TOKEN,
} from "src/utils/constants";
import { Path } from "src/utils/Path";
import * as Sentry from "@sentry/nextjs";

export async function middleware(req: NextRequest) {
  try {
    const accessToken = req.cookies.get(ACCESS_TOKEN);
    const refreshToken = req.cookies.get(REFRESH_TOKEN);

    if (accessToken) return NextResponse.next();

    const result = await fetch(`${BASE_URL}/refresh-token`, {
      body: JSON.stringify({
        refreshToken,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();

    const response = NextResponse.next();
    response.headers.set(ACCESS_TOKEN, data.data.token);
    return response;
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.redirect(`${BASE_HOST}${Path.login}`);
  }
}

export const config = {
  matcher: ["/api/private/:path*"],
};
