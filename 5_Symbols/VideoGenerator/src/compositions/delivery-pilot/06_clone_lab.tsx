import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 4: The Clone Lab
 * Terminal animation showing git clone commands.
 * Getting GitHub repos to your local powerhouse.
 */
export const CloneLab: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Terminal window appearance
  const terminalScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Typing animation for commands
  const commands = [
    { text: '$ cd ~/projects', start: 20, color: '#22c55e' },
    { text: '$ git clone https://github.com/delivery-pilot/template.git', start: 50, color: '#22c55e' },
    { text: 'Cloning into \'template\'...', start: 90, color: '#94a3b8' },
    { text: 'remote: Enumerating objects: 247, done.', start: 105, color: '#94a3b8' },
    { text: 'remote: Counting objects: 100% (247/247), done.', start: 115, color: '#94a3b8' },
    { text: 'Receiving objects: 100% (247/247), 1.24 MiB | 12.4 MiB/s, done.', start: 125, color: '#06b6d4' },
    { text: '✓ Repository cloned successfully!', start: 140, color: '#22c55e' },
    { text: '$ cd template && code .', start: 160, color: '#22c55e' },
    { text: '✓ Opening in VS Code...', start: 180, color: '#a855f7' },
  ];

  // Progress bar
  const cloneProgress = interpolate(frame, [90, 140], [0, 100], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Glow effect
  const glowPulse = Math.sin(frame / 10) * 0.3 + 0.7;

  // Step indicators
  const steps = [
    { label: 'Clone Repository', complete: frame > 140 },
    { label: 'Setup Environment', complete: frame > 170 },
    { label: 'Run Agent', complete: frame > 195 },
  ];

  const stepsOpacity = interpolate(frame, [145, 160], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: "'Fira Code', 'Consolas', monospace",
        overflow: 'hidden',
      }}
    >
      {/* Matrix-like background */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #0a0a0a 100%)',
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '4%',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: '#22c55e',
            margin: 0,
            letterSpacing: 6,
            fontFamily: 'Inter, sans-serif',
            textShadow: `0 0 ${glowPulse * 30}px rgba(34,197,94,0.4)`,
            opacity: interpolate(frame, [0, 15], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          THE CLONE LAB
        </h1>
      </div>

      {/* Terminal Window */}
      <div
        style={{
          position: 'absolute',
          top: '13%',
          left: '8%',
          right: '8%',
          bottom: '22%',
          transform: `scale(${terminalScale})`,
          transformOrigin: 'top center',
        }}
      >
        {/* Terminal title bar */}
        <div
          style={{
            height: 40,
            backgroundColor: '#1e293b',
            borderRadius: '10px 10px 0 0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            gap: 8,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#fbbf24' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{ color: '#64748b', fontSize: 14, marginLeft: 20 }}>
            terminal — delivery-pilot
          </span>
        </div>

        {/* Terminal body */}
        <div
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderTop: 'none',
            borderRadius: '0 0 10px 10px',
            padding: '20px 25px',
            height: 'calc(100% - 40px)',
            overflow: 'hidden',
          }}
        >
          {commands.map((cmd, i) => {
            const charCount = cmd.text.length;
            const typedChars = Math.floor(
              interpolate(frame, [cmd.start, cmd.start + charCount * 0.4], [0, charCount], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              })
            );
            const isVisible = frame >= cmd.start;

            if (!isVisible) return null;

            return (
              <div
                key={i}
                style={{
                  fontSize: 20,
                  color: cmd.color,
                  marginBottom: 6,
                  lineHeight: 1.6,
                  opacity: interpolate(frame, [cmd.start, cmd.start + 5], [0, 1], {
                    extrapolateRight: 'clamp',
                    extrapolateLeft: 'clamp',
                  }),
                }}
              >
                {cmd.text.substring(0, typedChars)}
                {typedChars < charCount && (
                  <span
                    style={{
                      backgroundColor: '#22c55e',
                      width: 10,
                      height: 22,
                      display: 'inline-block',
                      marginLeft: 2,
                      opacity: Math.sin(frame / 3) > 0 ? 1 : 0,
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* Clone progress bar */}
          {frame >= 90 && frame <= 145 && (
            <div style={{ marginTop: 15 }}>
              <div
                style={{
                  width: '80%',
                  height: 8,
                  backgroundColor: '#1e293b',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${cloneProgress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #22c55e, #06b6d4)',
                    borderRadius: 4,
                  }}
                />
              </div>
              <div style={{ color: '#64748b', fontSize: 14, marginTop: 5 }}>
                {cloneProgress.toFixed(0)}% complete
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step checklist */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 60,
          opacity: stepsOpacity,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: `3px solid ${step.complete ? '#22c55e' : '#475569'}`,
                backgroundColor: step.complete ? '#22c55e' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
                transition: 'all 0.3s',
              }}
            >
              {step.complete ? '✓' : i + 1}
            </div>
            <span
              style={{
                fontSize: 20,
                color: step.complete ? '#22c55e' : '#64748b',
                fontWeight: step.complete ? 700 : 400,
              }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
