import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const locale = url.locale === "default" ? "en" : url.locale;
  const pathname = decodeURI(url.pathname).toLowerCase();
  const isInternal = pathname.startsWith("/_next");

  console.log(
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

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|html|icons|images|locales|favicon.ico|sitemap.xml|sitemap-0.xml|robots.txt)(?!.*.js).*)",
  ],
};
