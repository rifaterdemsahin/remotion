import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 8: n8n Bespoke Logic
 * Workflow automation with n8n showing MAC-address-based traffic control.
 * Dashboard on GitHub Pages for wife to manage.
 */
export const N8nBespokeLogic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const N8N_ORANGE = '#FF6D5A';
  const N8N_PINK = '#E8437C';

  // Title entrance
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Workflow nodes appearing
  const nodes = [
    { name: 'Telegram\nTrigger', x: 150, y: 400, color: '#0088CC', delay: 20 },
    { name: 'Check\nMAC', x: 450, y: 400, color: N8N_ORANGE, delay: 35 },
    { name: 'Router\nAPI', x: 750, y: 300, color: '#22C55E', delay: 50 },
    { name: 'Block\nTraffic', x: 750, y: 500, color: '#EF4444', delay: 50 },
    { name: 'GitHub\nPages UI', x: 1050, y: 400, color: '#6E5494', delay: 65 },
    { name: 'Email\nNotify', x: 1350, y: 300, color: '#3B82F6', delay: 80 },
    { name: 'Audit\nLog', x: 1350, y: 500, color: '#8B5CF6', delay: 80 },
  ];

  // Connection lines
  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 4, to: 6 },
  ];

  // Data pulse along connections
  const pulseOffset = (frame * 3) % 100;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* n8n style grid bg */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,109,90,0.05) 1px, transparent 0)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '3%',
          width: '100%',
          textAlign: 'center',
          transform: `scale(${titleScale})`,
          zIndex: 20,
        }}
      >
        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            margin: 0,
            background: `linear-gradient(135deg, ${N8N_ORANGE}, ${N8N_PINK})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          BESPOKE LOGIC
        </h1>
        <p style={{ fontSize: 22, color: '#94a3b8', marginTop: 5 }}>
          n8n Workflow: Internet Access Manager
        </p>
      </div>

      {/* Connection lines */}
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5 }}
      >
        {connections.map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          const lineOpacity = interpolate(
            frame,
            [Math.max(fromNode.delay, toNode.delay), Math.max(fromNode.delay, toNode.delay) + 15],
            [0, 0.5],
            { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
          );

          return (
            <g key={i}>
              <line
                x1={fromNode.x + 60}
                y1={fromNode.y}
                x2={toNode.x - 60}
                y2={toNode.y}
                stroke={N8N_ORANGE}
                strokeWidth={2}
                opacity={lineOpacity}
                strokeDasharray="8 4"
              />
              {/* Data pulse dot */}
              {lineOpacity > 0.3 && (
                <circle
                  cx={interpolate(
                    (pulseOffset + i * 20) % 100,
                    [0, 100],
                    [fromNode.x + 60, toNode.x - 60]
                  )}
                  cy={interpolate(
                    (pulseOffset + i * 20) % 100,
                    [0, 100],
                    [fromNode.y, toNode.y]
                  )}
                  r={4}
                  fill={N8N_ORANGE}
                  opacity={0.8}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Workflow nodes */}
      {nodes.map((node, i) => {
        const nodeScale = spring({
          frame: frame - node.delay,
          fps,
          config: { damping: 12, mass: 0.5 },
        });
        const nodeOpacity = interpolate(frame, [node.delay, node.delay + 10], [0, 1], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });
        const hover = Math.sin(frame / 15 + i) * 3;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: node.x - 60,
              top: node.y - 35 + hover,
              width: 120,
              transform: `scale(${nodeScale})`,
              opacity: nodeOpacity,
              zIndex: 10,
            }}
          >
            <div
              style={{
                backgroundColor: '#0f172a',
                border: `2px solid ${node.color}`,
                borderRadius: 12,
                padding: '12px 10px',
                textAlign: 'center',
                boxShadow: `0 0 15px ${node.color}30`,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: node.color,
                  whiteSpace: 'pre-line',
                  lineHeight: 1.3,
                }}
              >
                {node.name}
              </div>
            </div>
          </div>
        );
      })}

      {/* MAC Address display */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: interpolate(frame, [90, 110], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
          zIndex: 20,
        }}
      >
        <div
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #334155',
            borderRadius: 8,
            padding: '10px 25px',
            fontFamily: "'Fira Code', monospace",
            fontSize: 16,
            color: '#64748b',
          }}
        >
          Target MAC: <span style={{ color: '#EF4444' }}>AA:BB:CC:DD:EE:FF</span> →{' '}
          <span style={{ color: '#EF4444', fontWeight: 700 }}>BLOCKED</span>
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: 'absolute',
          bottom: '4%',
          width: '100%',
          textAlign: 'center',
          opacity: interpolate(frame, [110, 130], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        <p style={{ fontSize: 22, color: N8N_ORANGE, margin: 0, fontWeight: 600 }}>
          "My wife can manage it without facing a complex system"
        </p>
      </div>
    </AbsoluteFill>
  );
};
