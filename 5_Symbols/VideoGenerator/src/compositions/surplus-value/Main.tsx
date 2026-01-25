import React from "react";
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  interpolate, 
  spring, 
  useVideoConfig,
  Sequence,
  Audio,
  staticFile 
} from "remotion";
import { z } from "zod";

export const surplusValueSchema = z.object({
  titleColor: z.string(),
});

const items = [
  { label: "Sales", color: "#3498db", emoji: "🏷️" },
  { label: "Borrow", color: "#e74c3c", emoji: "🏦" },
  { label: "Spend", color: "#2ecc71", emoji: "💸" },
  { label: "Pack", color: "#f1c40f", emoji: "📦" },
];

const RADIUS = 350;
const CENTER_X = 1920 / 2;
const CENTER_Y = 1080 / 2;

const SurplusNode: React.FC<{
  index: number;
  label: string;
  emoji: string;
  color: string;
  total: number;
  delayStart: number;
}> = ({ index, label, emoji, color, total, delayStart }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate position
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
  const x = CENTER_X + RADIUS * Math.cos(angle);
  const y = CENTER_Y + RADIUS * Math.sin(angle);

  // Intro animation
  const scale = spring({
    frame: frame - delayStart,
    fps,
    config: { damping: 12 },
  });

  const contentOpacity = interpolate(
    frame - delayStart,
    [0, 10],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Surplus Value Animation (popping out)
  const surplusDelay = delayStart + 30;
  const surplusProgress = spring({
    frame: frame - surplusDelay,
    fps,
    config: { stiffness: 50 },
  });
  
  const surplusX = x + (RADIUS * 0.4) * Math.cos(angle) * surplusProgress;
  const surplusY = y + (RADIUS * 0.4) * Math.sin(angle) * surplusProgress;
  const surplusOpacity = interpolate(frame - surplusDelay, [0, 10], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <>
        {/* Audio Effects */}
        <Sequence from={delayStart}>
            <Audio src={staticFile("surplus-value-sounds/whoosh.mp3")} volume={0.5} />
        </Sequence>
        <Sequence from={surplusDelay}>
             <Audio src={staticFile("surplus-value-sounds/pop.mp3")} volume={0.8} />
        </Sequence>

        {/* Connection Line to next node (if not last, or loop back) */}
        <Arrow 
            startX={x} 
            startY={y} 
            endX={CENTER_X + RADIUS * Math.cos(((index + 1) / total) * 2 * Math.PI - Math.PI / 2)}
            endY={CENTER_Y + RADIUS * Math.sin(((index + 1) / total) * 2 * Math.PI - Math.PI / 2)}
            delay={delayStart + 15}
            color={color}
        />

        {/* Main Node */}
        <div
            style={{
            position: "absolute",
            left: x - 100, // Adjusted for larger width
            top: y - 80,
            width: 200, // Wider to fit text + emoji
            height: 160,
            borderRadius: "50%",
            backgroundColor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            transform: `scale(${scale})`,
            opacity: contentOpacity,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            zIndex: 10,
            }}
        >
            <div style={{ fontSize: 40, marginBottom: 5 }}>{emoji}</div>
            {label}
        </div>

        {/* Surplus Value Element */}
        <div
            style={{
                position: "absolute",
                left: surplusX - 40,
                top: surplusY - 40,
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#8e44ad",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                transform: `scale(${surplusProgress})`,
                opacity: surplusOpacity,
                zIndex: 5,
                border: "2px solid white",
                textAlign: "center",
                lineHeight: "1.1"
            }}
        >
            Surplus $$$
        </div>
    </>
  );
};

const Arrow: React.FC<{
    startX: number; 
    startY: number; 
    endX: number; 
    endY: number; 
    delay: number;
    color: string;
}> = ({startX, startY, endX, endY, delay, color}) => {
    const frame = useCurrentFrame();
    const progress = interpolate(frame - delay, [0, 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    if (progress <= 0) return null;

    // Adjust start and end to touch edge of circles (radius 80ish)
    const angle = Math.atan2(endY - startY, endX - startX);
    const offset = 90; // Slightly larger offset
    const sX = startX + offset * Math.cos(angle);
    const sY = startY + offset * Math.sin(angle);
    const eX = endX - offset * Math.cos(angle);
    const eY = endY - offset * Math.sin(angle);

    // Current interpolation
    const currX = sX + (eX - sX) * progress;
    const currY = sY + (eY - sY) * progress;

    return (
        <svg style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none"}}>
            <defs>
                <marker id={`arrow-${color}`} markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill={color} />
                </marker>
            </defs>
            <line 
                x1={sX} 
                y1={sY} 
                x2={currX} 
                y2={currY} 
                stroke={color} 
                strokeWidth="5" 
                markerEnd={progress >= 1 ? `url(#arrow-${color})` : undefined}
            />
        </svg>
    )
}

const IntroTitle = ({ titleColor }: { titleColor: string }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 40, 50], [0, 1, 0], { extrapolateRight: "clamp" });
    const scale = interpolate(frame, [0, 40], [0.5, 1.5], { extrapolateRight: "clamp" });
    
    // Remove from DOM after it fades out completely to avoid block
    if (frame > 60) return null;

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 100 }}>
             <div
                style={{
                    fontSize: 120,
                    fontWeight: "bold",
                    color: titleColor,
                    opacity,
                    transform: `scale(${scale})`,
                    textAlign: "center"
                }}
            >
                Capitalist System Cycle
            </div>
        </AbsoluteFill>
    )
}

export const SurplusValueMain: React.FC<z.infer<typeof surplusValueSchema>> = ({
  titleColor,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      
      <IntroTitle titleColor={titleColor} />

      {items.map((item, index) => (
        <SurplusNode
          key={item.label}
          index={index}
          label={item.label}
          emoji={item.emoji}
          color={item.color}
          total={items.length}
          delayStart={60 + index * 45} // Delay start to let intro finish
        />
      ))}
      
      {/* Center Text */}
      <AbsoluteFill style={{justifyContent: "center", alignItems: "center", pointerEvents: "none", zIndex: 0}}>
         <div style={{fontSize: 200, opacity: 0.05, fontWeight: "bold"}}>$$$</div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
