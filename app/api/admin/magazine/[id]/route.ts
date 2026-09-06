import { NextResponse } from "next/server";
import { getMagazinePageByIndex } from "@/app/admin/(dashboard)/magazine/_helpers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = Number(id);

  if (isNaN(index)) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  const result = getMagazinePageByIndex(index);
  if (!result) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(result.page);
}