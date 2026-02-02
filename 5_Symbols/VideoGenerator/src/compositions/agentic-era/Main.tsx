import { AbsoluteFill, Sequence } from 'remotion';
import { z } from 'zod';
import { IntroScene } from './scenes/Intro';
import { ProblemScene } from './scenes/Problem';
import { SystemScene } from './scenes/System';
import { TransformationScene } from './scenes/Transformation';
import { ClosureScene } from './scenes/Closure';
import { TIMING } from '../../utils/constants';

export const agenticEraSchema = z.object({
  titleColor: z.string().optional(),
});

export const AgenticEraMain: React.FC<z.infer<typeof agenticEraSchema>> = () => {
  // Convert seconds to frames (30 FPS)
  const toFrames = (seconds: number) => seconds * TIMING.FPS;
  
  return (
    <AbsoluteFill>
      {/* Scene 1: Intro/Hook (0-90s) */}
      <Sequence from={0} durationInFrames={toFrames(TIMING.INTRO)}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Problem Statement (90-180s) */}
      <Sequence 
        from={toFrames(TIMING.INTRO)} 
        durationInFrames={toFrames(TIMING.PROBLEM)}
      >
        <ProblemScene />
      </Sequence>

      {/* Scene 3: System Overview (180-330s) */}
      <Sequence 
        from={toFrames(TIMING.INTRO + TIMING.PROBLEM)} 
        durationInFrames={toFrames(TIMING.SYSTEM)}
      >
        <SystemScene />
      </Sequence>

      {/* Scene 4: Transformation (330-480s) */}
      <Sequence 
        from={toFrames(TIMING.INTRO + TIMING.PROBLEM + TIMING.SYSTEM)} 
        durationInFrames={toFrames(TIMING.TRANSFORMATION)}
      >
        <TransformationScene />
      </Sequence>

      {/* Scene 5: Closure/CTA (480-600s) */}
      <Sequence 
        from={toFrames(TIMING.INTRO + TIMING.PROBLEM + TIMING.SYSTEM + TIMING.TRANSFORMATION)} 
        durationInFrames={toFrames(TIMING.CLOSURE)}
      >
        <ClosureScene />
      </Sequence>
    </AbsoluteFill>
  );
};
