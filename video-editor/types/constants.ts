import { z } from "zod";
export const COMP_NAME = "MyComp";

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Next.js and Remotion",
};

export const DURATION_IN_FRAMES = 200;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

// Interview composition
export const INTERVIEW_COMP_NAME = "InterviewComp";

export const TranscriptSegment = z.object({
  id: z.number(),
  start: z.number(),
  end: z.number(),
  text: z.string(),
});

export const NarrativeSection = z.object({
  title: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  summary: z.string(),
});

export const InterviewCompositionProps = z.object({
  videoSrc: z.string(),
  segments: z.array(TranscriptSegment),
  narrativeSections: z.array(NarrativeSection),
  totalDurationSeconds: z.number(),
});

export const defaultInterviewProps: z.infer<typeof InterviewCompositionProps> = {
  videoSrc: "",
  segments: [],
  narrativeSections: [],
  totalDurationSeconds: 60,
};
