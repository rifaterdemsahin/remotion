import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * DeepSeek Card: The Coding Disruptor
 * "A powerful free alternative"
 */
export const DeepseekCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const DEEP_BLUE = '#3B82F6';

  // Card entrance
  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Code rain effect
  const codeLines = Array.from({ length: 15 }).map((_, i) => {
    const x = 100 + i * 120;
    const speed = 2 + (i % 4) * 0.5;
    const yOffset = (frame * speed + i * 200) % 1200 - 100;
    const opacity = interpolate(yOffset, [0, 200, 800, 1000], [0, 0.15, 0.15, 0], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });
    const chars = '{}()=>[];const fn async await return import'.split('');
    const char = chars[Math.floor((frame / 10 + i * 3) % chars.length)];
    return { x, y: yOffset, opacity, char };
  });

  // Disruption effect - glitch
  const glitchActive = frame > 40 && frame < 50;
  const glitchX = glitchActive ? Math.sin(frame * 20) * 8 : 0;

  // Stats
  const stats = [
    { label: 'Open Source', value: '✓', delay: 55 },
    { label: 'Cost', value: 'FREE', delay: 70 },
    { label: 'Code Quality', value: '★★★★★', delay: 85 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
        transform: `translateX(${glitchX}px)`,
      }}
    >
      {/* Blue gradient bg */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.08) 0%, transparent 60%), linear-gradient(180deg, #0a1628 0%, #0a0a0a 100%)`,
        }}
      />

      {/* Code rain */}
      {codeLines.map((line, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: line.x,
            top: line.y,
            fontSize: 18,
            color: DEEP_BLUE,
            opacity: line.opacity,
            fontFamily: "'Fira Code', monospace",
            fontWeight: 600,
          }}
        >
          {line.char}
        </div>
      ))}

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          width: '100%',
          textAlign: 'center',
          transform: `scale(${cardScale})`,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 28, color: '#94a3b8', letterSpacing: 6, textTransform: 'uppercase', marginBottom: 10 }}>
          AI Model Spotlight
        </div>
        <h1 style={{ fontSize: 80, fontWeight: 900, color: DEEP_BLUE, margin: 0, textShadow: `0 0 40px ${DEEP_BLUE}40` }}>
          DeepSeek
        </h1>
        <p style={{ fontSize: 28, color: '#93C5FD', marginTop: 5 }}>The Coding Disruptor</p>
      </div>

      {/* Central terminal window */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '25%',
          right: '25%',
          zIndex: 10,
          opacity: interpolate(frame, [20, 35], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        <div
          style={{
            backgroundColor: '#0f172a',
            border: `2px solid ${DEEP_BLUE}30`,
            borderRadius: 12,
            padding: 25,
          }}
        >
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 18, color: '#94a3b8', lineHeight: 1.8 }}>
            <span style={{ color: '#C084FC' }}>const</span>
            <span style={{ color: '#60A5FA' }}> agent</span>
            <span style={{ color: '#94a3b8' }}> = </span>
            <span style={{ color: '#F472B6' }}>await</span>
            <span style={{ color: '#94a3b8' }}> DeepSeek.</span>
            <span style={{ color: '#22C55E' }}>create</span>
            <span style={{ color: '#94a3b8' }}>{'({'}</span>
            <br />
            <span style={{ color: '#94a3b8' }}>{'  '}model: </span>
            <span style={{ color: '#FBBF24' }}>"deepseek-coder-v3"</span>
            <span style={{ color: '#94a3b8' }}>,</span>
            <br />
            <span style={{ color: '#94a3b8' }}>{'  '}cost: </span>
            <span style={{ color: '#22C55E' }}>0</span>
            <span style={{ color: '#64748b' }}> // completely free</span>
            <br />
            <span style={{ color: '#94a3b8' }}>{'});'}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          right: '15%',
          display: 'flex',
          justifyContent: 'space-around',
          zIndex: 10,
        }}
      >
        {stats.map((stat, i) => {
          const statScale = spring({
            frame: frame - stat.delay,
            fps,
            config: { damping: 12, mass: 0.5 },
          });
          return (
            <div key={i} style={{ transform: `scale(${statScale})`, textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: stat.value === 'FREE' ? '#22c55e' : DEEP_BLUE,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Bottom quote */}
      <div
        style={{
          position: 'absolute',
          bottom: '4%',
          width: '100%',
          textAlign: 'center',
          opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        }}
      >
        <p style={{ fontSize: 22, color: DEEP_BLUE, margin: 0, fontWeight: 600 }}>
          "The coding disruptor — a powerful free alternative"
        </p>
      </div>
    </AbsoluteFill>
  );
};
