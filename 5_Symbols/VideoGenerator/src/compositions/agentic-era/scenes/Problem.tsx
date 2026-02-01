import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { TextReveal } from '../../../components/TextReveal';
import { SplitScreen } from '../../../components/SplitScreen';
import { COLORS } from '../../../utils/constants';

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: '80px',
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
            background: `linear-gradient(to right, white, ${COLORS.primary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          The Problem: Simple Prompts Aren't Enough
        </TextReveal>
      </div>

      {/* UK Shop Story */}
      <div style={{
        position: 'absolute',
        top: '200px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        textAlign: 'center',
        maxWidth: '1200px',
        padding: '0 60px'
      }}>
        <div style={{
          fontSize: '42px',
          color: COLORS.textLight,
          marginBottom: '40px',
          lineHeight: 1.5
        }}>
          🏪 Sunday, 4:45 PM. You need something from the shop.<br/>
          But it's closed. You're stuck.
        </div>
        <div style={{
          fontSize: '36px',
          color: COLORS.warning,
          fontWeight: 600
        }}>
          This is what happens with simple chatbots.
        </div>
      </div>

      {/* Split screen comparison */}
      <div style={{
        position: 'absolute',
        top: '520px',
        left: 0,
        right: 0,
        bottom: '100px'
      }}>
        <SplitScreen
          delay={70}
          left={
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '120px',
                marginBottom: '30px'
              }}>
                ❌
              </div>
              <div style={{
                fontSize: '40px',
                fontWeight: 700,
                color: COLORS.danger,
                marginBottom: '20px'
              }}>
                Simple Chatbot
              </div>
              <div style={{
                fontSize: '28px',
                color: COLORS.textLight,
                lineHeight: 1.4
              }}>
                Waits for your input<br/>
                Can't act on its own<br/>
                No context awareness
              </div>
            </div>
          }
          right={
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '120px',
                marginBottom: '30px'
              }}>
                ✅
              </div>
              <div style={{
                fontSize: '40px',
                fontWeight: 700,
                color: COLORS.success,
                marginBottom: '20px'
              }}>
                AI Agent System
              </div>
              <div style={{
                fontSize: '28px',
                color: COLORS.textLight,
                lineHeight: 1.4
              }}>
                Acts autonomously<br/>
                Manages projects 24/7<br/>
                Full context awareness
              </div>
            </div>
          }
        />
      </div>
    </AbsoluteFill>
  );
};
