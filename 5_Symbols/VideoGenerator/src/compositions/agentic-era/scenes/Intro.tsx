import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { TextReveal } from '../../../components/TextReveal';
import { StatCounter } from '../../../components/StatCounter';
import { COLORS } from '../../../utils/constants';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  // Background glow animation
  const glowOpacity = interpolate(
    frame,
    [0, 60, 150, 180],
    [0, 0.8, 0.8, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );
  
  const glowScale = spring({
    frame,
    fps: 30,
    from: 0.5,
    to: 1.5,
    config: { damping: 100, mass: 2 }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Animated background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${glowScale})`,
        width: width * 0.8,
        height: height * 0.8,
        background: `radial-gradient(circle, ${COLORS.primary}40 0%, transparent 70%)`,
        filter: 'blur(100px)',
        opacity: glowOpacity,
      }} />
      
      {/* Neural network grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${COLORS.primary}20 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.primary}20 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: interpolate(frame, [0, 30], [0, 0.1], { extrapolateRight: 'clamp' })
      }} />

      {/* Main content */}
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px',
        textAlign: 'center'
      }}>
        {/* Main quote */}
        <TextReveal 
          delay={20}
          duration={40}
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: 'white',
            maxWidth: '1400px',
            lineHeight: 1.3,
            marginBottom: '80px',
            textShadow: `0 0 30px ${COLORS.primary}50`
          }}
        >
          If you're still just typing prompts into a chatbot, you're using a Ferrari to drive to the grocery store.
        </TextReveal>
        
        {/* Ferrari vs Grocery metaphor visual hint */}
        <div style={{
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          fontSize: '48px',
          marginBottom: '60px'
        }}>
          🏎️ → 🏪
        </div>
        
        {/* Stat counter */}
        <StatCounter 
          from={0}
          to={240}
          suffix="+"
          delay={90}
          duration={60}
          style={{
            fontSize: '140px',
            background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.cyan})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        />
        
        <TextReveal
          delay={100}
          duration={30}
          style={{
            fontSize: '56px',
            fontWeight: 600,
            color: COLORS.textLight,
            marginTop: '20px'
          }}
        >
          workflows running autonomously
        </TextReveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
