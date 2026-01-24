import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  random,
  Audio,
  staticFile
} from "remotion";
import { z } from "zod";

export const avalancheSchema = z.object({
  titleColor: z.string(),
});

const ShakeText: React.FC<{
  text: string;
  delay: number;
  color: string;
  fontSize?: number;
}> = ({ text, delay, color, fontSize = 100 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 200, damping: 10 },
  });

  const shakeX = random(frame) * 10 - 5;
  const shakeY = random(frame + 1) * 10 - 5;
  const opacity = interpolate(frame - delay, [0, 5], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        textAlign: "center",
        fontSize,
        fontWeight: 900,
        color,
        opacity,
        transform: `translate(${shakeX}px, ${shakeY}px) scale(${progress})`,
        textShadow: "4px 4px 0px rgba(0,0,0,0.5)",
      }}
    >
      {text}
    </div>
  );
};

const SnowParticles: React.FC = () => {
    const frame = useCurrentFrame();
    const particles = new Array(50).fill(0).map((_, i) => ({
        x: random(i) * 1920,
        y: (random(i + 100) * 1080 + frame * (10 + random(i) * 20)) % 1080,
        size: random(i + 200) * 10 + 2
    }));

    return (
        <AbsoluteFill>
            {particles.map((p, i) => (
                <div key={i} style={{
                    position: "absolute",
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    opacity: 0.8
                }} />
            ))}
        </AbsoluteFill>
    )
}

const GroundCrack: React.FC<{ delay: number }> = ({ delay }) => {
    const frame = useCurrentFrame();
    const progress = interpolate(frame - delay, [0, 30], [0, 100], { extrapolateRight: "clamp" });
    
    return (
        <svg  viewBox="0 0 1920 1080" style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <path 
                d="M0,1080 L400,900 L600,1000 L900,800 L1200,950 L1500,850 L1920,1080 Z" 
                fill="#2c3e50" 
                transform={`translate(0, ${100 - progress}%)`}
            />
             <path 
                d="M200,1080 L500,850 L700,950 L1000,750 L1300,900 L1600,800 L1800,1080 Z" 
                fill="#34495e" 
                transform={`translate(0, ${150 - progress}%)`}
                opacity={0.8}
            />
        </svg>
    )
}


export const AiAvalancheMain: React.FC<z.infer<typeof avalancheSchema>> = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a1a" }}>
      
      {/* Scene 1: Warning Red */}
      <Sequence from={0} durationInFrames={60}>
        <AbsoluteFill style={{ backgroundColor: "#c0392b", justifyContent: "center", alignItems: "center" }}>
            <ShakeText text="THIS IS AN" delay={0} color="white" />
            <div style={{marginTop: 150}}>
                 <ShakeText text="AI AVALANCHE" delay={10} color="white" fontSize={150} />
            </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Massive Force */}
      <Sequence from={60} durationInFrames={90}>
         <AbsoluteFill style={{ backgroundColor: "#2980b9" }}>
            <SnowParticles />
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                <div style={{fontSize: 60, color: "#ecf0f1", marginBottom: 50, fontWeight: "bold"}}>Not a gentle snowfall</div>
                <ShakeText text="MASSIVE FORCE" delay={20} color="white" fontSize={180} />
            </AbsoluteFill>
         </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Reshaping Ground */}
      <Sequence from={150} durationInFrames={90}>
          <AbsoluteFill style={{ backgroundColor: "#ecf0f1", justifyContent: "center", alignItems: "center" }}>
             <GroundCrack delay={10} />
             <div style={{ fontSize: 80, fontWeight: "bold", color: "#2c3e50", zIndex: 10, textAlign: "center", maxWidth: 1400 }}>
                 Reshaping the ground <br/> beneath our feet
             </div>
          </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Punchline */}
      <Sequence from={240}>
           <AbsoluteFill style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
                <ShakeText text="NOBODY'S JOB" delay={0} color="#e74c3c" fontSize={120} />
                 <div style={{marginTop: 200}}>
                    <ShakeText text="IS SECURE" delay={15} color="#e74c3c" fontSize={180} />
                 </div>
           </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
