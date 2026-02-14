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
 * Scene 10: Drone City Finale
 * Host overlooking futuristic city built by drones.
 * "Clone the repo, configure your environment, build the future"
 */
export const DroneCityFinale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // City skyline buildings
  const buildings = Array.from({ length: 25 }).map((_, i) => {
    const x = 60 + i * 75;
    const h = 100 + random(i) * 350;
    const w = 35 + random(i + 50) * 25;
    const delay = i * 3;
    const glowColor = ['#3B82F6', '#8B5CF6', '#06B6D4', '#22C55E', '#F59E0B'][i % 5];
    return { x, h, w, delay, glowColor };
  });

  // Drones
  const droneCount = 8;
  const drones = Array.from({ length: droneCount }).map((_, i) => {
    const baseX = 200 + random(i * 100) * (width - 400);
    const baseY = 150 + random(i * 200) * 200;
    const dx = Math.sin(frame / 30 + i * 2) * 100;
    const dy = Math.cos(frame / 25 + i * 1.5) * 40;
    const opacity = interpolate(frame, [30 + i * 10, 45 + i * 10], [0, 0.7], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });
    return { x: baseX + dx, y: baseY + dy, opacity };
  });

  // Balcony silhouette
  const balconyOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Text reveals
  const line1Opacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const line1Y = spring({
    frame: frame - 80,
    fps,
    from: 40,
    to: 0,
    config: { damping: 14 },
  });

  const line2Opacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const line3Opacity = interpolate(frame, [140, 160], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Sunset gradient shift
  const sunsetShift = interpolate(frame, [0, 180], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Sunset sky */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, 
            hsl(${220 + sunsetShift * 20}, 60%, ${8 + sunsetShift * 5}%) 0%, 
            hsl(${260 + sunsetShift * 10}, 50%, ${15 + sunsetShift * 8}%) 30%, 
            hsl(${30 - sunsetShift * 10}, 70%, ${12 + sunsetShift * 10}%) 60%, 
            hsl(${15}, 80%, ${10 + sunsetShift * 5}%) 100%)`,
        }}
      />

      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: random(i + 500) * width,
            top: random(i + 600) * height * 0.4,
            width: 2,
            height: 2,
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: Math.sin(frame / 10 + i) * 0.3 + 0.3,
          }}
        />
      ))}

      {/* City skyline */}
      {buildings.map((b, i) => {
        const buildScale = spring({
          frame: frame - b.delay,
          fps,
          config: { damping: 20, stiffness: 60 },
        });
        const buildHeight = b.h * buildScale;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: 180,
              left: b.x,
              width: b.w,
              height: buildHeight,
              background: `linear-gradient(180deg, ${b.glowColor}20 0%, #111827 60%, #0f172a 100%)`,
              borderRadius: '4px 4px 0 0',
              overflow: 'hidden',
            }}
          >
            {/* Windows */}
            {Array.from({ length: Math.floor(buildHeight / 20) }).map((_, w) => (
              <div
                key={w}
                style={{
                  position: 'absolute',
                  left: 4 + (w % 3) * (b.w / 3.5),
                  bottom: 10 + Math.floor(w / 3) * 20,
                  width: 6,
                  height: 8,
                  backgroundColor:
                    random(i * 100 + w) > 0.4
                      ? `rgba(255,255,200,${0.2 + random(i * 100 + w + 300) * 0.4})`
                      : 'transparent',
                  borderRadius: 1,
                }}
              />
            ))}
            {/* Top glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: b.glowColor,
                boxShadow: `0 0 10px ${b.glowColor}`,
                opacity: 0.6,
              }}
            />
          </div>
        );
      })}

      {/* Ground */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
        }}
      />

      {/* Drones */}
      {drones.map((drone, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: drone.x,
            top: drone.y,
            opacity: drone.opacity,
          }}
        >
          {/* Drone body */}
          <div
            style={{
              width: 20,
              height: 8,
              backgroundColor: '#94a3b8',
              borderRadius: 4,
              position: 'relative',
            }}
          >
            {/* Propellers */}
            <div
              style={{
                position: 'absolute',
                top: -3,
                left: -8,
                width: 16,
                height: 2,
                backgroundColor: '#64748b',
                borderRadius: 1,
                transform: `rotate(${frame * 15 + i * 45}deg)`,
                transformOrigin: 'right center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: -3,
                right: -8,
                width: 16,
                height: 2,
                backgroundColor: '#64748b',
                borderRadius: 1,
                transform: `rotate(${-frame * 15 + i * 30}deg)`,
                transformOrigin: 'left center',
              }}
            />
            {/* Light */}
            <div
              style={{
                position: 'absolute',
                bottom: -2,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 4,
                borderRadius: '50%',
                backgroundColor: i % 2 === 0 ? '#EF4444' : '#22C55E',
                boxShadow: `0 0 8px ${i % 2 === 0 ? '#EF4444' : '#22C55E'}`,
                opacity: Math.sin(frame / 5 + i) > 0 ? 1 : 0.3,
              }}
            />
          </div>
        </div>
      ))}

      {/* Balcony railing silhouette */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: 0,
          right: 0,
          height: 40,
          opacity: balconyOpacity,
        }}
      >
        <div
          style={{
            width: '100%',
            height: 4,
            backgroundColor: '#1e293b',
            position: 'absolute',
            top: 0,
          }}
        />
        {/* Railing posts */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${i * 3.5}%`,
              top: 0,
              width: 3,
              height: 40,
              backgroundColor: '#1e293b',
            }}
          />
        ))}
        <div
          style={{
            width: '100%',
            height: 4,
            backgroundColor: '#1e293b',
            position: 'absolute',
            bottom: 0,
          }}
        />
      </div>

      {/* Text overlays */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          width: '100%',
          textAlign: 'center',
          zIndex: 20,
        }}
      >
        <div style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}>
          <h1
            style={{
              fontSize: 60,
              fontWeight: 900,
              margin: 0,
              background: 'linear-gradient(to right, #FBBF24, #F97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 20px rgba(251,191,36,0.4))',
            }}
          >
            BUILD THE FUTURE
          </h1>
        </div>

        <div style={{ opacity: line2Opacity, marginTop: 20 }}>
          <p style={{ fontSize: 28, color: '#94a3b8', margin: 0 }}>
            Clone the repo • Configure your environment • Start building
          </p>
        </div>

        <div style={{ opacity: line3Opacity, marginTop: 30 }}>
          <p
            style={{
              fontSize: 32,
              color: '#FBBF24',
              margin: 0,
              fontWeight: 700,
              fontStyle: 'italic',
            }}
          >
            "Till next time. Love. Bye-bye."
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
