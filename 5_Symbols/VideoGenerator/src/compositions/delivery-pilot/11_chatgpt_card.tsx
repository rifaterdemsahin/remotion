import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * ChatGPT Card: The Versatile Leader
 * "I use it mostly as a search engine"
 */
export const ChatgptCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const GPT_GREEN = '#10A37F';

  // Card entrance
  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Search animation - magnifying glass
  const searchSwing = Math.sin(frame / 12) * 10;
  const searchScale = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Versatility rays
  const rayCount = 8;
  const rays = Array.from({ length: rayCount }).map((_, i) => {
    const angle = (i / rayCount) * Math.PI * 2;
    const length = 80 + Math.sin(frame / 8 + i) * 20;
    return { angle, length };
  });

  // Use cases appearing
  const useCases = [
    { text: 'Research', icon: '📚', delay: 35 },
    { text: 'Writing', icon: '✍️', delay: 50 },
    { text: 'Analysis', icon: '📊', delay: 65 },
    { text: 'Search', icon: '🔎', delay: 80 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Green gradient bg */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(16,163,127,0.1) 0%, transparent 60%), linear-gradient(180deg, #021a12 0%, #0a0a0a 100%)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          width: '100%',
          textAlign: 'center',
          transform: `scale(${cardScale})`,
        }}
      >
        <div style={{ fontSize: 28, color: '#94a3b8', letterSpacing: 6, textTransform: 'uppercase', marginBottom: 10 }}>
          AI Model Spotlight
        </div>
        <h1 style={{ fontSize: 80, fontWeight: 900, color: GPT_GREEN, margin: 0, textShadow: `0 0 40px ${GPT_GREEN}40` }}>
          ChatGPT
        </h1>
        <p style={{ fontSize: 28, color: '#6EE7B7', marginTop: 5 }}>The Versatile Leader</p>
      </div>

      {/* Central icon with rays */}
      <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%, -50%)' }}>
        {/* Rays */}
        <svg width="400" height="400" viewBox="-200 -200 400 400" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          {rays.map((ray, i) => (
            <line
              key={i}
              x1={Math.cos(ray.angle) * 50}
              y1={Math.sin(ray.angle) * 50}
              x2={Math.cos(ray.angle) * ray.length}
              y2={Math.sin(ray.angle) * ray.length}
              stroke={GPT_GREEN}
              strokeWidth={3}
              opacity={0.3}
              strokeLinecap="round"
            />
          ))}
        </svg>

        {/* OpenAI icon placeholder */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${GPT_GREEN}, #065F46)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 40px ${GPT_GREEN}40`,
            position: 'relative',
            zIndex: 5,
            transform: `scale(${searchScale}) rotate(${searchSwing}deg)`,
          }}
        >
          <span style={{ fontSize: 60, color: 'white' }}>🔍</span>
        </div>
      </div>

      {/* Use case badges */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          right: '10%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {useCases.map((uc, i) => {
          const ucScale = spring({
            frame: frame - uc.delay,
            fps,
            config: { damping: 12, mass: 0.5 },
          });
          return (
            <div
              key={i}
              style={{
                transform: `scale(${ucScale})`,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: '#1e293b',
                  border: `2px solid ${GPT_GREEN}30`,
                  borderRadius: 16,
                  padding: '20px 30px',
                  minWidth: 140,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 8 }}>{uc.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>{uc.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom quote */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          width: '100%',
          textAlign: 'center',
          opacity: interpolate(frame, [95, 115], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        }}
      >
        <p style={{ fontSize: 22, color: GPT_GREEN, margin: 0, fontWeight: 600 }}>
          "The versatile leader — I use it mostly as a search engine"
        </p>
      </div>
    </AbsoluteFill>
  );
};
