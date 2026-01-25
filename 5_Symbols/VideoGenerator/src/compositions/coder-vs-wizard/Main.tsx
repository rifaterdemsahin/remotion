import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { z } from 'zod';

export const coderVsWizardSchema = z.object({
  // Add props if needed in the future
});

const BulletPoint = ({ 
  text, 
  delay, 
  align,
  color,
  font
}: { 
  text: string; 
  delay: number; 
  align: 'left' | 'right';
  color: string;
  font: string;
}) => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame - delay, [0, 20], [50, 0], { extrapolateRight: 'clamp' });
  
  if (frame < delay) return null;

  return (
    <div style={{
      opacity,
      transform: `translateY(${translateY}px)`,
      marginBottom: 30,
      fontFamily: font,
      fontSize: 50,
      fontWeight: 'bold',
      color: color,
      textShadow: align === 'right' ? '0 0 15px rgba(255,255,255,0.6)' : 'none',
      width: '100%',
      textAlign: 'center',
    }}>
      {text}
    </div>
  );
};

export const CoderVsWizardMain: React.FC<z.infer<typeof coderVsWizardSchema>> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing constants (approximate based on flow)
  const START_LEFT = 20;
  const START_RIGHT = 300;
  const EXPAND_START = 700; 

  // Transition Animation
  const progress = spring({ 
    frame: frame - EXPAND_START, 
    fps, 
    config: { damping: 200, stiffness: 100 } 
  });
  
  // Left width shrinks from 50% to 0%
  const leftWidthPct = interpolate(progress, [0, 1], [50, 0], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{ flexDirection: 'row', backgroundColor: '#000000' }}>
       
       {/* LEFT SIDE: OLD CODER */}
       <div style={{
          width: `${leftWidthPct}%`,
          height: '100%',
          backgroundColor: '#2a2a2a', // Dark Gray Monochrome
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          borderRight: '4px solid #000',
          zIndex: 10,
       }}>
          {/* Content Wrapper to avoid squishing during transition */}
          <div style={{ minWidth: '540px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              color: '#666666',
              fontSize: 40,
              marginBottom: 20,
              fontWeight: 600,
              letterSpacing: '4px',
              textTransform: 'uppercase'
            }}>
              BEFORE AGENTS
            </h2>
            <h1 style={{ 
              fontFamily: 'Courier New, Courier, monospace', 
              color: '#aaaaaa', 
              fontSize: 80, 
              marginBottom: 80,
              letterSpacing: '-2px',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              OLD CODER 👨‍💻
            </h1>
            
            <BulletPoint text="jQuery 📜" delay={START_LEFT} align="left" color="#888888" font="Courier New, Courier, monospace"/>
            <BulletPoint text="Specific Syntax 🧱" delay={START_LEFT + 60} align="left" color="#888888" font="Courier New, Courier, monospace"/>
            <BulletPoint text="C++ 🐢" delay={START_LEFT + 120} align="left" color="#888888" font="Courier New, Courier, monospace"/>
          </div>
       </div>

       {/* RIGHT SIDE: NEW WIZARD */}
       <div style={{
          position: 'absolute',
          right: 0,
          width: `${100 - leftWidthPct}%`,
          height: '100%',
          background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)', // Deep Purple
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          zIndex: 5,
       }}>
          
          {/* Background Effects */}
          <AbsoluteFill style={{ zIndex: -1, opacity: 0.3 }}>
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(189,0,255,1) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(50px)',
              transform: 'translate(-50%, -50%)',
            }} />
          </AbsoluteFill>

          {/* Initial Wizard Content */}
          <div style={{ 
            opacity: interpolate(progress, [0, 0.3], [1, 0], { extrapolateRight: 'clamp' }),
            transform: `scale(${interpolate(progress, [0, 0.3], [1, 0.9])})`,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
          }}>
             <h2 style={{
                fontFamily: 'Inter, sans-serif',
                color: '#bd00ff',
                fontSize: 40,
                marginBottom: 20,
                fontWeight: 600,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                textShadow: '0 0 10px rgba(189,0,255,0.4)',
             }}>
                AFTER AGENTS
             </h2>
             <h1 style={{ 
                fontFamily: 'Inter, sans-serif', 
                color: '#00ffff', 
                fontSize: 90, 
                marginBottom: 80,
                textShadow: '0 0 20px rgba(0,255,255,0.8)',
                letterSpacing: '2px',
                fontWeight: 900,
                textAlign: 'center'
             }}>
                NEW WIZARD 🧙‍♂️
             </h1>
             <BulletPoint text="Testing 🧪" delay={START_RIGHT} align="right" color="#e0e0e0" font="Inter, sans-serif"/>
             <BulletPoint text="Operations 🚀" delay={START_RIGHT + 60} align="right" color="#e0e0e0" font="Inter, sans-serif"/>
             <BulletPoint text="Creative Solver 🎨" delay={START_RIGHT + 120} align="right" color="#e0e0e0" font="Inter, sans-serif"/>
          </div>

          {/* Final Text (Revealed on expansion) */}
          <div style={{
             position: 'absolute',
             opacity: interpolate(progress, [0.4, 1], [0, 1]),
             transform: `scale(${interpolate(progress, [0.4, 1], [0.8, 1])})`,
             textAlign: 'center',
             width: '80%',
          }}>
              <h1 style={{
                 fontSize: 120,
                 color: '#ffffff',
                 textShadow: '0 0 40px rgba(189,0,255,0.6)',
                 fontFamily: 'Inter, sans-serif', 
                 lineHeight: 1.1,
                 fontWeight: 800,
                 margin: 0
              }}>
                 SOLUTIONS FOR
                 <br/>
                 <span style={{ 
                   color: 'transparent', 
                   backgroundImage: 'linear-gradient(90deg, #00ffff, #bd00ff)', 
                   backgroundClip: 'text', 
                   WebkitBackgroundClip: 'text' 
                 }}>
                   TANGLED SYSTEMS
                 </span>
              </h1>
          </div>
       </div>
    </AbsoluteFill>
  );
};
