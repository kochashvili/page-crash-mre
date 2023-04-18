import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes("/api/");
  const url = request.nextUrl;

  if (shouldHandleLocale) {
    const locale = url.locale === "default" ? "en" : url.locale;
    const pathname = decodeURI(url.pathname).toLowerCase();

    if (decodeURI(url.pathname) !== pathname || url.locale !== locale) {
      return NextResponse.redirect(
        encodeURI(`${url.origin}/${locale}${pathname}${url.search}`)
      );
    }
  }

  return NextResponse.next();
}
