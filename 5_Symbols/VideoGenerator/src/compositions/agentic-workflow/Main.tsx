import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { z } from 'zod';
import { Scene1_Intro } from './Scene1_Intro';
import { Scene2_Solution } from './Scene2_Solution';
import { Scene3_Gap } from './Scene3_Gap';
import { Scene4_Telegram } from './Scene4_Telegram';
import { SubtitleOverlay } from './SubtitleOverlay';

export const agenticWorkflowSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
});

export const AgenticWorkflowMain: React.FC<z.infer<typeof agenticWorkflowSchema>> = ({
  primaryColor,
  secondaryColor,
  accentColor,
}) => {
  // Frame durations based on script estimation (30fps)
  const SCENE_1_DURATION = 1200; // Intro
  const SCENE_2_DURATION = 2100; // Solution
  const SCENE_3_DURATION = 900;  // Gap
  const SCENE_4_DURATION = 1800; // Telegram
  const SCENE_5_DURATION = 1800; // Obsidian
  const SCENE_6_DURATION = 1800; // Blacklist
  const SCENE_7_DURATION = 1500; // MCP
  const SCENE_8_DURATION = 1800; // Closing

  // Timeline calc
  const START_2 = SCENE_1_DURATION;
  const START_3 = START_2 + SCENE_2_DURATION;
  const START_4 = START_3 + SCENE_3_DURATION;
  const START_5 = START_4 + SCENE_4_DURATION;
  const START_6 = START_5 + SCENE_5_DURATION;
  const START_7 = START_6 + SCENE_6_DURATION;
  const START_8 = START_7 + SCENE_7_DURATION;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      
      {/* Background Audio - Music would be here */}
      {/* <Audio src={staticFile("background-music.mp3")} volume={0.1} /> */}

      <Sequence from={0} durationInFrames={SCENE_1_DURATION}>
        <Scene1_Intro primaryColor={primaryColor} accentColor={accentColor} />
      </Sequence>

      <Sequence from={START_2} durationInFrames={SCENE_2_DURATION}>
        <Scene2_Solution primaryColor={primaryColor} secondaryColor={secondaryColor} />
      </Sequence>

      <Sequence from={START_3} durationInFrames={SCENE_3_DURATION}>
        <Scene3_Gap primaryColor={primaryColor} />
      </Sequence>

      <Sequence from={START_4} durationInFrames={SCENE_4_DURATION}>
         {/* Renamed to reflect logical order */}
        <Scene4_Telegram primaryColor={primaryColor} />
      </Sequence>
      
      {/* Placeholders for remaining scenes */}
       <Sequence from={START_5} durationInFrames={SCENE_5_DURATION + SCENE_6_DURATION}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
           <h1 style={{color: 'white'}}>Scenes 5-8 Work in Progress</h1>
           <p style={{color: 'gray'}}>Obsidian, Blacklist, MCP, Closing</p>
        </AbsoluteFill>
      </Sequence>

      <SubtitleOverlay />
    </AbsoluteFill>
  );
};
