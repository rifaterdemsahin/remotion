import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 3b: Breaking Chains
 * Iron chains of the old school system snapping apart.
 * "Those old lessons are obsolete."
 */
export const BreakingChains: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Chain links
  const chainCount = 8;
  const breakFrame = 60;

  // Screen shake on break
  const shakeIntensity =
    frame > breakFrame
      ? interpolate(frame - breakFrame, [0, 5, 20], [12, 8, 0], {
          extrapolateRight: 'clamp',
        })
      : 0;
  const shakeX = Math.sin(frame * 7) * shakeIntensity;
  const shakeY = Math.cos(frame * 5) * shakeIntensity;

  // Flash on break
  const flashOpacity =
    frame > breakFrame
      ? interpolate(frame - breakFrame, [0, 3, 10], [0.6, 0.3, 0], {
          extrapolateRight: 'clamp',
        })
      : 0;

  // Title
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // "OBSOLETE" stamp
  const stampScale = spring({
    frame: frame - (breakFrame + 15),
    fps,
    config: { damping: 8, mass: 0.5, stiffness: 300 },
  });
  const stampRotation = interpolate(stampScale, [0, 1], [-30, -12]);

  // Particle sparks
  const sparkCount = 20;
  const sparks = Array.from({ length: sparkCount }).map((_, i) => {
    const angle = (i / sparkCount) * Math.PI * 2;
    const speed = 3 + (i % 5) * 2;
    const sparkLife = frame - breakFrame;
    const x = 960 + Math.cos(angle) * speed * sparkLife;
    const y = 540 + Math.sin(angle) * speed * sparkLife;
    const opacity =
      sparkLife > 0
        ? interpolate(sparkLife, [0, 30], [1, 0], { extrapolateRight: 'clamp' })
        : 0;
    return { x, y, opacity, size: 4 + (i % 3) * 3 };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: "'Impact', 'Arial Black', sans-serif",
        overflow: 'hidden',
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Background */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, #1a0a00 0%, #0a0a0a 70%)',
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
        }}
      >
        <h2
          style={{
            fontSize: 48,
            color: '#94a3b8',
            fontWeight: 800,
            margin: 0,
            letterSpacing: 6,
          }}
        >
          THE OLD SCHOOL SYSTEM
        </h2>
      </div>

      {/* Chain links across center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: 0,
        }}
      >
        {Array.from({ length: chainCount }).map((_, i) => {
          const isBroken = frame > breakFrame;
          const isLeftSide = i < chainCount / 2;
          const breakOffset = isBroken
            ? interpolate(
                frame - breakFrame,
                [0, 30],
                [0, isLeftSide ? -(chainCount / 2 - i) * 40 : (i - chainCount / 2 + 1) * 40],
                { extrapolateRight: 'clamp' }
              )
            : 0;
          const fallOffset = isBroken
            ? interpolate(frame - breakFrame, [10, 60], [0, Math.abs(i - chainCount / 2) * 80], {
                extrapolateRight: 'clamp',
              })
            : 0;
          const rotation = isBroken
            ? interpolate(frame - breakFrame, [0, 40], [0, isLeftSide ? -30 : 30], {
                extrapolateRight: 'clamp',
              })
            : 0;

          return (
            <div
              key={i}
              style={{
                width: 80,
                height: 50,
                border: '8px solid #78716c',
                borderRadius: 25,
                marginLeft: i > 0 ? -15 : 0,
                background: `linear-gradient(180deg, #a8a29e, #78716c)`,
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.5)',
                transform: `translateX(${breakOffset}px) translateY(${fallOffset}px) rotate(${rotation}deg)`,
                opacity: isBroken
                  ? interpolate(frame - breakFrame, [40, 80], [1, 0.3], {
                      extrapolateRight: 'clamp',
                    })
                  : interpolate(frame, [5 + i * 5, 15 + i * 5], [0, 1], {
                      extrapolateRight: 'clamp',
                      extrapolateLeft: 'clamp',
                    }),
              }}
            />
          );
        })}
      </div>

      {/* Break sparks */}
      {sparks.map((spark, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            borderRadius: '50%',
            backgroundColor: i % 2 === 0 ? '#fbbf24' : '#f97316',
            opacity: spark.opacity,
            boxShadow: `0 0 8px ${i % 2 === 0 ? '#fbbf24' : '#f97316'}`,
          }}
        />
      ))}

      {/* Flash */}
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(251, 191, 36, ${flashOpacity})`,
          pointerEvents: 'none',
        }}
      />

      {/* OBSOLETE stamp */}
      {frame > breakFrame + 15 && (
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: `translate(-50%, 0) scale(${stampScale}) rotate(${stampRotation}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: '#ef4444',
              border: '8px solid #ef4444',
              padding: '10px 40px',
              letterSpacing: 12,
              opacity: 0.9,
              textShadow: '0 0 20px rgba(239,68,68,0.5)',
            }}
          >
            OBSOLETE
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
