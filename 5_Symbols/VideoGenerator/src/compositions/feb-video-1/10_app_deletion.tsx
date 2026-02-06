
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random } from 'remotion';
import { Youtube, Instagram, Twitter, Bot, Brain, Database, Cloud } from 'lucide-react';

export const AppDeletion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- CONFIG ---
    // Timing
    // 0-20: Shake starts
    // 20, 40, 60: Explode 1, 2, 3
    // 80: Replacements appear
    
    // Icons Config
    const APPS = [
        { id: 1, name: 'YouTube', icon: Youtube, color: '#ef4444', deleteFrame: 20 },
        { id: 2, name: 'Instagram', icon: Instagram, color: '#e1306c', deleteFrame: 40 },
        { id: 3, name: 'Twitter', icon: Twitter, color: '#1da1f2', deleteFrame: 60 },
    ];
    
    const REPLACEMENTS = [
        { id: 1, name: 'AI Agent', icon: Bot, color: '#10b981' },
        { id: 2, name: 'Knowledge', icon: Database, color: '#8b5cf6' },
        { id: 3, name: 'Cloud', icon: Cloud, color: '#3b82f6' },
    ];

    // Phone Container Scaling
    const phoneScale = spring({ frame, fps, config: { damping: 15 } });

    // Shake Animation (Wiggle)
    // Create a continuous sine wave for shake
    const wiggle = Math.sin(frame * 0.8) * 4; // +/- 4 degrees


    // Particle Explosion Generator
    const particles = useMemo(() => {
        const parts = [];
        APPS.forEach(app => {
            for(let i=0; i<20; i++) {
                parts.push({
                    appId: app.id,
                    xDir: (random(`x-${app.id}-${i}`) - 0.5) * 200,
                    yDir: (random(`y-${app.id}-${i}`) - 0.5) * 200,
                    scale: random(`s-${app.id}-${i}`) * 0.5 + 0.5,
                    color: app.color,
                    speed: random(`sp-${app.id}-${i}`) * 2 + 1
                });
            }
        });
        return parts;
    }, []);


    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily: 'Inter, sans-serif', alignItems: 'center', justifyContent: 'center' }}>
            <AbsoluteFill style={{ background: '#1e293b' }} />

            {/* --- PHONE MOCKUP --- */}
            <div style={{
                width: 450,
                height: 800,
                backgroundColor: '#0f172a',
                borderRadius: 40,
                border: '8px solid #334155',
                transform: `scale(${interpolate(phoneScale, [0, 1], [0.8, 1])})`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 80,
                overflow: 'hidden'
            }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, width: 200, height: 30, backgroundColor: '#334155', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />

                {/* Grid of Apps */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 30,
                    width: '85%'
                }}>
                    {APPS.map((app, index) => {
                        const isDeleted = frame > app.deleteFrame;
                        
                        // Scale Down / Pop Effect
                        const deleteProgress = spring({
                            frame: frame - app.deleteFrame,
                            fps,
                            config: { stiffness: 100, damping: 10 }
                        });
                        
                        // Shake only if not deleted
                        const rotate = isDeleted ? 0 : wiggle + ((index % 2===0 ? 1 : -1) * 2);
                        const scale = isDeleted ? interpolate(deleteProgress, [0, 1], [1, 0]) : 1;
                        
                        return (
                           <div key={app.id} style={{ position: 'relative', width: 80, height: 80 }}>
                               
                               {/* The Old App */}
                               <div style={{
                                   width: '100%', height: '100%',
                                   backgroundColor: app.color,
                                   borderRadius: 18,
                                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                                   transform: `rotate(${rotate}deg) scale(${scale})`,
                                   position: 'absolute',
                                   zIndex: 2
                               }}>
                                   <app.icon color="white" size={40} />
                                   
                                   {/* Delete Badge "X" */}
                                   {!isDeleted && (
                                       <div style={{
                                           position: 'absolute', top: -5, left: -5,
                                           width: 24, height: 24, borderRadius: '50%',
                                           backgroundColor: '#cbd5e1', color: '#1f2937',
                                           display: 'flex', alignItems: 'center', justifyContent: 'center',
                                           fontSize: 16, fontWeight: 'bold'
                                       }}>
                                           -
                                       </div>
                                   )}
                               </div>

                               {/* The Replacement App (Fade In) */}
                               {isDeleted && (
                                   <div style={{
                                        width: '100%', height: '100%',
                                        backgroundColor: REPLACEMENTS[index].color,
                                        borderRadius: 18,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transform: `scale(${interpolate(frame - app.deleteFrame - 10, [0, 20], [0, 1], { extrapolateRight: 'clamp' })})`,
                                        position: 'absolute',
                                        zIndex: 1,
                                        opacity: interpolate(frame - app.deleteFrame - 10, [0, 10], [0, 1])
                                   }}>
                                       <div style={{
                                           width: '100%', height: '100%',
                                           borderRadius: 18,
                                           display: 'flex', alignItems: 'center', justifyContent: 'center',
                                           boxShadow: `0 0 20px ${REPLACEMENTS[index].color}`
                                       }}>
                                           {React.createElement(REPLACEMENTS[index].icon, { color: 'white', size: 40 })}
                                       </div>
                                   </div>
                               )}
                               
                               {/* Explosion Particles */}
                               {isDeleted && particles.filter(p => p.appId === app.id).map((p, i) => {
                                   const explosionTime = frame - app.deleteFrame;
                                   const opacity = interpolate(explosionTime, [0, 20], [1, 0]);
                                   const x = interpolate(explosionTime, [0, 20], [0, p.xDir]);
                                   const y = interpolate(explosionTime, [0, 20], [0, p.yDir]);
                                   
                                   return (
                                       <div key={i} style={{
                                           position: 'absolute',
                                           top: '50%', left: '50%',
                                           width: 8 * p.scale, height: 8 * p.scale,
                                           backgroundColor: p.color,
                                           borderRadius: '50%',
                                           transform: `translate(${x}px, ${y}px)`,
                                           opacity,
                                           pointerEvents: 'none',
                                           zIndex: 10
                                       }} />
                                   );
                               })}

                           </div> 
                        );
                    })}
                </div>
            </div>

            {/* --- TEXT OVERLAY --- */}
            <div style={{
                position: 'absolute',
                bottom: 80,
                textAlign: 'center',
                opacity: interpolate(frame, [80, 100], [0, 1])
            }}>
                <h1 style={{ color: 'white', fontSize: 60, margin: 0, fontWeight: 800 }}>REFOCUS</h1>
                <h2 style={{ color: '#94a3b8', fontSize: 32, letterSpacing: 2 }}>YOUR ENERGY</h2>
            </div>
            
        </AbsoluteFill>
    );
};
