import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/admin-session";
import { isCloudinaryConfigured, uploadBufferToCloudinary } from "@/lib/cloudinary";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  // Check admin auth
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = await decrypt(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "comfinity/magazine";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try Cloudinary if configured
    if (isCloudinaryConfigured) {
      try {
        const cloudinaryUrl = await uploadBufferToCloudinary(buffer, folder);
        return NextResponse.json({
          url: cloudinaryUrl,
          provider: "cloudinary",
          success: true,
        });
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, falling back to local:", cloudErr);
      }
    }

    // 2. Local file fallback if Cloudinary is not configured or fails
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
    const uniqueName = `${Date.now()}_${cleanName}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, uniqueName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    return NextResponse.json({
      url: publicUrl,
      provider: "local",
      success: true,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}