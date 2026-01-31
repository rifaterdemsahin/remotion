import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const OutroScene: React.FC<{
  accentColor: string;
}> = ({ accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12 },
  });
  
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'black', // Fade out to black
      }}
    >
      <h1
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '80px',
          fontWeight: 700,
          color: 'white',
          opacity,
          transform: `scale(${scale})`,
          textAlign: 'center',
        }}
      >
        <span style={{ color: accentColor }}>Ready?</span> Let's Build.
      </h1>
      
      <div style={{
          marginTop: '50px',
          opacity: interpolate(frame, [15, 30], [0, 1]),
      }}>
          {/* Logo placeholder or simple text */}
          <h2 style={{ color: '#64748b', fontSize: '30px', fontWeight: 400 }}>www.deliverypilot.net</h2>
      </div>
    </AbsoluteFill>
  );
};
