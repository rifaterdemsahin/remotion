import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { z } from 'zod';
import { TitleScene } from './TitleScene';
import { VisionScene } from './VisionScene';
import { GrowthScene } from './GrowthScene';
import { OutroScene } from './OutroScene';

export const missionVisionSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
});

export const MissionVisionMain: React.FC<z.infer<typeof missionVisionSchema>> = ({
  primaryColor,
  secondaryColor,
  accentColor,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a' }}>
      <Sequence from={0} durationInFrames={45}>
        <TitleScene 
          title="Our Mission" 
          subtitle="Empowering the Future" 
          primaryColor={primaryColor}
          image={staticFile("mission-bg.png")}
        />
      </Sequence>
      <Sequence from={35} durationInFrames={45}>
        <VisionScene 
           title="The Vision"
           text="An AI Skilled Workforce"
           secondaryColor={secondaryColor}
           image={staticFile("vision-workforce.png")}
        />
      </Sequence>
      <Sequence from={70} durationInFrames={45}>
        <GrowthScene 
           primaryColor={primaryColor}
           accentColor={accentColor}
           image={staticFile("growth-graph.png")}
        />
      </Sequence>
      <Sequence from={105} durationInFrames={45}>
         <OutroScene 
            accentColor={accentColor}
         />
      </Sequence>
    </AbsoluteFill>
  );
};
