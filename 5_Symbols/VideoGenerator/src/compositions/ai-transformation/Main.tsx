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

export const aiTransformSchema = z.object({
  titleColor: z.string(),
});

const Stage: React.FC<{
  index: number;
  emoji?: string;
  image?: string;
  title: string;
  subtitle: string;
  color: string;
  delay: number;
  details?: { emoji: string; text: string }[];
}> = ({ index, emoji, image, title, subtitle, color, delay, details }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame: frame - delay,
        fps,
        config: { damping: 14 }
    });

    const opacity = interpolate(frame - delay, [0, 10], [0, 1]);
    const translateY = interpolate(progress, [0, 1], [50, 0]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start", // changed from center to flex-start for layout
            marginBottom: 40,
            opacity,
            transform: `translateY(${translateY}px) scale(${progress})`,
            backgroundColor: "white",
            padding: "30px 40px",
            borderRadius: 30,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            width: "90%"
        }}>
            {/* Left: Emoji Circle */}
            <div style={{
                fontSize: 80,
                marginRight: 40,
                backgroundColor: color,
                width: 130,
                height: 130,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0
            }}>
                {emoji}
            </div>
            
            {/* Right: Content Column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                <div style={{ fontSize: 50, fontWeight: "bold", color: "#333" }}>
                    {index}. {title}
                </div>
                <div style={{ fontSize: 30, color: "#666", marginTop: 8 }}>
                    {subtitle}
                </div>
                
                {/* Image Section - Centered and Large */}
                {image && (
                    <div style={{ 
                        marginTop: 25, 
                        width: "100%", 
                        display: "flex", 
                        justifyContent: "center",
                        height: 300, // Fixed height container
                    }}>
                         <img 
                            src={image} 
                            style={{ 
                                height: "100%", 
                                maxWidth: "100%", 
                                objectFit: "contain",
                                borderRadius: 10
                            }} 
                            alt="" 
                        />
                    </div>
                )}

                {details && (
                    <div style={{ display: "flex", flexDirection: "row", marginTop: 20, flexWrap: "wrap" }}>
                        {details.map((item, i) => (
                            <div key={i} style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                marginRight: 20, 
                                backgroundColor: "#f0f0f0", 
                                padding: "8px 15px", 
                                borderRadius: 15 
                            }}>
                                <span style={{ fontSize: 24, marginRight: 8 }}>{item.emoji}</span>
                                <span style={{ fontSize: 20, fontWeight: "600", color: "#444" }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const AiTransformMain: React.FC<z.infer<typeof aiTransformSchema>> = ({
  titleColor,
}) => {
  return (
    <AbsoluteFill style={{ 
        backgroundColor: "#f5f6fa", 
        padding: "60px 80px", 
        justifyContent: "center", 
        alignItems: "center" 
    }}>
        <div style={{
            fontSize: 70, 
            fontWeight: "bold", 
            color: titleColor,
            marginBottom: 50,
            textAlign: "center",
            width: "100%"
        }}>
            AI Transformation Journey
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            
            <Sequence from={10}>
                <Audio src={staticFile("ai-transformation-sounds/whoosh.mp3")} volume={0.5} />
                <Stage 
                    index={1}
                    emoji="📊"
                    image={staticFile("ai-transformation-images/assessment_form.png")}
                    title="Assessments"
                    subtitle="Thorough assessments to identify professionals' current capabilities and areas for development."
                    color="#e1f5fe"
                    delay={0}
                />
            </Sequence>

            <Sequence from={70}>
                <Audio src={staticFile("ai-transformation-sounds/whoosh.mp3")} volume={0.5} /> 
                <Stage 
                    index={2}
                    emoji="🎓"
                    image={staticFile("ai-transformation-images/simulation_video.png")}
                    title="Simulations"
                    subtitle="Collaborative simulation workshops where participants work together to build AI agent solutions."
                    color="#fff3e0"
                    delay={0}
                />
            </Sequence>

            <Sequence from={130}>
                <Audio src={staticFile("ai-transformation-sounds/whoosh.mp3")} volume={0.5} />
                <Stage 
                    index={3}
                    emoji="🏆"
                    image={staticFile("ai-transformation-images/certification_badges.png")}
                    title="Certification"
                    subtitle="Certifies professionals as qualified pilots with specific focus on technical implementation expertise."
                    color="#e8f5e9"
                    delay={0}
                    details={[
                        { emoji: "🔹", text: "Basic (Delivery)" },
                        { emoji: "🛡️", text: "Enhanced (Security)" },
                        { emoji: "⚡", text: "Premium (SLA)" }
                    ]}
                />
            </Sequence>

        </div>
    </AbsoluteFill>
  );
};
