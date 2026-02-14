import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 7/9: The LLM Feast
 * Kitchen table with 100 tablets — a digital feast of LLM models.
 * Overview of Claude, ChatGPT, DeepSeek, Gemini.
 */
export const LlmFeastTable: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const llms = [
    {
      name: 'Claude',
      subtitle: 'The Reasoning Layer',
      models: 'Sonnet 3.5 / 4.5 / 4.6',
      color: '#D97706',
      bgColor: 'rgba(217,119,6,0.15)',
      icon: '🧠',
      strength: 'Complex Problems',
      delay: 30,
    },
    {
      name: 'ChatGPT',
      subtitle: 'The Versatile Leader',
      models: 'GPT-4o / Search',
      color: '#10A37F',
      bgColor: 'rgba(16,163,127,0.15)',
      icon: '🔍',
      strength: 'Search & Versatility',
      delay: 55,
    },
    {
      name: 'DeepSeek',
      subtitle: 'The Coding Disruptor',
      models: 'V3 / R1',
      color: '#3B82F6',
      bgColor: 'rgba(59,130,246,0.15)',
      icon: '💻',
      strength: 'Free & Powerful',
      delay: 80,
    },
    {
      name: 'Gemini',
      subtitle: 'The Versatile Platform',
      models: 'Nano Banana / Pro',
      color: '#8B5CF6',
      bgColor: 'rgba(139,92,246,0.15)',
      icon: '✨',
      strength: 'Images, Slides, Code',
      delay: 105,
    },
  ];

  // Title
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  // Table cloth / feast background
  const feastReveal = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Floating tablets in background
  const tabletCount = 30;
  const tablets = Array.from({ length: tabletCount }).map((_, i) => {
    const x = 100 + (i % 10) * 180;
    const y = 200 + Math.floor(i / 10) * 250;
    const float = Math.sin(frame / 15 + i * 0.5) * 8;
    const opacity = interpolate(frame, [15 + i * 2, 25 + i * 2], [0, 0.08], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });
    return { x, y: y + float, opacity };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Warm feast background */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, #1e1b4b 0%, #0f172a 70%)',
          opacity: feastReveal,
        }}
      />

      {/* Background tablets */}
      {tablets.map((t, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: t.x,
            top: t.y,
            width: 60,
            height: 40,
            borderRadius: 6,
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            opacity: t.opacity,
          }}
        />
      ))}

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          width: '100%',
          textAlign: 'center',
          transform: `scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 60,
            fontWeight: 900,
            margin: 0,
            background: 'linear-gradient(to right, #fbbf24, #f97316, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          THE DIGITAL FEAST
        </h1>
        <p
          style={{
            fontSize: 24,
            color: '#64748b',
            marginTop: 8,
          }}
        >
          Your choice of AI models — served fresh
        </p>
      </div>

      {/* LLM Cards */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '5%',
          right: '5%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        {llms.map((llm, i) => {
          const cardSpring = spring({
            frame: frame - llm.delay,
            fps,
            config: { damping: 12, mass: 0.7 },
          });
          const cardY = interpolate(cardSpring, [0, 1], [80, 0]);
          const cardOpacity = interpolate(frame, [llm.delay, llm.delay + 15], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });
          const hover = Math.sin(frame / 12 + i * 1.5) * 5;

          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: cardOpacity,
                transform: `translateY(${cardY + hover}px)`,
              }}
            >
              <div
                style={{
                  backgroundColor: '#1e293b',
                  border: `2px solid ${llm.color}30`,
                  borderRadius: 20,
                  padding: '30px 25px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, transparent, ${llm.color}, transparent)`,
                  }}
                />

                {/* Icon */}
                <div style={{ fontSize: 60, marginBottom: 15 }}>{llm.icon}</div>

                {/* Name */}
                <div style={{ fontSize: 32, fontWeight: 800, color: llm.color, marginBottom: 5 }}>
                  {llm.name}
                </div>

                {/* Subtitle */}
                <div style={{ fontSize: 16, color: '#94a3b8', marginBottom: 15 }}>{llm.subtitle}</div>

                {/* Divider */}
                <div
                  style={{
                    width: '60%',
                    height: 1,
                    backgroundColor: '#334155',
                    margin: '0 auto 15px',
                  }}
                />

                {/* Models */}
                <div
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    backgroundColor: llm.bgColor,
                    padding: '6px 12px',
                    borderRadius: 8,
                    display: 'inline-block',
                    marginBottom: 12,
                  }}
                >
                  {llm.models}
                </div>

                {/* Strength */}
                <div style={{ fontSize: 18, color: 'white', fontWeight: 600, marginTop: 10 }}>
                  {llm.strength}
                </div>
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
          opacity: interpolate(frame, [130, 150], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        <p style={{ fontSize: 26, color: '#fbbf24', margin: 0, fontWeight: 600 }}>
          "We are serving a digital feast today"
        </p>
      </div>
    </AbsoluteFill>
  );
};
