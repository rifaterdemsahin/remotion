import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { TextReveal } from '../../../components/TextReveal';
import { COLORS } from '../../../utils/constants';

export const ClosureScene: React.FC = () => {
  const frame = useCurrentFrame();
  
  const glowOpacity = interpolate(
    frame,
    [0, 40, 80, 120],
    [0, 1, 1, 0.3],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Background gradient glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at center, ${COLORS.primary}30 0%, transparent 70%)`,
        opacity: glowOpacity,
      }} />

      {/* Main quote */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1600px',
        textAlign: 'center'
      }}>
        <TextReveal
          delay={20}
          duration={50}
          style={{
            fontSize: '84px',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.2,
            textShadow: `0 0 40px ${COLORS.primary}80`,
            marginBottom: '60px'
          }}
        >
          "AI isn't coming for your job,
        </TextReveal>
        
        <TextReveal
          delay={50}
          duration={50}
          style={{
            fontSize: '84px',
            fontWeight: 900,
            background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.cyan}, ${COLORS.purple})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2,
            textShadow: `0 0 40px ${COLORS.primary}80`,
          }}
        >
          but the person managing 240 agents might be."
        </TextReveal>
      </div>

      {/* Mission statement */}
      <div style={{
        position: 'absolute',
        bottom: '280px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        textAlign: 'center',
        maxWidth: '1400px'
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: 600,
          color: COLORS.textLight,
          lineHeight: 1.5,
          marginBottom: '40px'
        }}>
          The future belongs to those who can orchestrate<br/>
          autonomous systems at scale.
        </div>
        <div style={{
          fontSize: '40px',
          color: COLORS.cyan,
          fontWeight: 700
        }}>
          Start building your agent army today.
        </div>
      </div>

      {/* Call to action */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center'
      }}>
        {/* Subscribe prompt */}
        <div style={{
          opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          fontSize: '36px',
          fontWeight: 700,
          color: 'white',
          marginBottom: '20px'
        }}>
          👍 Subscribe for more agent system blueprints
        </div>
        
        {/* Comment prompt */}
        <div style={{
          opacity: interpolate(frame, [110, 130], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          fontSize: '32px',
          color: COLORS.textLight,
          backgroundColor: COLORS.darkGray,
          padding: '20px 50px',
          borderRadius: '15px',
          border: `2px solid ${COLORS.primary}`,
          display: 'inline-block'
        }}>
          💬 Comment: What are your skill gaps?
        </div>
      </div>
    </AbsoluteFill>
  );
};
