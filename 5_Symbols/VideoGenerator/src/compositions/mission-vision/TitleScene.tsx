import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';

export const TitleScene: React.FC<{
  title: string;
  subtitle: string;
  primaryColor: string;
  image?: string;
}> = ({ title, subtitle, primaryColor, image }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1]);
  const titleY = spring({
    frame: frame,
    fps,
    from: 50,
    to: 0,
    config: { damping: 12 },
  });

  const subtitleOpacity = interpolate(frame, [10, 30], [0, 1]);
  const subtitleY = spring({
    frame: frame - 10,
    fps,
    from: 30,
    to: 0,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: -1 }}>
         {/* Background Image */}
         {image && (
            <AbsoluteFill>
                <Img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
            </AbsoluteFill>
         )}
         {/* Background Glow */}
         <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: width * 0.8,
            height: height * 0.8,
            background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 70%)`,
            filter: 'blur(50px)',
         }} />
      </div>

      <h1
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '120px',
          fontWeight: 900,
          color: 'white',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
          lineHeight: 1.1,
          margin: 0,
          background: `linear-gradient(to right, #ffffff, ${primaryColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: `0 0 50px ${primaryColor}50`,
        }}
      >
        {title}
      </h1>
      <h2
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '60px',
          fontWeight: 300,
          color: '#cbd5e1',
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          marginTop: '40px',
          textAlign: 'center',
        }}
      >
        {subtitle}
      </h2>
    </AbsoluteFill>
  );
};
