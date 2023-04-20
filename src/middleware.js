import { NextResponse } from "next/server";
import logger from "services/logger";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const url = request.nextUrl;
  const locale = url.locale === "default" ? "en" : url.locale;
  const pathname = decodeURI(url.pathname).toLowerCase();
  const isInternal = pathname.startsWith("/_next") || PUBLIC_FILE.test(pathname)

  logger.info(
    `mdw req url: ${url}, pathname: ${pathname}, it starts with _next: ${pathname.startsWith(
      "/_next"
    )}`
  );

  if (
    !isInternal &&
    (decodeURI(url.pathname) !== pathname || url.locale !== locale)
  ) {
    return NextResponse.redirect(
      encodeURI(`${url.origin}/${locale}${pathname}${url.search}`)
    );
  }

  return NextResponse.next();
}
