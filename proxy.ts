import { NextResponse, type NextRequest } from "next/server"
import { decrypt } from "@/lib/admin-session"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/"

  const token = request.cookies.get("admin_session")?.value
  const session = await decrypt(token)

  if (isLoginPage) {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    return NextResponse.next()
  }

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}