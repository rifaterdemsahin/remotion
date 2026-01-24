import React from "react";
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  interpolate, 
  spring, 
  useVideoConfig 
} from "remotion";
import { z } from "zod";

export const bayesSchema = z.object({
  titleColor: z.string(),
});

const Bar: React.FC<{
  label: string;
  value: number; // 0 to 1
  color: string;
  height: number;
  top: number;
  delay: number;
}> = ({ label, value, color, height, top, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const width = 800;
    
    const progress = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12 },
    });

    const currentWidth = width * value * progress;
    const opacity = interpolate(frame - delay, [0, 10], [0, 1]);

    return (
        <div style={{
            position: "absolute",
            left: (1920 - width) / 2,
            top,
            width: width,
            height: height + 50,
            display: "flex",
            flexDirection: "column",
            opacity
        }}>
            <div style={{fontSize: 32, marginBottom: 10, fontWeight: "bold", color: "#333"}}>{label}</div>
            <div style={{
                width: "100%",
                height,
                backgroundColor: "#eee",
                borderRadius: 10,
                overflow: "hidden"
            }}>
                <div style={{
                    width: currentWidth,
                    height: "100%",
                    backgroundColor: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    color: "white",
                    paddingRight: 20,
                    fontWeight: "bold",
                    fontSize: 24
                }}>
                   {Math.round(value * 100)}%
                </div>
            </div>
        </div>
    )
}

export const BayesianMain: React.FC<z.infer<typeof bayesSchema>> = ({
  titleColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation Sequence
  // 1. Prior (Start)
  // 2. Evidence/Likelihood (Update)
  // 3. Posterior (Result)

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
        <div style={{
            marginTop: 80, 
            textAlign: "center", 
            fontSize: 80, 
            fontWeight: "bold", 
            color: titleColor
        }}>
            Bayesian Logic
        </div>
        
        {/* Prior Probability */}
        <Bar 
            label="Prior Probability P(H) (Initial Belief)" 
            value={0.3} 
            color="#3498db" 
            height={60} 
            top={300} 
            delay={10} 
        />

        {/* Likelihood */}
        <Bar 
            label="Likelihood P(E|H) (New Evidence)" 
            value={0.8} 
            color="#e74c3c" 
            height={60} 
            top={500} 
            delay={50} 
        />

        {/* Calculating Animation (Formula) */}
        <div style={{
            position: "absolute",
            top: 700,
            width: "100%",
            textAlign: "center",
            fontSize: 40,
            opacity: interpolate(frame - 90, [0, 15], [0, 1]),
            transform: `translateY(${interpolate(frame - 90, [0, 15], [20, 0])}px)`
        }}>
            ⬇ Updating Belief...
        </div>

        {/* Posterior Probability */}
        <Bar 
            label="Posterior P(H|E) (Updated Belief)" 
            value={0.75} 
            color="#2ecc71" 
            height={60} 
            top={800} 
            delay={110} 
        />

    </AbsoluteFill>
  );
};
