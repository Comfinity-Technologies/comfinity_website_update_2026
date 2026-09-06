import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { decrypt } from "@/lib/admin-session"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  // Verify admin session before allowing hash generation
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value
  const session = await decrypt(token)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { password } = await req.json()
  if (!password || typeof password !== "string" || password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
  }

  const hash = await bcrypt.hash(password, 10)
  return NextResponse.json({ hash })
}