import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { z } from "zod";

export const surplusValueSchema = z.object({
  titleColor: z.string(),
});

const ProcessStep = ({
  text,
  delay,
  color,
}: {
  text: string;
  delay: number;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame - delay, [0, 30], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        margin: "10px",
        padding: "20px",
        backgroundColor: color,
        borderRadius: "10px",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {text}
    </div>
  );
};

export const SurplusValueMain: React.FC<z.infer<typeof surplusValueSchema>> = ({
  titleColor,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: "bold",
          color: titleColor,
          marginBottom: 50,
        }}
      >
        Capitalist System
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ProcessStep text="Sales" delay={0} color="#3498db" />
        <ProcessStep text="Borrow" delay={20} color="#e74c3c" />
        <ProcessStep text="Spend" delay={40} color="#2ecc71" />
        <ProcessStep text="Pack" delay={60} color="#f1c40f" />
      </div>

      <div style={{ marginTop: 50, fontSize: 30, color: "#333" }}>
        <Sequence from={90}>Using Tools & Employees</Sequence>
      </div>

      <Sequence from={120}>
        <div
          style={{
            marginTop: 30,
            fontSize: 60,
            fontWeight: "bold",
            color: "#8e44ad",
            border: "5px solid #8e44ad",
            padding: "20px",
            borderRadius: "20px",
            transform: "rotate(-5deg)",
          }}
        >
          SURPLUS VALUE EXTRACTED
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
