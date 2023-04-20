import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const url = request.nextUrl;
  const locale = url.locale === "default" ? "en" : url.locale;
  const pathname = decodeURI(url.pathname).toLowerCase();
  const isInternal =
    pathname.startsWith("/_next") || PUBLIC_FILE.test(pathname);

  console.log(
    `mdw req url: ${url}, pathname: ${pathname}, isInternal: ${isInternal}`
  );

  if (
    !isInternal &&
    (decodeURI(url.pathname) !== pathname || url.locale !== locale)
  ) {
    return NextResponse.redirect(
      encodeURI(`${url.origin}/${locale}${pathname}${url.search}`)
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
