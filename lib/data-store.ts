import "server-only";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readJSON<T>(fileName: string, defaultValue: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) return defaultValue;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function writeJSON<T>(fileName: string, value: T): void {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  const tmpPath = filePath + ".tmp";
  fs.writeFileSync(tmpPath, JSON.stringify(value, null, 2), "utf-8");
  fs.renameSync(tmpPath, filePath);
}
