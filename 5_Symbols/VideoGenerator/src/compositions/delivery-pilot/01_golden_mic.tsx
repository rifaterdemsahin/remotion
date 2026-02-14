import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 1: The Heavy Mic
 * Host holding a massive golden microphone - dramatic symbolic opening.
 * Represents engineering "elites" moving like zombie snails.
 */
export const GoldenMicIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background pulse
  const bgPulse = Math.sin(frame / 20) * 0.02 + 1;

  // Mic entrance: drops from top
  const micDrop = spring({
    frame,
    fps,
    config: { damping: 12, mass: 1.5, stiffness: 80 },
  });
  const micY = interpolate(micDrop, [0, 1], [-400, 0]);
  const micScale = interpolate(micDrop, [0.85, 1], [1.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glow pulse on mic
  const glowIntensity = Math.sin(frame / 8) * 15 + 40;

  // Title text reveal
  const titleOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const titleY = spring({
    frame: frame - 40,
    fps,
    from: 50,
    to: 0,
    config: { damping: 14 },
  });

  // Subtitle
  const subOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Weight struggle shake
  const shakeX =
    frame > 30 ? Math.sin(frame * 3) * interpolate(frame, [30, 90], [0, 4], { extrapolateRight: 'clamp' }) : 0;
  const shakeRotate =
    frame > 30
      ? Math.sin(frame * 2.5) * interpolate(frame, [30, 90], [0, 2], { extrapolateRight: 'clamp' })
      : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Radial gradient background */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, #1a1000 0%, #0a0a0a 70%)`,
          transform: `scale(${bgPulse})`,
        }}
      />

      {/* Spotlight effect */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '80%',
          background:
            'radial-gradient(ellipse at center, rgba(255,215,0,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Golden Microphone */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: `translate(-50%, ${micY}px) scale(${micScale}) translateX(${shakeX}px) rotate(${shakeRotate}deg)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Mic Head */}
        <div
          style={{
            width: 140,
            height: 180,
            borderRadius: '50% 50% 40% 40%',
            background: 'linear-gradient(135deg, #FFD700, #DAA520, #B8860B)',
            boxShadow: `0 0 ${glowIntensity}px rgba(255,215,0,0.6), inset 0 -20px 40px rgba(0,0,0,0.3)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Mesh pattern */}
          <div
            style={{
              width: 100,
              height: 120,
              borderRadius: '50% 50% 30% 30%',
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 5px), repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 5px)',
            }}
          />
        </div>
        {/* Mic Stem */}
        <div
          style={{
            width: 20,
            height: 200,
            background: 'linear-gradient(180deg, #DAA520, #B8860B, #8B6914)',
            borderRadius: 10,
            boxShadow: '2px 0 10px rgba(0,0,0,0.5)',
          }}
        />
        {/* Weight indicator */}
        <div
          style={{
            marginTop: 10,
            fontSize: 24,
            color: '#FFD700',
            fontWeight: 'bold',
            opacity: interpolate(frame, [50, 65], [0, 0.8], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
            letterSpacing: 4,
          }}
        >
          ▼ TOO HEAVY ▼
        </div>
      </div>

      {/* Title text */}
      <div
        style={{
          position: 'absolute',
          bottom: '22%',
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 20,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            margin: 0,
            background: 'linear-gradient(to right, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 4px 20px rgba(255,215,0,0.4))',
          }}
        >
          THE HEAVY MIC
        </h1>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          width: '100%',
          textAlign: 'center',
          opacity: subOpacity,
          zIndex: 20,
        }}
      >
        <p
          style={{
            fontSize: 32,
            color: '#94a3b8',
            margin: 0,
            fontWeight: 500,
            letterSpacing: 2,
          }}
        >
          Enterprise engineers move like zombie snails
        </p>
      </div>
    </AbsoluteFill>
  );
};
