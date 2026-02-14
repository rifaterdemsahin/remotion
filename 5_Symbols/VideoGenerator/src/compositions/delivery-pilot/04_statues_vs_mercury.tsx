import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 3: Statues vs Mercury
 * Split-screen comparison: frozen stone statues (static rules) vs
 * liquid mercury character (dynamic AI rules).
 */
export const StatuesVsMercury: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split reveal
  const splitProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const splitX = interpolate(splitProgress, [0, 1], [100, 50]);

  // Left side: statues appear
  const statueOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Right side: mercury flows
  const mercuryOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Mercury flow animation
  const mercuryShift1 = Math.sin(frame / 10) * 30;
  const mercuryShift2 = Math.cos(frame / 8) * 20;
  const mercuryShift3 = Math.sin(frame / 12 + 2) * 25;

  // Labels
  const labelOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Crack effect on statue side
  const crackProgress = interpolate(frame, [80, 120], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // VS text
  const vsScale = spring({
    frame: frame - 35,
    fps,
    config: { damping: 8, mass: 0.5 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Left Side: Stone Statues */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${splitX}%`,
          height: '100%',
          background: 'linear-gradient(180deg, #374151 0%, #1f2937 50%, #111827 100%)',
          opacity: statueOpacity,
          overflow: 'hidden',
        }}
      >
        {/* Stone statues */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '15%',
              left: `${10 + i * 18}%`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Statue body */}
            <div
              style={{
                width: 60 + i * 5,
                height: 140 + i * 10,
                background: `linear-gradient(180deg, #6b7280, #4b5563, #374151)`,
                borderRadius: '30px 30px 5px 5px',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                opacity: 0.7 + i * 0.05,
              }}
            />
            {/* Pedestal */}
            <div
              style={{
                width: 80 + i * 5,
                height: 25,
                background: '#374151',
                borderRadius: 3,
                marginTop: 5,
              }}
            />
          </div>
        ))}

        {/* Crack overlay */}
        <svg
          viewBox="0 0 960 1080"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: crackProgress * 0.6,
          }}
        >
          <path
            d={`M480,0 L${470 + crackProgress * 20},200 L${490 - crackProgress * 30},400 L${480 + crackProgress * 15},600 L${470 - crackProgress * 25},800 L480,1080`}
            stroke="#1a1a1a"
            strokeWidth={3}
            fill="none"
          />
        </svg>

        {/* Label */}
        <div
          style={{
            position: 'absolute',
            top: '8%',
            width: '100%',
            textAlign: 'center',
            opacity: labelOpacity,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: '#9ca3af',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            STATIC RULES
          </div>
          <div style={{ fontSize: 20, color: '#6b7280', marginTop: 8 }}>
            Hard-coded • Rigid • Breakable
          </div>
        </div>
      </div>

      {/* Right Side: Liquid Mercury */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: `${100 - splitX}%`,
          height: '100%',
          background: 'linear-gradient(180deg, #0c1e3a 0%, #0f172a 50%, #020617 100%)',
          opacity: mercuryOpacity,
          overflow: 'hidden',
        }}
      >
        {/* Mercury blobs */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${20 + i * 15 + Math.sin(frame / (10 + i * 3)) * 10}%`,
              top: `${30 + i * 12 + Math.cos(frame / (8 + i * 2)) * 8}%`,
              width: 80 + i * 20 + Math.sin(frame / 12 + i) * 15,
              height: 80 + i * 20 + Math.cos(frame / 10 + i) * 15,
              borderRadius: `${50 + Math.sin(frame / 8 + i) * 20}% ${50 + Math.cos(frame / 9 + i) * 20}% ${50 + Math.sin(frame / 11 + i) * 20}% ${50 + Math.cos(frame / 7 + i) * 20}%`,
              background: `radial-gradient(ellipse at ${30 + Math.sin(frame / 6) * 20}% ${30 + Math.cos(frame / 7) * 20}%, #c0c0c0, #808080, #404040)`,
              boxShadow: `0 0 30px rgba(192,192,192,0.3), inset 0 0 20px rgba(255,255,255,0.2)`,
              transition: 'border-radius 0.3s',
            }}
          />
        ))}

        {/* Flowing lines */}
        <svg
          viewBox="0 0 960 1080"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.3,
          }}
        >
          <path
            d={`M0,${400 + mercuryShift1} Q240,${350 + mercuryShift2} 480,${400 + mercuryShift3} T960,${380 + mercuryShift1}`}
            stroke="#c0c0c0"
            strokeWidth={2}
            fill="none"
          />
          <path
            d={`M0,${600 + mercuryShift2} Q240,${550 + mercuryShift3} 480,${600 + mercuryShift1} T960,${580 + mercuryShift2}`}
            stroke="#a0a0a0"
            strokeWidth={2}
            fill="none"
          />
        </svg>

        {/* Label */}
        <div
          style={{
            position: 'absolute',
            top: '8%',
            width: '100%',
            textAlign: 'center',
            opacity: labelOpacity,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: '#c0c0c0',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            DYNAMIC AI
          </div>
          <div style={{ fontSize: 20, color: '#94a3b8', marginTop: 8 }}>
            Adaptive • Fluid • Like the Terminator
          </div>
        </div>
      </div>

      {/* VS Badge */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${vsScale})`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ef4444, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(139,92,246,0.5)',
            fontSize: 36,
            fontWeight: 900,
            color: 'white',
          }}
        >
          VS
        </div>
      </div>
    </AbsoluteFill>
  );
};
