
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random } from 'remotion';
import { Folder, Target, Archive, BookOpen, Code, FileText } from 'lucide-react';

// --- DATA ---
const QUADRANTS = [
    { id: 'projects', label: 'Projects', letter: 'P', color: '#3b82f6', icon: Target },
    { id: 'areas', label: 'Areas', letter: 'A', color: '#22c55e', icon: Folder },
    { id: 'resources', label: 'Resources', letter: 'R', color: '#f97316', icon: BookOpen },
    { id: 'archives', label: 'Archives', letter: 'A', color: '#94a3b8', icon: Archive },
];

export const ParaMethod: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- SETUP ---
    // Layout: 2x2 Grid with padding
    const padding = 100;
    const gap = 40;
    const boxWidth = (width - padding * 2 - gap) / 2;
    const boxHeight = (height - padding * 2 - gap) / 2;

    const startX = padding;
    const startY = padding;

    // --- ANIMATIONS ---
    
    // 1. Quadrants Fade In (Staggered)
    // 0, 10, 20, 30
    
    // 2. Items Drop In
    // Random "Files" dropping into quadrants
    // Start at frame 40

    // 3. Connection Lines
    // Frame 100

    // 4. Data Flow Particles
    // Frame 120

    // Generate random files for dropping effect
    const files = useMemo(() => {
        const items = [];
        for(let i=0; i<40; i++) {
             const quadIndex = Math.floor(random(`q-${i}`) * 4);
             items.push({
                 id: i,
                 quadrant: quadIndex,
                 delay: Math.floor(random(`d-${i}`) * 60) + 40, // Start dropping after frame 40
                 xOffset: (random(`x-${i}`) - 0.5) * (boxWidth * 0.6), // Random position inside box
                 icon: random(`icon-${i}`) > 0.5 ? FileText : Code
             });
        }
        return items;
    }, [boxWidth]);


    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
             <AbsoluteFill style={{ 
                background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)' 
            }} />
            
            {/* Title / Header */}
            <div style={{
                position: 'absolute',
                top: 30,
                width: '100%',
                textAlign: 'center',
                zIndex: 20
            }}>
                <h1 style={{ color: 'white', fontSize: 40, margin: 0, opacity: 0.5, letterSpacing: 10 }}>PARA METHOD</h1>
            </div>


            {/* --- QUADRANTS GRID --- */}
            <div style={{
                position: 'absolute',
                top: startY,
                left: startX,
                width: width - padding*2,
                height: height - padding*2,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: gap
            }}>
                {QUADRANTS.map((q, index) => {
                     const enter = spring({
                         frame: frame - (index * 10),
                         fps,
                         config: { stiffness: 60 }
                     });
                     
                     const opacity = interpolate(enter, [0, 1], [0, 1]);
                     const scale = interpolate(enter, [0, 1], [0.9, 1]);
                     const y = interpolate(enter, [0, 1], [50, 0]);
                     
                     return (
                         <div key={q.id} style={{
                             backgroundColor: 'rgba(30, 41, 59, 0.5)',
                             border: `2px solid ${q.color}`,
                             borderRadius: 20,
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center',
                             justifyContent: 'flex-start',
                             padding: 40,
                             opacity,
                             transform: `translateY(${y}px) scale(${scale})`,
                             boxShadow: `0 0 30px ${q.color}20`,
                             position: 'relative',
                             overflow: 'hidden'
                         }}>
                             {/* Large Letter Background */}
                             <div style={{
                                 position: 'absolute',
                                 bottom: -20,
                                 right: -20,
                                 fontSize: 250,
                                 fontWeight: 900,
                                 color: q.color,
                                 opacity: 0.1,
                                 lineHeight: 1
                             }}>
                                 {q.letter}
                             </div>
                             
                             {/* Header */}
                             <div style={{ display: 'flex', alignItems: 'center', gap: 15, zIndex: 2 }}>
                                 <q.icon size={40} color={q.color} />
                                 <h2 style={{ fontSize: 40, margin: 0, color: 'white' }}>{q.label}</h2>
                             </div>
                             
                             {/* Dropping Files Container */}
                             <div style={{ position: 'relative', width: '100%', height: '100%', marginTop: 20 }}>
                                 {files.filter(f => f.quadrant === index).map(file => {
                                     // Drop Animation
                                     const drop = spring({
                                         frame: frame - file.delay,
                                         fps,
                                         config: { damping: 15 } // Bouncy
                                     });
                                     
                                     // Only render if started
                                     if(frame < file.delay) return null;
                                     
                                     const fileY = interpolate(drop, [0, 1], [-200, 100 + (file.id % 5) * 40]); // Stack somewhat
                                     
                                     return (
                                         <div key={file.id} style={{
                                             position: 'absolute',
                                             left: '50%',
                                             marginLeft: file.xOffset,
                                             top: fileY,
                                             opacity: interpolate(drop, [0, 1], [0, 1]),
                                             transform: `scale(${interpolate(drop, [0, 1], [1.5, 1])})`
                                         }}>
                                             <file.icon size={24} color="#cbd5e1" opacity={0.6} />
                                         </div>
                                     );
                                 })}
                             </div>
                         </div>
                     );
                })}
            </div>

            {/* --- CONNECTIONS & DATA FLOW --- */}
            {/* Draw lines between quadrants to show flow (P <-> A <-> R <-> A) */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
                {frame > 80 && (
                    <>
                        {/* Example Flow: Archive <-> Resources */}
                        <FlowLine 
                            x1={width/2 - 200} y1={height/2 + 200} 
                            x2={width/2 + 200} y2={height/2 + 200} 
                            color="#cbd5e1" 
                            delay={80} 
                        />
                         {/* Resources <-> Areas */}
                        <FlowLine 
                            x1={width/2 + 200} y1={height/2 + 150} 
                            x2={width/2 + 200} y2={height/2 - 150} 
                            color="#22c55e" 
                            delay={90} 
                        />
                         {/* Areas <-> Projects */}
                        <FlowLine 
                           x1={width/2 + 150} y1={height/2 - 200} 
                           x2={width/2 - 150} y2={height/2 - 200} 
                           color="#3b82f6" 
                           delay={100} 
                        />
                    </>
                )}
            </svg>
            
            {/* Logos */}
            {/* Obsidian Top Left */}
            <div style={{
                position: 'absolute',
                top: 40,
                left: 40,
                opacity: interpolate(frame, [100, 120], [0, 1]),
                transform: `translateX(${interpolate(frame, [100, 120], [-50, 0])}px)`
            }}>
                 <div style={{ color: '#a855f7', fontWeight: 'bold', fontSize: 24, border: '2px solid #a855f7', padding: '10px 20px', borderRadius: 10 }}>
                     Obsidian
                 </div>
            </div>

            {/* VS Code Bottom Right */}
            <div style={{
                position: 'absolute',
                bottom: 40,
                right: 40,
                opacity: interpolate(frame, [110, 130], [0, 1]),
                 transform: `translateX(${interpolate(frame, [110, 130], [50, 0])}px)`
            }}>
                  <div style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: 24, border: '2px solid #3b82f6', padding: '10px 20px', borderRadius: 10 }}>
                     VS Code
                 </div>
            </div>

        </AbsoluteFill>
    );
};


// Helper Component for Flow Lines with Particles
const FlowLine: React.FC<{ x1: number, y1: number, x2: number, y2: number, color: string, delay: number }> = ({ x1, y1, x2, y2, color, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    // Draw Line
    const progress = spring({
        frame: frame - delay,
        fps,
        config: { stiffness: 40 }
    });
    
    // Particles flowing
    // Loop particle movement 0->1 repeatedly
    const particleT = (frame - delay) / 40; // Speed
    const particleOffset = particleT % 1;
    
    // Lerp particle pos
    const px = x1 + (x2 - x1) * particleOffset;
    const py = y1 + (y2 - y1) * particleOffset;

    return (
        <>
            <line 
                x1={x1} y1={y1} x2={x2} y2={y2} 
                stroke={color} 
                strokeWidth={2} 
                strokeDasharray="10, 10" 
                opacity={0.3 * progress} 
            />
            
            {/* Particle */}
            {progress > 0.5 && (
                <circle 
                    cx={px} 
                    cy={py} 
                    r={6} 
                    fill={color} 
                    shadow={`0 0 10px ${color}`}
                />
            )}
        </>
    );
};
