import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Gemini Card: The Versatile Platform
 * "Images via Nano Banana, slides, and code — all in one free tier"
 */
export const GeminiCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const GEMINI_PURPLE = '#8B5CF6';
  const GEMINI_BLUE = '#6366F1';

  // Card entrance
  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Orbiting capabilities
  const capabilities = [
    { name: 'Images', icon: '🖼️', orbitRadius: 160 },
    { name: 'Slides', icon: '📊', orbitRadius: 160 },
    { name: 'Code', icon: '💻', orbitRadius: 160 },
    { name: 'Text', icon: '📝', orbitRadius: 160 },
    { name: 'Video', icon: '🎬', orbitRadius: 160 },
    { name: 'Audio', icon: '🎵', orbitRadius: 160 },
  ];

  // Gemini logo - two intertwined shapes
  const rotA = frame * 1.5;
  const rotB = -frame * 1.2;

  // "Nano Banana" badge
  const nanoBananaScale = spring({
    frame: frame - 70,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 200 },
  });

  // Feature list
  const features = [
    { text: 'Multi-modal', delay: 40 },
    { text: 'Free Tier', delay: 55 },
    { text: 'All-in-One', delay: 70 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Purple gradient bg */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(139,92,246,0.08) 0%, transparent 60%), linear-gradient(180deg, #0f0a1e 0%, #0a0a0a 100%)`,
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
        <h1
          style={{
            fontSize: 80,
            fontWeight: 900,
            margin: 0,
            background: `linear-gradient(135deg, ${GEMINI_PURPLE}, ${GEMINI_BLUE}, #06B6D4)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 0 30px ${GEMINI_PURPLE}40)`,
          }}
        >
          GEMINI
        </h1>
        <p style={{ fontSize: 28, color: '#C4B5FD', marginTop: 5 }}>The Versatile Platform</p>
      </div>

      {/* Central orbiting system */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '48%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Gemini dual shape */}
        <div
          style={{
            width: 80,
            height: 80,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: `4px solid ${GEMINI_PURPLE}`,
              top: 0,
              left: 0,
              transform: `rotate(${rotA}deg)`,
              boxShadow: `0 0 20px ${GEMINI_PURPLE}40`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: `4px solid ${GEMINI_BLUE}`,
              bottom: 0,
              right: 0,
              transform: `rotate(${rotB}deg)`,
              boxShadow: `0 0 20px ${GEMINI_BLUE}40`,
            }}
          />
        </div>

        {/* Orbiting capabilities */}
        {capabilities.map((cap, i) => {
          const angle = (i / capabilities.length) * Math.PI * 2 + frame * 0.02;
          const x = Math.cos(angle) * cap.orbitRadius;
          const y = Math.sin(angle) * cap.orbitRadius * 0.6; // elliptical orbit
          const capOpacity = interpolate(frame, [20 + i * 8, 30 + i * 8], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x + 30,
                top: y + 30,
                transform: 'translate(-50%, -50%)',
                opacity: capOpacity,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: '#1e293b',
                  border: `2px solid ${GEMINI_PURPLE}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                }}
              >
                {cap.icon}
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4, fontWeight: 600 }}>
                {cap.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Nano Banana badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '50%',
          transform: `translate(-50%, 0) scale(${nanoBananaScale})`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${GEMINI_PURPLE}20, ${GEMINI_BLUE}20)`,
            border: `2px solid ${GEMINI_PURPLE}40`,
            borderRadius: 20,
            padding: '12px 30px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 28 }}>🍌</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#FBBF24' }}>Nano Banana</span>
          <span style={{ fontSize: 16, color: '#94a3b8' }}>— Image Generation</span>
        </div>
      </div>

      {/* Feature pills */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 20,
        }}
      >
        {features.map((feat, i) => {
          const pillScale = spring({
            frame: frame - feat.delay,
            fps,
            config: { damping: 12 },
          });
          return (
            <div
              key={i}
              style={{
                transform: `scale(${pillScale})`,
                backgroundColor: `${GEMINI_PURPLE}15`,
                border: `1px solid ${GEMINI_PURPLE}30`,
                borderRadius: 20,
                padding: '8px 20px',
                fontSize: 18,
                color: '#C4B5FD',
                fontWeight: 600,
              }}
            >
              {feat.text}
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
        <p style={{ fontSize: 22, color: GEMINI_PURPLE, margin: 0, fontWeight: 600 }}>
          "Images, slides, and code — all in one free tier"
        </p>
      </div>
    </AbsoluteFill>
  );
};
