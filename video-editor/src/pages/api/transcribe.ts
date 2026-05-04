import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    cb(null, `${uid}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  fn: Function,
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) reject(result);
      else resolve();
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await runMiddleware(req, res, upload.single("video"));

    const file = (req as NextApiRequest & { file?: Express.Multer.File }).file;
    if (!file) {
      return res.status(400).json({ error: "No video file provided" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res
        .status(500)
        .json({ error: "OPENAI_API_KEY is not configured in .env.local" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(file.path),
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["segment"],
    });

    return res.status(200).json({
      videoUrl: `/uploads/${file.filename}`,
      text: transcription.text,
      // verbose_json returns segments; the SDK types may not expose them but they exist at runtime
      segments:
        (transcription as unknown as { segments?: unknown[] }).segments ?? [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transcription failed";
    return res.status(500).json({ error: message });
  }
}
