import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 6: Internet Kill Switch
 * GitHub-powered workflow that controls kids' internet.
 * "Giant red off-lever" for the internet.
 */
export const InternetKillSwitch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Lever animation
  const leverPull = spring({
    frame: frame - 80,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 60 },
  });
  const leverAngle = interpolate(leverPull, [0, 1], [0, -45]);

  // Signal dots
  const signalOpacity = frame > 100 ? interpolate(leverPull, [0, 0.5, 1], [1, 0.5, 0.1]) : 1;

  // Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // GitHub logo pulse
  const githubPulse = Math.sin(frame / 12) * 0.1 + 1;
  const githubGlow = Math.sin(frame / 12) * 10 + 20;

  // Nightlight warm glow
  const warmGlow = Math.sin(frame / 15) * 0.05 + 0.3;

  // Devices
  const devices = [
    { name: 'Kid 1 Tablet', x: 300, y: 500, connected: frame < 95 },
    { name: 'Kid 2 Phone', x: 550, y: 580, connected: true },
    { name: 'Smart TV', x: 800, y: 450, connected: frame < 95 },
  ];

  // "OFF" flash
  const offFlash =
    frame > 95
      ? interpolate(
          frame - 95,
          [0, 5, 10, 15],
          [1, 0.5, 1, 0.8],
          { extrapolateRight: 'clamp' }
        )
      : 0;

  // Bottom text
  const bottomOpacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Warm room ambience */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 70% 30%, rgba(255,215,0,${warmGlow}) 0%, transparent 50%), linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)`,
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
          zIndex: 20,
        }}
      >
        <h1 style={{ fontSize: 52, fontWeight: 900, color: '#ef4444', margin: 0 }}>
          THE INTERNET KILL SWITCH
        </h1>
        <p style={{ fontSize: 22, color: '#94a3b8', marginTop: 8 }}>
          A parent's consistency shield — powered by GitHub
        </p>
      </div>

      {/* GitHub Nightlight */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          transform: `scale(${githubPulse})`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 ${githubGlow}px rgba(255,215,0,0.5)`,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: 10,
            fontSize: 16,
            color: '#fbbf24',
            fontWeight: 600,
          }}
        >
          NIGHTLIGHT
        </div>
      </div>

      {/* Big Red Lever */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          zIndex: 15,
        }}
      >
        {/* Lever base */}
        <div
          style={{
            width: 80,
            height: 40,
            backgroundColor: '#374151',
            borderRadius: 8,
            position: 'relative',
          }}
        >
          {/* Lever arm */}
          <div
            style={{
              position: 'absolute',
              bottom: 15,
              left: '50%',
              width: 16,
              height: 120,
              backgroundColor: '#ef4444',
              borderRadius: 8,
              transformOrigin: 'bottom center',
              transform: `translateX(-50%) rotate(${leverAngle}deg)`,
              boxShadow: '0 0 15px rgba(239,68,68,0.5)',
            }}
          >
            {/* Lever knob */}
            <div
              style={{
                position: 'absolute',
                top: -15,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 35,
                height: 35,
                borderRadius: '50%',
                backgroundColor: '#dc2626',
                border: '3px solid #b91c1c',
              }}
            />
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: 10,
            fontSize: 14,
            color: '#ef4444',
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          {frame > 95 ? 'OFF' : 'ON'}
        </div>
      </div>

      {/* Devices */}
      {devices.map((device, i) => {
        const deviceAppear = spring({
          frame: frame - 30 - i * 15,
          fps,
          config: { damping: 12 },
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: device.x,
              top: device.y,
              transform: `scale(${deviceAppear})`,
              textAlign: 'center',
            }}
          >
            {/* Signal waves */}
            <div
              style={{
                position: 'absolute',
                top: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                opacity: device.connected ? signalOpacity : 0.1,
              }}
            >
              {[0, 1, 2].map((w) => (
                <div
                  key={w}
                  style={{
                    width: 8 + w * 12,
                    height: 8 + w * 12,
                    border: `2px solid ${device.connected ? '#22c55e' : '#ef4444'}`,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.6 - w * 0.15,
                  }}
                />
              ))}
            </div>
            {/* Device icon */}
            <div
              style={{
                width: 80,
                height: 55,
                backgroundColor: device.connected ? '#1e293b' : '#1a1a1a',
                border: `2px solid ${device.connected ? '#22c55e' : '#ef4444'}`,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                opacity: device.connected ? 1 : 0.4 + offFlash * 0.3,
              }}
            >
              {i === 0 ? '📱' : i === 1 ? '📲' : '📺'}
            </div>
            <div
              style={{
                fontSize: 14,
                color: device.connected ? '#94a3b8' : '#ef4444',
                marginTop: 8,
                fontWeight: 600,
              }}
            >
              {device.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: device.connected ? '#22c55e' : '#ef4444',
                fontWeight: 700,
              }}
            >
              {device.connected ? '● CONNECTED' : '○ BLOCKED'}
            </div>
          </div>
        );
      })}

      {/* Bottom quote */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          width: '100%',
          textAlign: 'center',
          opacity: bottomOpacity,
        }}
      >
        <p style={{ fontSize: 24, color: '#fbbf24', margin: 0, fontStyle: 'italic' }}>
          "It might start a fight, but we know what we're doing"
        </p>
      </div>
    </AbsoluteFill>
  );
};
