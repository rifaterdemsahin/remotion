import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  random,
} from 'remotion';

/**
 * Scene Interlude: Zombie Snails
 * Enterprise engineers moving like zombie snails in a 10-year race.
 * Humorous/dramatic contrast animation.
 */
export const ZombieSnails: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Snail objects crawling extremely slowly
  const snailCount = 5;
  const snails = Array.from({ length: snailCount }).map((_, i) => {
    const baseX = random(i * 10) * width * 0.6;
    const y = 500 + i * 90;
    const speed = 0.15 + random(i * 20) * 0.1;
    const x = baseX + frame * speed;
    const wobble = Math.sin(frame / 15 + i) * 3;
    return { x, y: y + wobble, size: 50 + random(i * 30) * 30, id: i };
  });

  // "10 YEAR RACE" text
  const raceTextOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const raceTextScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, mass: 0.6 },
  });

  // Progress bar (barely moves)
  const progressWidth = interpolate(frame, [0, 150], [2, 5], {
    extrapolateRight: 'clamp',
  });

  // Speed comparison text
  const comparisonOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Dark foggy background */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, #16213e 0%, #1a1a2e 50%, #0f3460 100%)',
        }}
      />

      {/* Fog effect */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 300 + i * 200,
            left: -200 + frame * (0.3 + i * 0.1),
            width: 600,
            height: 100,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Snails */}
      {snails.map((snail) => (
        <div
          key={snail.id}
          style={{
            position: 'absolute',
            left: snail.x,
            top: snail.y,
            fontSize: snail.size,
            filter: 'grayscale(50%) brightness(0.7)',
            transform: `scaleX(-1)`,
            opacity: 0.8,
          }}
        >
          🐌
        </div>
      ))}

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          width: '100%',
          textAlign: 'center',
          opacity: raceTextOpacity,
          transform: `scale(${raceTextScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 90,
            fontWeight: 900,
            margin: 0,
            color: '#ef4444',
            textShadow: '0 0 40px rgba(239,68,68,0.5)',
            letterSpacing: 8,
          }}
        >
          ZOMBIE SNAILS
        </h1>
        <p
          style={{
            fontSize: 36,
            color: '#64748b',
            marginTop: 10,
          }}
        >
          in a 10-year race toward AI transformation
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          right: '10%',
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: '#64748b',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 3,
          }}
        >
          Enterprise AI Transformation Progress
        </div>
        <div
          style={{
            width: '100%',
            height: 30,
            backgroundColor: '#1e293b',
            borderRadius: 15,
            overflow: 'hidden',
            border: '1px solid #334155',
          }}
        >
          <div
            style={{
              width: `${progressWidth}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ef4444, #f97316)',
              borderRadius: 15,
              transition: 'width 0.1s',
            }}
          />
        </div>
        <div
          style={{
            fontSize: 16,
            color: '#475569',
            marginTop: 5,
            textAlign: 'right',
          }}
        >
          {progressWidth.toFixed(1)}% complete after 10 years
        </div>
      </div>

      {/* Speed comparison */}
      <div
        style={{
          position: 'absolute',
          bottom: '6%',
          width: '100%',
          textAlign: 'center',
          opacity: comparisonOpacity,
        }}
      >
        <p style={{ fontSize: 28, color: '#fbbf24', margin: 0, fontWeight: 600 }}>
          "Massive resistance… but we are closing the gap"
        </p>
      </div>
    </AbsoluteFill>
  );
};
