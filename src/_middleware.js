import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const stripDefaultLocale = (str) => {
  const stripped = str.replace("/default", "");
  return stripped;
};

export function middleware(request) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes("/api/") &&
    request.nextUrl.locale === "default";

  const url = request.nextUrl.clone();

  return shouldHandleLocale
    ? NextResponse.redirect(
        `${url.origin}/en${stripDefaultLocale(request.nextUrl.pathname)}${
          request.nextUrl.search
        }`
      )
    : undefined;
}
