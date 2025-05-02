import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/api/auth/register",
  "/_next/",
];

interface JwtPayload {
  sub: number;
  role: string;
  exp?: number;
}

export function middleware(req: NextRequest) {
  const { cookies, nextUrl } = req;
  const { pathname } = nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let payload: JwtPayload | null = null;
  try {
    const decoded = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "role" in decoded
    ) {
      payload = decoded as JwtPayload;
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && payload?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon\\.ico).*)"],
};
