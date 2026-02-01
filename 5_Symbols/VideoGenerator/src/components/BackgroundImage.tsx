import { AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';

interface BackgroundImageProps {
  src: string;
  opacity?: number;
  blur?: number;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  src, 
  opacity = 0.3,
  blur = 0 
}) => {
  const frame = useCurrentFrame();
  
  const fadeInOpacity = interpolate(
    frame,
    [0, 30],
    [0, opacity],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ zIndex: -1 }}>
      <Img 
        src={src} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          opacity: fadeInOpacity,
          filter: blur > 0 ? `blur(${blur}px)` : 'none'
        }} 
      />
    </AbsoluteFill>
  );
};
