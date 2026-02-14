import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 5: Free Tier Evolution
 * VS Code → GitHub → Cursor AI tool evolution.
 * "Start with zero capital."
 */
export const FreeTierTools: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tools = [
    {
      name: 'Visual Studio Code',
      subtitle: 'The Standard Kit',
      color: '#007ACC',
      icon: '{ }',
      delay: 15,
      tier: 'FREE',
    },
    {
      name: 'GitHub',
      subtitle: 'Version Control + CI/CD',
      color: '#6e5494',
      icon: '⑂',
      delay: 50,
      tier: 'FREE',
    },
    {
      name: 'GitHub Copilot',
      subtitle: 'Your Pair Pilot',
      color: '#1F883D',
      icon: '✦',
      delay: 85,
      tier: 'PAID',
    },
    {
      name: 'Cursor AI',
      subtitle: 'Local Agentic Workflows',
      color: '#8B5CF6',
      icon: '⟐',
      delay: 120,
      tier: 'PRO',
    },
  ];

  // Evolution arrow
  const arrowProgress = interpolate(frame, [40, 140], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Title
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // "Zero Capital" badge
  const badgeScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, mass: 0.5 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
        }}
      >
        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: 'white',
            margin: 0,
          }}
        >
          THE FREE TIER JOURNEY
        </h1>
        <div
          style={{
            display: 'inline-block',
            marginTop: 15,
            transform: `scale(${badgeScale})`,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: '#22c55e',
              border: '2px solid #22c55e',
              padding: '6px 20px',
              borderRadius: 20,
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            START WITH ZERO CAPITAL
          </span>
        </div>
      </div>

      {/* Tool cards */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '5%',
          right: '5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {tools.map((tool, i) => {
          const cardScale = spring({
            frame: frame - tool.delay,
            fps,
            config: { damping: 12, mass: 0.6 },
          });

          const cardOpacity = interpolate(frame, [tool.delay, tool.delay + 15], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });

          const isActive = frame >= tool.delay;
          const hover = isActive ? Math.sin(frame / 15 + i) * 5 : 0;

          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Evolution arrow between cards */}
              {i > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${5 + (i - 0.5) * (90 / tools.length)}%`,
                    top: '35%',
                    transform: 'translate(-50%, -50%)',
                    opacity: interpolate(frame, [tool.delay - 15, tool.delay], [0, 0.6], {
                      extrapolateRight: 'clamp',
                      extrapolateLeft: 'clamp',
                    }),
                    fontSize: 40,
                    color: '#475569',
                  }}
                >
                  →
                </div>
              )}

              <div
                style={{
                  transform: `scale(${cardScale}) translateY(${hover}px)`,
                  opacity: cardOpacity,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 15,
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${tool.color}, ${tool.color}88)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 48,
                    color: 'white',
                    boxShadow: `0 0 30px ${tool.color}40`,
                    fontWeight: 'bold',
                  }}
                >
                  {tool.icon}
                </div>

                {/* Card */}
                <div
                  style={{
                    backgroundColor: '#1e293b',
                    border: `2px solid ${tool.color}40`,
                    borderRadius: 16,
                    padding: '25px 30px',
                    textAlign: 'center',
                    width: 280,
                  }}
                >
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: 'white',
                      marginBottom: 8,
                    }}
                  >
                    {tool.name}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: '#94a3b8',
                      marginBottom: 12,
                    }}
                  >
                    {tool.subtitle}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: 14,
                      fontWeight: 700,
                      color: tool.tier === 'FREE' ? '#22c55e' : tool.tier === 'PAID' ? '#fbbf24' : '#8b5cf6',
                      backgroundColor:
                        tool.tier === 'FREE'
                          ? 'rgba(34,197,94,0.15)'
                          : tool.tier === 'PAID'
                          ? 'rgba(251,191,36,0.15)'
                          : 'rgba(139,92,246,0.15)',
                      padding: '4px 14px',
                      borderRadius: 12,
                      letterSpacing: 2,
                    }}
                  >
                    {tool.tier}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evolution label */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            width: '60%',
            height: 4,
            backgroundColor: '#1e293b',
            margin: '0 auto 20px',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${arrowProgress * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #007ACC, #6e5494, #1F883D, #8B5CF6)',
              borderRadius: 2,
            }}
          />
        </div>
        <p
          style={{
            fontSize: 24,
            color: '#64748b',
            margin: 0,
            fontStyle: 'italic',
            opacity: interpolate(frame, [100, 120], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          "I swap between all three — think of it like an evolution"
        </p>
      </div>
    </AbsoluteFill>
  );
};
