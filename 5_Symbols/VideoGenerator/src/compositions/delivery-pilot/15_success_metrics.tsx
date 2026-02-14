import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

/**
 * Scene 9: Success Metrics
 * CI/CD pipeline, 37 times broken, compliance, accuracy, self-growth.
 * "Every change is a CI/CD pipeline deployment"
 */
export const SuccessMetrics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Break counter
  const breakCount = Math.floor(
    interpolate(frame, [20, 60], [0, 37], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    })
  );

  // Counter flash on each increment
  const counterPulse = breakCount === 37 ? Math.sin(frame / 4) * 0.1 + 1 : 1;

  // Pipeline stages
  const stages = [
    { name: 'Commit', icon: '📝', color: '#3B82F6', delay: 40 },
    { name: 'Build', icon: '🔨', color: '#F59E0B', delay: 55 },
    { name: 'Test', icon: '🧪', color: '#8B5CF6', delay: 70 },
    { name: 'Deploy', icon: '🚀', color: '#22C55E', delay: 85 },
    { name: 'Live!', icon: '🌐', color: '#06B6D4', delay: 100 },
  ];

  // Metrics cards
  const metrics = [
    { name: 'Compliance', value: '100%', color: '#22C55E', delay: 110 },
    { name: 'Accuracy', value: '99.2%', color: '#3B82F6', delay: 120 },
    { name: 'Self-Growth', value: '∞', color: '#8B5CF6', delay: 130 },
  ];

  // Pipeline progress line
  const pipelineProgress = interpolate(frame, [40, 100], [0, 100], {
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
      {/* Grid background */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '4%',
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
        }}
      >
        <h1 style={{ fontSize: 52, fontWeight: 900, color: 'white', margin: 0 }}>
          SUCCESS METRICS
        </h1>
        <p style={{ fontSize: 22, color: '#94a3b8', marginTop: 8 }}>
          Every change is a CI/CD pipeline deployment
        </p>
      </div>

      {/* Break Counter */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          transform: `translate(-50%, 0) scale(${counterPulse})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#1e293b',
            border: '2px solid #EF444440',
            borderRadius: 20,
            padding: '20px 50px',
            display: 'inline-block',
          }}
        >
          <div style={{ fontSize: 24, color: '#94a3b8', marginBottom: 5 }}>System Broken</div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: '#EF4444',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}
          >
            {breakCount}
          </div>
          <div style={{ fontSize: 20, color: '#64748b', marginTop: 5 }}>times while adding features</div>
        </div>
      </div>

      {/* CI/CD Pipeline */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          right: '10%',
        }}
      >
        {/* Progress line */}
        <div
          style={{
            position: 'absolute',
            top: 35,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: '#1e293b',
            borderRadius: 2,
          }}
        >
          <div
            style={{
              width: `${pipelineProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #3B82F6, #22C55E)',
              borderRadius: 2,
              boxShadow: '0 0 10px rgba(34,197,94,0.5)',
            }}
          />
        </div>

        {/* Stage nodes */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {stages.map((stage, i) => {
            const stageScale = spring({
              frame: frame - stage.delay,
              fps,
              config: { damping: 12, mass: 0.5 },
            });
            const isActive =
              pipelineProgress >= (i / (stages.length - 1)) * 100;

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: `scale(${stageScale})`,
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    backgroundColor: isActive ? stage.color : '#1e293b',
                    border: `3px solid ${stage.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 30,
                    boxShadow: isActive ? `0 0 20px ${stage.color}40` : 'none',
                  }}
                >
                  {stage.icon}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 18,
                    fontWeight: 700,
                    color: isActive ? stage.color : '#475569',
                  }}
                >
                  {stage.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '15%',
          right: '15%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {metrics.map((metric, i) => {
          const metricScale = spring({
            frame: frame - metric.delay,
            fps,
            config: { damping: 12, mass: 0.5 },
          });
          return (
            <div key={i} style={{ transform: `scale(${metricScale})`, textAlign: 'center' }}>
              <div
                style={{
                  backgroundColor: '#1e293b',
                  border: `2px solid ${metric.color}30`,
                  borderRadius: 16,
                  padding: '20px 40px',
                }}
              >
                <div
                  style={{
                    fontSize: 44,
                    fontWeight: 900,
                    color: metric.color,
                    marginBottom: 8,
                  }}
                >
                  {metric.value}
                </div>
                <div style={{ fontSize: 18, color: '#94a3b8', fontWeight: 600 }}>{metric.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
