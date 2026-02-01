import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface SplitScreenProps {
  left: React.ReactNode;
  right: React.ReactNode;
  delay?: number;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({ left, right, delay = 0 }) => {
  const frame = useCurrentFrame();
  
  const leftOpacity = interpolate(
    frame,
    [delay, delay + 30],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );
  
  const rightOpacity = interpolate(
    frame,
    [delay + 15, delay + 45],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ 
        flex: 1, 
        opacity: leftOpacity,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px'
      }}>
        {left}
      </div>
      <div style={{ 
        width: '2px', 
        background: 'linear-gradient(to bottom, transparent, #007bff, transparent)',
        opacity: rightOpacity
      }} />
      <div style={{ 
        flex: 1, 
        opacity: rightOpacity,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px'
      }}>
        {right}
      </div>
    </AbsoluteFill>
  );
};
