import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';

export const VisionScene: React.FC<{
  title: string;
  text: string;
  secondaryColor: string;
  image?: string;
}> = ({ title, text, secondaryColor, image }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleEnter = spring({
    frame,
    fps,
    from: -50,
    to: 0,
    config: { damping: 12 },
  });
  
  const textScale = spring({
    frame: frame - 10,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 10 },
  });
  const textOpacity = interpolate(frame, [10, 30], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {image && (
         <AbsoluteFill style={{ zIndex: -1 }}>
              <Img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
          </AbsoluteFill>
      )}

      <h2
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '50px',
          fontWeight: 600,
          color: secondaryColor,
          marginBottom: '60px',
          opacity: interpolate(frame, [0, 15], [0, 1]),
          transform: `translateY(${titleEnter}px)`,
          textTransform: 'uppercase',
          letterSpacing: '4px',
        }}
      >
        {title}
      </h2>

      <div style={{ position: 'relative' }}>
          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '100px',
              fontWeight: 800,
              color: 'white',
              opacity: textOpacity,
              transform: `scale(${textScale})`,
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            {text}
          </h1>
            {/* Decoration line */}
            <div style={{
                width: '100%',
                height: '4px',
                background: secondaryColor,
                marginTop: '20px',
                transform: `scaleX(${interpolate(frame, [20, 40], [0, 1])})`,
                boxShadow: `0 0 20px ${secondaryColor}`,
            }} />
      </div>
    </AbsoluteFill>
  );
};

