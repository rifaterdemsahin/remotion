import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { TextReveal } from '../../../components/TextReveal';
import { COLORS } from '../../../utils/constants';

export const SystemScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Animation for PARA diagram
  const paraOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  
  // Animation for AI models stack
  const modelsY = spring({
    frame: frame - 90,
    fps: 30,
    from: 100,
    to: 0,
    config: { damping: 15 }
  });

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
            background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.cyan})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          The System: 240+ Workflows in Harmony
        </TextReveal>
      </div>

      {/* PARA Method Section */}
      <div style={{
        position: 'absolute',
        top: '180px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: paraOpacity,
        width: '90%',
        maxWidth: '1600px'
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: 700,
          color: 'white',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          PARA Method Organization
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px'
        }}>
          {[
            { icon: '🎯', title: 'Projects', desc: 'Active goals with deadlines', color: COLORS.blue },
            { icon: '🔄', title: 'Areas', desc: 'Ongoing responsibilities', color: COLORS.success },
            { icon: '📚', title: 'Resources', desc: 'Knowledge & references', color: COLORS.warning },
            { icon: '📦', title: 'Archives', desc: 'Completed & inactive', color: COLORS.textLight }
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: COLORS.darkGray,
              padding: '40px',
              borderRadius: '20px',
              border: `3px solid ${item.color}`,
              opacity: interpolate(frame, [40 + i * 10, 60 + i * 10], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
            }}>
              <div style={{ fontSize: '72px', marginBottom: '20px' }}>{item.icon}</div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: item.color, marginBottom: '10px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '24px', color: COLORS.textLight }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Models Stack */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: `translate(-50%, ${modelsY}px)`,
        opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '42px',
          fontWeight: 700,
          color: 'white',
          marginBottom: '30px'
        }}>
          Powered by Multi-Model AI
        </div>
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {[
            { name: 'Gemini 1.5/2.0', color: '#4285F4' },
            { name: 'Claude Sonnet', color: '#D97706' },
            { name: 'OpenAI O1', color: '#10A37F' }
          ].map((model, i) => (
            <div key={i} style={{
              backgroundColor: COLORS.darkGray,
              padding: '30px 50px',
              borderRadius: '15px',
              border: `3px solid ${model.color}`,
              fontSize: '32px',
              fontWeight: 600,
              color: model.color,
              opacity: interpolate(frame, [100 + i * 8, 120 + i * 8], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
            }}>
              {model.name}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
