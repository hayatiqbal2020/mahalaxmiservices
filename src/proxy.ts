import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/env";

// Pages under /admin that work without being signed in.
const PUBLIC = [
  "/admin/login",
  "/admin/signup",
  "/admin/forgot-password",
  "/admin/reset-password",
  "/admin/signout",
];

// Runs only for /admin: keeps the login session fresh and sends visitors who
// are not signed in to the login page. The real permission check is
// requireAdmin() plus the database rules; this is the fast first gate.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const to = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = "";
    return NextResponse.redirect(url);
  };

  if (pathname === "/admin") return to("/admin/dashboard");
  if (!supabaseConfigured) {
    return PUBLIC.includes(pathname) ? NextResponse.next() : to("/admin/login");
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(list) {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });
  // Checks the login token on this server (and renews it when it has expired)
  // without calling Supabase on every click.
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims && !PUBLIC.includes(pathname)) {
    const redirect = to("/admin/login");
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }
  return response;
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
