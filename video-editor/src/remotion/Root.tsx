import { Composition } from "remotion";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  INTERVIEW_COMP_NAME,
  defaultInterviewProps,
} from "../../types/constants";
import { Main } from "./MyComp/Main";
import { NextLogo } from "./MyComp/NextLogo";
import { InterviewVideo } from "./InterviewComp/InterviewVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
      <Composition
        id={INTERVIEW_COMP_NAME}
        component={InterviewVideo}
        durationInFrames={Math.ceil(
          defaultInterviewProps.totalDurationSeconds * VIDEO_FPS,
        )}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultInterviewProps}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.ceil(props.totalDurationSeconds * VIDEO_FPS),
        })}
      />
    </>
  );
};
