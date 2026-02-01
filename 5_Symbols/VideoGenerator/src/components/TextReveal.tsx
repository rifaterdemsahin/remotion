import { useCurrentFrame, interpolate, spring } from 'remotion';

interface TextRevealProps {
  children: string;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  delay = 0, 
  duration = 30,
  style = {} 
}) => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );
  
  const translateY = spring({
    frame: frame - delay,
    fps: 30,
    from: 30,
    to: 0,
    config: { damping: 12 },
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
