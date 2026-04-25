import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const { image } = (await request.json()) as { image?: string };

  if (!image) {
    return Response.json({ error: "Missing image" }, { status: 400 });
  }

  const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const imagesDir = path.join(process.cwd(), "components", "images");
  const fileName = `capture-${Date.now()}.jpg`;

  await mkdir(imagesDir, { recursive: true });
  await writeFile(path.join(imagesDir, fileName), buffer);

  return Response.json({ saved: true, fileName });
}