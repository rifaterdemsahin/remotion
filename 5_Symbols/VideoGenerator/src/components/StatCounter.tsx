import { useCurrentFrame, interpolate } from 'remotion';

interface StatCounterProps {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export const StatCounter: React.FC<StatCounterProps> = ({ 
  from, 
  to, 
  suffix = '', 
  prefix = '',
  delay = 0, 
  duration = 60,
  style = {} 
}) => {
  const frame = useCurrentFrame();
  
  const count = Math.floor(
    interpolate(
      frame,
      [delay, delay + duration],
      [from, to],
      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    )
  );
  
  const opacity = interpolate(
    frame,
    [delay, delay + 15],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <div
      style={{
        opacity,
        fontSize: '120px',
        fontWeight: 900,
        fontFamily: 'Inter, sans-serif',
        color: '#007bff',
        textAlign: 'center',
        ...style,
      }}
    >
      {prefix}{count}{suffix}
    </div>
  );
};
