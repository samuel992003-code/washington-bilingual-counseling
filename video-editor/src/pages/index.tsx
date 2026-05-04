import { Player } from "@remotion/player";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { z } from "zod";
import {
  InterviewCompositionProps,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { InterviewVideo } from "../remotion/InterviewComp/InterviewVideo";

type Step = "upload" | "transcript" | "narrative" | "preview";

interface Segment {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface NarrativeSection {
  title: string;
  startTime: number;
  endTime: number;
  summary: string;
}

interface NarrativeResult {
  sections: NarrativeSection[];
  overallNarrative: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const StepBadge: React.FC<{
  num: string | number;
  done: boolean;
  active: boolean;
}> = ({ num, done, active }) => (
  <span
    style={{
      background: done ? "#22c55e" : active ? "#0070f3" : "#ccc",
      color: "white",
      borderRadius: "50%",
      width: 28,
      height: 28,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      fontWeight: "bold",
      flexShrink: 0,
    }}
  >
    {done ? "✓" : num}
  </span>
);

const Home: NextPage = () => {
  const [step, setStep] = useState<Step>("upload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [fullText, setFullText] = useState("");
  const [narrative, setNarrative] = useState<NarrativeResult | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Please select a video or audio file first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("video", file);

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as {
        videoUrl?: string;
        text?: string;
        segments?: Segment[];
        error?: string;
      };

      if (!res.ok) throw new Error(data.error ?? "Transcription failed");

      setVideoUrl(data.videoUrl ?? null);
      setSegments(data.segments ?? []);
      setFullText(data.text ?? "");
      setStep("transcript");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ segments, fullText }),
      });
      const data = (await res.json()) as NarrativeResult & { error?: string };

      if (!res.ok) throw new Error(data.error ?? "Analysis failed");

      setNarrative(data);
      setStep("narrative");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const totalDuration =
    segments.length > 0 ? segments[segments.length - 1].end : 60;

  const absoluteVideoUrl =
    videoUrl && typeof window !== "undefined"
      ? `${window.location.origin}${videoUrl}`
      : "";

  const playerProps: z.infer<typeof InterviewCompositionProps> = {
    videoSrc: absoluteVideoUrl,
    segments,
    narrativeSections: narrative?.sections ?? [],
    totalDurationSeconds: totalDuration,
  };

  const after = (s: Step) => {
    const order: Step[] = ["upload", "transcript", "narrative", "preview"];
    return order.indexOf(step) > order.indexOf(s);
  };

  const btn = (
    label: string,
    onClick: () => void,
    disabled = false,
  ): React.ReactElement => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: 8,
        padding: "12px 28px",
        fontSize: 15,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.65 : 1,
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );

  return (
    <div>
      <Head>
        <title>Interview Narrative Builder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "48px 24px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 6 }}>
          Interview Narrative Builder
        </h1>
        <p style={{ color: "#666", marginBottom: 48, fontSize: 15 }}>
          Upload an interview video → AI transcribes what&apos;s said → Claude
          builds a narrative structure → Preview with captions & chapter titles
        </p>

        {error && (
          <div
            style={{
              background: "#fff0f0",
              border: "1px solid #f8a",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 32,
              color: "#c00",
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {/* ── Step 1: Upload ── */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 18,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <StepBadge
              num={1}
              done={after("upload")}
              active={step === "upload"}
            />
            Upload Interview Video
          </h2>

          {step === "upload" && (
            <div
              style={{
                border: "2px dashed #d0d0d0",
                borderRadius: 12,
                padding: "36px 32px",
                textAlign: "center",
              }}
            >
              <input
                ref={fileRef}
                type="file"
                accept="video/*,audio/*"
                style={{ display: "block", margin: "0 auto 16px" }}
              />
              <p style={{ color: "#999", fontSize: 13, marginBottom: 24 }}>
                MP4, MOV, AVI, MP3, M4A, WAV — any video or audio file
              </p>
              {btn(
                loading ? "Uploading & Transcribing…" : "Upload & Transcribe",
                handleUpload,
                loading,
              )}
              <p style={{ color: "#bbb", fontSize: 12, marginTop: 12 }}>
                Transcription powered by OpenAI Whisper
              </p>
            </div>
          )}

          {after("upload") && (
            <p style={{ color: "#22c55e", fontSize: 14 }}>
              Video uploaded and transcribed successfully.
            </p>
          )}
        </section>

        {/* ── Step 2: Transcript ── */}
        {(step === "transcript" ||
          step === "narrative" ||
          step === "preview") && (
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 18,
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <StepBadge
                num={2}
                done={after("transcript")}
                active={step === "transcript"}
              />
              Transcript
            </h2>

            <div
              style={{
                background: "#f8f8f8",
                border: "1px solid #e8e8e8",
                borderRadius: 12,
                padding: "20px 24px",
                maxHeight: 320,
                overflowY: "auto",
                marginBottom: 20,
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {segments.length > 0 ? (
                segments.map((seg) => (
                  <div key={seg.id} style={{ marginBottom: 10 }}>
                    <span
                      style={{
                        color: "#aaa",
                        fontSize: 11,
                        fontFamily: "monospace",
                        marginRight: 8,
                      }}
                    >
                      [{formatTime(seg.start)} – {formatTime(seg.end)}]
                    </span>
                    {seg.text}
                  </div>
                ))
              ) : (
                <p style={{ color: "#666" }}>{fullText}</p>
              )}
            </div>

            {step === "transcript" &&
              btn(
                loading ? "Analyzing with Claude…" : "Generate Narrative",
                handleAnalyze,
                loading,
              )}
          </section>
        )}

        {/* ── Step 3: Narrative ── */}
        {(step === "narrative" || step === "preview") && narrative && (
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 18,
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <StepBadge
                num={3}
                done={after("narrative")}
                active={step === "narrative"}
              />
              Narrative Structure
            </h2>

            <div
              style={{
                background: "#f0f7ff",
                border: "1px solid #c5dff8",
                borderRadius: 12,
                padding: "18px 22px",
                marginBottom: 20,
              }}
            >
              <h3
                style={{ fontSize: 14, margin: "0 0 6px", color: "#0055cc" }}
              >
                Overall Narrative
              </h3>
              <p style={{ margin: 0, color: "#334", fontSize: 14, lineHeight: 1.6 }}>
                {narrative.overallNarrative}
              </p>
            </div>

            <div style={{ marginBottom: 24 }}>
              {narrative.sections.map((sec, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    border: "1px solid #eee",
                    borderRadius: 10,
                    padding: "14px 18px",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <strong style={{ fontSize: 15 }}>{sec.title}</strong>
                    <span
                      style={{
                        color: "#999",
                        fontSize: 12,
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatTime(sec.startTime)} – {formatTime(sec.endTime)}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#666",
                      fontSize: 13,
                      margin: "6px 0 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {sec.summary}
                  </p>
                </div>
              ))}
            </div>

            {step === "narrative" &&
              btn("Preview Video", () => setStep("preview"))}
          </section>
        )}

        {/* ── Step 4: Preview ── */}
        {step === "preview" && videoUrl && (
          <section>
            <h2
              style={{
                fontSize: 18,
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <StepBadge num={4} done={false} active={true} />
              Preview
            </h2>

            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 28px rgba(0,0,0,0.14)",
                marginBottom: 20,
              }}
            >
              <Player
                component={InterviewVideo}
                inputProps={playerProps}
                durationInFrames={Math.max(
                  1,
                  Math.ceil(totalDuration * VIDEO_FPS),
                )}
                fps={VIDEO_FPS}
                compositionWidth={VIDEO_WIDTH}
                compositionHeight={VIDEO_HEIGHT}
                style={{ width: "100%" }}
                controls
              />
            </div>

            <p style={{ color: "#888", fontSize: 13 }}>
              To export as MP4: run{" "}
              <code
                style={{
                  background: "#f0f0f0",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                npm run remotion
              </code>{" "}
              in the <code style={{ background: "#f0f0f0", padding: "2px 6px", borderRadius: 4 }}>video-editor</code> directory to open Remotion Studio, then render the{" "}
              <strong>InterviewComp</strong> composition.
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
