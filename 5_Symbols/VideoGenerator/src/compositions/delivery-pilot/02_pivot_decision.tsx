import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 2: The Pivot Decision
 * Host pivots from complex engineering to no-code tools.
 * "Delivery Pilot" concept introduction.
 */
export const PivotDecision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Old path fading out
  const oldPathOpacity = interpolate(frame, [0, 30, 60, 80], [0, 1, 1, 0.2], {
    extrapolateRight: 'clamp',
  });

  // New path appearing
  const newPathOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Arrow pivot animation
  const arrowRotation = spring({
    frame: frame - 40,
    fps,
    from: 0,
    to: -90,
    config: { damping: 15, stiffness: 100 },
  });

  // "240 Workflows" counter
  const workflowCount = Math.floor(
    interpolate(frame, [10, 40], [0, 240], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    })
  );

  // Pivot text
  const pivotTextScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Bottom text
  const bottomOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const crossOutWidth = interpolate(frame, [55, 75], [0, 100], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Gradient bg */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        }}
      />

      {/* Old Path - Complex Engineering */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          opacity: oldPathOpacity,
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#ef4444',
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          OLD PATH
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            fontVariantNumeric: 'tabular-nums',
            color: '#64748b',
            position: 'relative',
          }}
        >
          {workflowCount}
          <span style={{ fontSize: 36, marginLeft: 10 }}>Workflows</span>
          {/* Cross-out line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: `${crossOutWidth}%`,
              height: 6,
              backgroundColor: '#ef4444',
              transform: 'translateY(-50%)',
            }}
          />
        </div>
        <div style={{ fontSize: 22, color: '#475569', maxWidth: 500 }}>
          Complex engineering concepts scaring people off
        </div>
      </div>

      {/* Pivot Arrow */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${arrowRotation}deg)`,
          zIndex: 10,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="55"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="4"
            opacity={0.5}
          />
          <path
            d="M40,60 L80,60 M70,45 L85,60 L70,75"
            stroke="#8b5cf6"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* New Path - No Code Builder */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '10%',
          opacity: newPathOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 15,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#22c55e',
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          NEW PATH
        </div>
        <div
          style={{
            transform: `scale(${pivotTextScale})`,
            transformOrigin: 'right center',
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 900,
              margin: 0,
              background: 'linear-gradient(to right, #22c55e, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'right',
            }}
          >
            DELIVERY PILOT
          </h1>
        </div>
        <div
          style={{
            fontSize: 26,
            color: '#94a3b8',
            textAlign: 'right',
            maxWidth: 500,
          }}
        >
          No code. No technical background needed.
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: 'absolute',
          bottom: '4%',
          width: '100%',
          textAlign: 'center',
          opacity: bottomOpacity,
        }}
      >
        <p style={{ fontSize: 24, color: '#64748b', margin: 0, fontStyle: 'italic' }}>
          Building tools for the AI age — for everyone
        </p>
      </div>
    </AbsoluteFill>
  );
};
