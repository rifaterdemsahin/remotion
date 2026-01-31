import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';

export const GrowthScene: React.FC<{
  primaryColor: string;
  accentColor: string;
  image?: string;
}> = ({ primaryColor, accentColor, image }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const growthEntrance = spring({
    frame,
    fps,
    from: 100,
    to: 0,
    config: { stiffness: 100 },
  });
  
  const prosperityEntrance = spring({
    frame: frame - 15,
    fps,
    from: 100,
    to: 0,
    config: { stiffness: 100 },
  });

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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h1
            style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '110px',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1,
            margin: 0,
            opacity: interpolate(frame, [0, 15], [0, 1]),
            transform: `translateY(${growthEntrance}px)`,
            }}
        >
            FUELING <span style={{ color: primaryColor }}>GROWTH</span>
        </h1>
        
        <h1
            style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '110px',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1,
            margin: 0,
            opacity: interpolate(frame, [15, 30], [0, 1]),
            transform: `translateY(${prosperityEntrance}px)`,
            }}
        >
            & <span style={{ color: accentColor }}>PROSPERITY</span>
        </h1>
      </div>

       {/* Floating particles or upward lines to signify growth */}
       <div style={{
           position: 'absolute',
           bottom: 0,
           left: 0,
           right: 0,
           height: '100%',
           width: '100%',
           zIndex: -1,
           overflow: 'hidden'
       }}>
            {new Array(10).fill(0).map((_, i) => {
                const speed = (i + 1) * 0.5;
                const offset = i * 200;
                const y = interpolate(frame * speed, [0, height], [height, -200], { extrapolateRight: 'wrap' });
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${offset + 100}px`,
                        top: y,
                        width: '2px',
                        height: '100px',
                        background: `linear-gradient(to top, transparent, ${i % 2 === 0 ? primaryColor : accentColor}, transparent)`,
                        opacity: 0.3
                    }} />
                );
            })}
       </div>
    </AbsoluteFill>
  );
};
