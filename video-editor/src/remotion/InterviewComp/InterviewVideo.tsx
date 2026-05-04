import { AbsoluteFill, OffthreadVideo, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import {
  InterviewCompositionProps,
  NarrativeSection,
  TranscriptSegment,
} from "../../../types/constants";

export const InterviewVideo = ({
  videoSrc,
  segments,
  narrativeSections,
}: z.infer<typeof InterviewCompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSeconds = frame / fps;

  const currentSegment = segments.find(
    (seg: z.infer<typeof TranscriptSegment>) =>
      currentSeconds >= seg.start && currentSeconds < seg.end,
  );

  const currentSection = narrativeSections.find(
    (sec: z.infer<typeof NarrativeSection>) =>
      currentSeconds >= sec.startTime && currentSeconds < sec.endTime,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {videoSrc && (
        <OffthreadVideo
          src={videoSrc}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      )}

      {currentSection && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
            color: "white",
            padding: "20px 32px",
            fontFamily: "sans-serif",
            fontSize: 26,
            fontWeight: "bold",
            letterSpacing: "-0.3px",
          }}
        >
          {currentSection.title}
        </div>
      )}

      {currentSegment && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            right: 60,
            background: "rgba(0,0,0,0.78)",
            color: "white",
            padding: "14px 24px",
            borderRadius: 8,
            fontFamily: "sans-serif",
            fontSize: 22,
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          {currentSegment.text.trim()}
        </div>
      )}
    </AbsoluteFill>
  );
};
