import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";

interface Segment {
  id: number;
  start: number;
  end: number;
  text: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { segments, fullText } = req.body as {
    segments: Segment[];
    fullText: string;
  };

  if (!segments?.length && !fullText) {
    return res.status(400).json({ error: "No transcript provided" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res
      .status(500)
      .json({ error: "ANTHROPIC_API_KEY is not configured in .env.local" });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const transcriptWithTimestamps = segments
    .map((s) => `[${formatTime(s.start)} – ${formatTime(s.end)}] ${s.text}`)
    .join("\n");

  const prompt = `You are analyzing an interview transcript to create a compelling narrative structure for a documentary-style video.

Here is the transcript with timestamps:
${transcriptWithTimestamps}

Analyze this interview and identify 3–7 key narrative sections — themes, story beats, or meaningful topic shifts.

For each section:
- Write a compelling, descriptive title (not just a topic label — make it evocative)
- Use exact start/end times in seconds from the transcript
- Write a 1–2 sentence summary of what's covered

Also write an overall narrative summary of the interview (2–3 sentences) that could serve as an introduction or chapter summary.

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "sections": [
    {
      "title": "string",
      "startTime": number,
      "endTime": number,
      "summary": "string"
    }
  ],
  "overallNarrative": "string"
}`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response from Claude");
    }

    const result = JSON.parse(content.text) as unknown;
    return res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    return res.status(500).json({ error: message });
  }
}
