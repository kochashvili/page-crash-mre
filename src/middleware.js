import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const locale = url.locale === "default" ? "en" : url.locale;
  const pathname = decodeURI(url.pathname).toLowerCase();

  if (decodeURI(url.pathname) !== pathname || url.locale !== locale) {
    return NextResponse.redirect(encodeURI(`${url.origin}/${locale}${pathname}${url.search}`));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
