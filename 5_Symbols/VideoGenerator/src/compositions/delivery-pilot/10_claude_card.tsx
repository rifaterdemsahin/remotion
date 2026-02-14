import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Claude Card: The Reasoning Layer
 * Highlight card for Anthropic's Claude models.
 * "Top-notch reasoning with Sonnet 3.5, 4.5, and 4.6"
 */
export const ClaudeCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const CLAUDE_ORANGE = '#D97706';
  const CLAUDE_WARM = '#92400E';

  // Card entrance
  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Brain neural network animation
  const neurons = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 120 + Math.sin(frame / 10 + i) * 15;
    const x = 960 + Math.cos(angle) * radius;
    const y = 350 + Math.sin(angle) * radius;
    const pulse = Math.sin(frame / 6 + i * 0.8) * 0.3 + 0.7;
    return { x, y, pulse, angle };
  });

  // Connection lines between neurons
  const connectionOpacity = interpolate(frame, [20, 40], [0, 0.3], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Model versions
  const versions = [
    { name: 'Sonnet 3.5', delay: 45, desc: 'Fast & Efficient' },
    { name: 'Sonnet 4.5', delay: 65, desc: 'Balanced Power' },
    { name: 'Sonnet 4.6', delay: 85, desc: 'Maximum Reasoning' },
  ];

  // Title
  const titleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Warm gradient bg */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${CLAUDE_WARM}20 0%, transparent 60%), linear-gradient(180deg, #1a0e00 0%, #0a0a0a 100%)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `scale(${cardScale})`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#94a3b8',
            letterSpacing: 6,
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          AI Model Spotlight
        </div>
        <h1
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: CLAUDE_ORANGE,
            margin: 0,
            textShadow: `0 0 40px ${CLAUDE_ORANGE}40`,
          }}
        >
          CLAUDE
        </h1>
        <p style={{ fontSize: 28, color: '#D4A574', marginTop: 5 }}>The Reasoning Layer</p>
      </div>

      {/* Neural network visualization */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: connectionOpacity,
        }}
      >
        {neurons.map((n, i) =>
          neurons.slice(i + 1).map((n2, j) => (
            <line
              key={`${i}-${j}`}
              x1={n.x}
              y1={n.y}
              x2={n2.x}
              y2={n2.y}
              stroke={CLAUDE_ORANGE}
              strokeWidth={1}
              opacity={0.2}
            />
          ))
        )}
      </svg>

      {/* Neuron dots */}
      {neurons.map((n, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: n.x - 8,
            top: n.y - 8,
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: CLAUDE_ORANGE,
            boxShadow: `0 0 ${n.pulse * 20}px ${CLAUDE_ORANGE}`,
            opacity: n.pulse,
          }}
        />
      ))}

      {/* Central brain icon */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '32%',
          transform: 'translate(-50%, -50%)',
          fontSize: 80,
          opacity: interpolate(frame, [10, 25], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        🧠
      </div>

      {/* Model version cards */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          right: '10%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {versions.map((ver, i) => {
          const verScale = spring({
            frame: frame - ver.delay,
            fps,
            config: { damping: 12, mass: 0.5 },
          });
          const verOpacity = interpolate(frame, [ver.delay, ver.delay + 10], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                transform: `scale(${verScale})`,
                opacity: verOpacity,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: '#1e293b',
                  border: `2px solid ${CLAUDE_ORANGE}40`,
                  borderRadius: 16,
                  padding: '20px 40px',
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: CLAUDE_ORANGE }}>
                  {ver.name}
                </div>
                <div style={{ fontSize: 16, color: '#94a3b8', marginTop: 5 }}>{ver.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom callout */}
      <div
        style={{
          position: 'absolute',
          bottom: '4%',
          width: '100%',
          textAlign: 'center',
          opacity: interpolate(frame, [100, 120], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        <p style={{ fontSize: 22, color: CLAUDE_ORANGE, margin: 0, fontWeight: 600 }}>
          "Top-notch reasoning for complex problems"
        </p>
      </div>
    </AbsoluteFill>
  );
};
