import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  random,
} from "remotion";
import { z } from "zod";

export const avalancheSchema = z.object({
  titleColor: z.string(),
});

// Intense shaking text with spring animation for impact
const ShakeText: React.FC<{
  text: string;
  delay: number;
  color: string;
  fontSize?: number;
  intensity?: number;
}> = ({ text, delay, color, fontSize = 100, intensity = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 300, damping: 12 },
  });

  const shakeX = random(frame) * intensity - intensity / 2;
  const shakeY = random(frame + 1) * intensity - intensity / 2;
  const rotation = random(frame + 2) * 2 - 1;
  const opacity = interpolate(frame - delay, [0, 3], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        textAlign: "center",
        fontSize,
        fontWeight: 900,
        fontFamily: "'Impact', 'Arial Black', sans-serif",
        color,
        opacity,
        transform: `translate(${shakeX}px, ${shakeY}px) scale(${progress}) rotate(${rotation}deg)`,
        textShadow: `
          4px 4px 0px rgba(0,0,0,0.8),
          8px 8px 20px rgba(0,0,0,0.5)
        `,
        letterSpacing: "0.05em",
      }}
    >
      {text}
    </div>
  );
};

// Slam text animation - drops from top with heavy impact
const SlamText: React.FC<{
  text: string;
  delay: number;
  color: string;
  fontSize?: number;
}> = ({ text, delay, color, fontSize = 100 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drop = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 400, damping: 15 },
  });

  const translateY = interpolate(drop, [0, 1], [-500, 0]);
  const scale = interpolate(drop, [0.8, 1], [1.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = interpolate(frame - delay, [0, 2], [0, 1], { extrapolateRight: "clamp" });
  
  // Impact shake after landing
  const impactShake = frame - delay > 8 ? (random(frame) * 6 - 3) : 0;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        textAlign: "center",
        fontSize,
        fontWeight: 900,
        fontFamily: "'Impact', 'Arial Black', sans-serif",
        color,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale}) translateX(${impactShake}px)`,
        textShadow: `
          0 0 40px ${color},
          4px 4px 0px rgba(0,0,0,0.9),
          8px 8px 30px rgba(0,0,0,0.6)
        `,
        letterSpacing: "0.1em",
      }}
    >
      {text}
    </div>
  );
};

// Snow particles that blow away
const SnowParticles: React.FC<{ blowAway?: boolean }> = ({ blowAway = false }) => {
  const frame = useCurrentFrame();
  const particles = new Array(80).fill(0).map((_, i) => {
    const baseX = random(i) * 1080;
    const baseY = random(i + 100) * 1920;
    
    // Blow away effect - particles move right and fade
    const blowOffset = blowAway ? frame * (20 + random(i) * 30) : 0;
    const blowOpacity = blowAway ? interpolate(frame, [0, 60], [0.9, 0], { extrapolateRight: "clamp" }) : 0.8;
    
    return {
      x: (baseX + blowOffset) % 1200,
      y: (baseY + frame * (5 + random(i) * 10)) % 2000 - 100,
      size: random(i + 200) * 8 + 3,
      opacity: blowOpacity,
    };
  });

  return (
    <AbsoluteFill>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: p.opacity,
            boxShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Animated ground cracking effect
const GroundCrack: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const crackProgress = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 20 },
  });

  const shakeIntensity = interpolate(frame - delay, [0, 10, 30], [0, 15, 3], { extrapolateRight: "clamp" });
  const shakeX = random(frame) * shakeIntensity - shakeIntensity / 2;

  return (
    <AbsoluteFill style={{ transform: `translateX(${shakeX}px)` }}>
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", width: "100%", height: "100%" }}>
        {/* Main crack lines */}
        <g style={{ opacity: crackProgress }}>
          <path
            d={`M540,1920 L${540 + crackProgress * 50},1600 L${540 - crackProgress * 30},1400 L${540 + crackProgress * 60},1100 L${540 - crackProgress * 40},800 L540,500`}
            stroke="#1a1a1a"
            strokeWidth={8 * crackProgress}
            fill="none"
            strokeLinecap="round"
          />
          {/* Secondary cracks */}
          <path
            d={`M${540 + crackProgress * 50},1600 L${640 + crackProgress * 40},1500`}
            stroke="#2a2a2a"
            strokeWidth={4 * crackProgress}
            fill="none"
          />
          <path
            d={`M${540 - crackProgress * 30},1400 L${440 - crackProgress * 50},1300`}
            stroke="#2a2a2a"
            strokeWidth={4 * crackProgress}
            fill="none"
          />
          <path
            d={`M${540 + crackProgress * 60},1100 L${680 + crackProgress * 30},1000`}
            stroke="#2a2a2a"
            strokeWidth={3 * crackProgress}
            fill="none"
          />
        </g>
        
        {/* Ground pieces separating */}
        <rect
          x={0}
          y={1700}
          width={540}
          height={220}
          fill="#3d3d3d"
          transform={`translate(${-crackProgress * 20}, ${crackProgress * 10}) rotate(${-crackProgress * 2}, 270, 1810)`}
        />
        <rect
          x={540}
          y={1700}
          width={540}
          height={220}
          fill="#4a4a4a"
          transform={`translate(${crackProgress * 20}, ${crackProgress * 15}) rotate(${crackProgress * 2}, 810, 1810)`}
        />
      </svg>
    </AbsoluteFill>
  );
};

// Warning flash effect
const WarningFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const flashOpacity = interpolate(
    frame % 10,
    [0, 3, 6, 10],
    [0.3, 0.1, 0.3, 0.1]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgba(255, 50, 50, ${flashOpacity})`,
        pointerEvents: "none",
      }}
    />
  );
};


export const AiAvalancheMain: React.FC<z.infer<typeof avalancheSchema>> = () => {
  const { fps } = useVideoConfig();
  
  // Timing based on specs: 0-2s, 2-5s, 5-8s, 8-11s at 30fps
  const scene1End = 2 * fps;      // 60 frames (0-2s)
  const scene2End = 5 * fps;      // 150 frames (2-5s)
  const scene3End = 8 * fps;      // 240 frames (5-8s)
  const scene4End = 11 * fps;     // 330 frames (8-11s)

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      
      {/* Scene 1: 0-2s - Warning Red with shaking "THIS IS AN AI AVALANCHE" */}
      <Sequence from={0} durationInFrames={scene1End}>
        <AbsoluteFill 
          style={{ 
            background: "linear-gradient(180deg, #8B0000 0%, #c0392b 50%, #a83232 100%)",
            justifyContent: "center", 
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <WarningFlash />
          
          {/* Warning stripes at top */}
          <div style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: 80,
            background: "repeating-linear-gradient(45deg, #000 0px, #000 40px, #FFD700 40px, #FFD700 80px)",
          }} />
          
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            gap: 40,
          }}>
            <ShakeText 
              text="THIS IS AN" 
              delay={0} 
              color="white" 
              fontSize={90}
              intensity={12}
            />
            <div style={{ marginTop: 120 }}>
              <ShakeText 
                text="AI AVALANCHE" 
                delay={8} 
                color="#FFD700" 
                fontSize={140}
                intensity={15}
              />
            </div>
          </div>
          
          {/* Warning stripes at bottom */}
          <div style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 80,
            background: "repeating-linear-gradient(-45deg, #000 0px, #000 40px, #FFD700 40px, #FFD700 80px)",
          }} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: 2-5s - "Not a gentle snowfall" -> particles blow away -> "MASSIVE FORCE" */}
      <Sequence from={scene1End} durationInFrames={scene2End - scene1End}>
        <AbsoluteFill 
          style={{ 
            background: "linear-gradient(180deg, #1a3a5c 0%, #2980b9 50%, #1e5f8a 100%)",
          }}
        >
          <SnowParticles blowAway={true} />
          
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            {/* "Not a gentle snowfall" text - fades out */}
            <Sequence durationInFrames={45}>
              <div style={{
                fontSize: 55,
                color: "#ecf0f1",
                fontWeight: "bold",
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                opacity: 0.9,
                textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
              }}>
                Not a gentle snowfall...
              </div>
            </Sequence>
            
            {/* "MASSIVE FORCE" appears after snowfall text */}
            <Sequence from={30}>
              <SlamText 
                text="MASSIVE" 
                delay={0} 
                color="white" 
                fontSize={160}
              />
              <div style={{ marginTop: 280 }}>
                <SlamText 
                  text="FORCE" 
                  delay={10} 
                  color="#e74c3c" 
                  fontSize={200}
                />
              </div>
            </Sequence>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: 5-8s - Ground cracking with "Reshaping the ground beneath our feet" */}
      <Sequence from={scene2End} durationInFrames={scene3End - scene2End}>
        <AbsoluteFill 
          style={{ 
            background: "linear-gradient(180deg, #bdc3c7 0%, #ecf0f1 30%, #d5d5d5 100%)",
            justifyContent: "center", 
            alignItems: "center",
          }}
        >
          <GroundCrack delay={5} />
          
          <div style={{ 
            fontSize: 65, 
            fontWeight: 900, 
            color: "#2c3e50", 
            zIndex: 10, 
            textAlign: "center", 
            maxWidth: 900,
            lineHeight: 1.3,
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            textShadow: "3px 3px 0px rgba(255,255,255,0.8)",
          }}>
            RESHAPING THE GROUND
            <br />
            <span style={{ fontSize: 55, color: "#7f8c8d" }}>
              BENEATH OUR FEET
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: 8-11s - Final punchline "NOBODY'S JOB IS SECURE" slams onto screen */}
      <Sequence from={scene3End} durationInFrames={scene4End - scene3End}>
        <AbsoluteFill 
          style={{ 
            backgroundColor: "#000000",
            justifyContent: "center", 
            alignItems: "center",
          }}
        >
          {/* Dramatic red vignette */}
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(139, 0, 0, 0.4) 100%)",
          }} />
          
          <SlamText 
            text="NOBODY'S JOB" 
            delay={0} 
            color="#e74c3c" 
            fontSize={100}
          />
          <div style={{ marginTop: 220 }}>
            <SlamText 
              text="IS SECURE" 
              delay={12} 
              color="#ffffff" 
              fontSize={150}
            />
          </div>
          
          {/* Period/dot for emphasis */}
          <Sequence from={25}>
            <div style={{
              position: "absolute",
              bottom: 350,
              fontSize: 200,
              color: "#e74c3c",
              fontWeight: 900,
            }}>
              .
            </div>
          </Sequence>
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
