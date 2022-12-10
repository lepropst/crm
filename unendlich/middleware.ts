import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    password:
      process.env.COOKIE_PASSWORD ||
      "complex_password_at_least_32_characters_long",
    cookieName: "unendlich_cookie",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  // do anything with session here:
  const { user } = session;

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  // demo:
  if (user === undefined) {
    // unauthorized to see pages inside admin/
    return NextResponse.redirect(new URL("/login", req.url)); // redirect to /unauthorized page
  }

  return res;
};

export const config = {
  matcher: [
    "/((?!login|_next/static|favicon.ico|api/.*).*)",
    "/((?!login|_next/static|favicon.ico|api/.*).*)/r",
  ],
};
