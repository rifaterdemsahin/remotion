import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { Search, Cpu, Medal } from "lucide-react";
import { z } from "zod";

export const ascSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(), // For Certify
});

const StepsContainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Layout calculations
  const startY = height * 0.2;
  const gapY = height * 0.25;

  return (
    <AbsoluteFill className="bg-slate-900 text-white font-sans">
        {/* Background Gradient */}
        <AbsoluteFill 
            style={{
                background: `linear-gradient(to bottom, #0f172a, #1e293b)`,
                zIndex: 0
            }}
        />
        
      <Sequence from={0} durationInFrames={270}>
        <Step
          index={1}
          icon={Search}
          title="ASSESS"
          subtitle="First, it is Assess"
          color="#38bdf8" // Sky blue
          yPos={startY}
          delay={0}
        />
      </Sequence>

      <Sequence from={90} durationInFrames={180}>
        <Connector
            startX={width / 2}
            startY={startY + 80} // Approx bottom of icon
            endX={width / 2}
            endY={startY + gapY - 80} // Approx top of next icon
            color="#a855f7" // Purple
            delay={0}
        />
        <Step
          index={2}
          icon={Cpu}
          title="SIMULATE"
          subtitle="Then Simulate"
          color="#a855f7" // Purple
          yPos={startY + gapY}
          delay={15} // Slight delay after arrow starts
        />
      </Sequence>

      <Sequence from={180} durationInFrames={90}>
        <Connector
            startX={width / 2}
            startY={startY + gapY + 80}
            endX={width / 2}
            endY={startY + gapY * 2 - 80}
            color="#fbbf24" // Amber/Gold
            delay={0}
        />
        <Step
          index={3}
          icon={Medal}
          title="CERTIFY"
          subtitle="Certify the ASC protocol"
          color="#fbbf24" // Amber/Gold
          yPos={startY + gapY * 2}
          delay={15}
        />
      </Sequence>
      
      {/* ProgressBar (Global 0-9s) */}
       <div style={{
           position: 'absolute',
           top: 40,
           left: 40,
           right: 40,
           height: 8,
           background: 'rgba(255,255,255,0.1)',
           borderRadius: 4,
           overflow: 'hidden',
           zIndex: 10
       }}>
           <div style={{
               height: '100%',
               width: `${Math.min((frame / 270) * 100, 100)}%`,
               background: '#38bdf8',
               borderRadius: 4
           }} />
       </div>
    </AbsoluteFill>
  );
};

const Step: React.FC<{
  index: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  yPos: number;
  delay: number;
}> = ({ index, icon: Icon, title, subtitle, color, yPos, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const scale = interpolate(enter, [0, 1], [0, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: yPos,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
        zIndex: 5
      }}
    >
        <div style={{
            background: `rgba(255,255,255,0.05)`,
            padding: 40,
            borderRadius: '50%',
            border: `4px solid ${color}`,
            boxShadow: `0 0 30px ${color}40`,
            marginBottom: 20
        }}>
            <Icon size={80} color={color} strokeWidth={2} />
        </div>
      
      <h2 style={{ 
          fontSize: 60, 
          fontWeight: "bold", 
          margin: 0,
          color: 'white',
          textShadow: '0 4px 10px rgba(0,0,0,0.5)'
      }}>
        <span style={{color: color, marginRight: 15}}>{index}.</span>
        {title}
      </h2>
      <p style={{
          fontSize: 32,
          color: '#cbd5e1',
          marginTop: 10
      }}>"{subtitle}"</p>
    </div>
  );
};

const Connector: React.FC<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
    delay: number;
}> = ({ startX, startY, endX, endY, color, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    // Calculate path length
    const height = endY - startY;

    // Animate drawing
    const progress = spring({
        frame: frame - delay,
        fps,
        config: { stiffness: 50 }
    });
    
    // Draw straight line down
    return (
        <svg style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none'
        }}>
            <line 
                x1={startX} 
                y1={startY} 
                x2={endX} 
                y2={endY} 
                stroke={color} 
                strokeWidth={6} 
                strokeDasharray={height}
                strokeDashoffset={height * (1 - progress)}
                strokeLinecap="round"
            />
             {/* Arrowhead */}
             <path
                d={`M ${endX - 10} ${endY - 15} L ${endX} ${endY} L ${endX + 10} ${endY - 15}`}
                stroke={color}
                strokeWidth={6}
                fill="none"
                opacity={progress > 0.8 ? (progress - 0.8) * 5 : 0} // Fade in at end
                transform={`translate(0, ${interpolate(progress, [0, 1], [-20, 0])})`}
             />
        </svg>
    )
}

const EndCard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    const opacity = spring({
        frame,
        fps,
        config: { mass: 0.5 }
    });
    
    const up = interpolate(opacity, [0, 1], [50, 0]);
    
    return (
        <AbsoluteFill style={{
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0f172a',
            color: 'white',
            zIndex: 20,
            opacity
        }}>
             <h1 style={{
                 fontSize: 70,
                 textAlign: 'center',
                 maxWidth: '80%',
                 transform: `translateY(${up}px)`,
                 lineHeight: 1.2
             }}>
                 Engineering Mindset<br/>
                 <span style={{color: '#38bdf8'}}>For Your Career</span>
             </h1>
        </AbsoluteFill>
    )
}

export const AscProtocolMain: React.FC = () => {
  return (
    <AbsoluteFill className="bg-slate-900">
      <Sequence from={0} durationInFrames={270}>
        <StepsContainer />
      </Sequence>
      <Sequence from={270}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
