import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { TextReveal } from '../../../components/TextReveal';
import { SplitScreen } from '../../../components/SplitScreen';
import { COLORS } from '../../../utils/constants';

export const TransformationScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>
        <TextReveal
          delay={0}
          duration={30}
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.purple})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          The Transformation: Bottom-Up Revolution
        </TextReveal>
      </div>

      {/* Corporate meeting context */}
      <div style={{
        position: 'absolute',
        top: '180px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        textAlign: 'center',
        maxWidth: '1400px'
      }}>
        <div style={{
          fontSize: '48px',
          color: COLORS.textLight,
          marginBottom: '20px',
          lineHeight: 1.4
        }}>
          🏢 Corporate Root Cause Analysis meetings...<br/>
          while individuals build agent systems that work.
        </div>
      </div>

      {/* Top-Down vs Bottom-Up comparison */}
      <div style={{
        position: 'absolute',
        top: '380px',
        left: 0,
        right: 0,
        bottom: '250px'
      }}>
        <SplitScreen
          delay={50}
          left={
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '100px',
                marginBottom: '30px'
              }}>
                🔻
              </div>
              <div style={{
                fontSize: '40px',
                fontWeight: 700,
                color: COLORS.danger,
                marginBottom: '20px'
              }}>
                Top-Down
              </div>
              <div style={{
                fontSize: '28px',
                color: COLORS.textLight,
                lineHeight: 1.5
              }}>
                Committees decide<br/>
                Long approval cycles<br/>
                By the time it's built...<br/>
                it's already outdated
              </div>
            </div>
          }
          right={
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '100px',
                marginBottom: '30px'
              }}>
                🔺
              </div>
              <div style={{
                fontSize: '40px',
                fontWeight: 700,
                color: COLORS.success,
                marginBottom: '20px'
              }}>
                Bottom-Up
              </div>
              <div style={{
                fontSize: '28px',
                color: COLORS.textLight,
                lineHeight: 1.5
              }}>
                Individuals experiment<br/>
                Rapid iteration<br/>
                What works spreads<br/>
                organically
              </div>
            </div>
          }
        />
      </div>

      {/* Deep Work section */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '42px',
          fontWeight: 700,
          color: 'white',
          marginBottom: '30px'
        }}>
          Deep Work: Deleted YouTube, Instagram, Reddit
        </div>
        <div style={{
          fontSize: '36px',
          color: COLORS.textLight
        }}>
          Focus → Build → Deploy → Iterate
        </div>
      </div>
    </AbsoluteFill>
  );
};
