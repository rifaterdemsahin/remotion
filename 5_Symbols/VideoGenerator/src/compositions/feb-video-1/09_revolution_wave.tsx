
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { User } from 'lucide-react';

export const RevolutionWave: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- CONFIG ---
    // Grid Dimensions
    const COLS = 15;
    const ROWS = 8;
    const GAP_X = 80;
    const GAP_Y = 100;
    
    // Calculate start positions to center the grid
    const gridWidth = (COLS - 1) * GAP_X;
    const gridHeight = (ROWS - 1) * GAP_Y;
    const startX = (width - gridWidth) / 2;
    const startY = (height - gridHeight) / 2 + 50; // Shift down slightly

    // Hero / Source is at bottom center
    const sourceCol = Math.floor(COLS / 2);
    const sourceRow = ROWS - 1;

    // --- ANIMATION TIMING ---
    // 0-30: Grid appears (dim)
    // 30-60: Hero lights up
    // 60-150: Wave spread to top
    // 150-180: Text appears

    // 1. Grid Fade In
    const gridOpacity = interpolate(frame, [0, 20], [0, 1]);

    // Generate Grid Items
    const employees = useMemo(() => {
        const items = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const isHero = r === sourceRow && c === sourceCol;
                
                // Calculate distance from Hero (for wave delay)
                const dx = c - sourceCol;
                const dy = r - sourceRow;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                items.push({
                    id: `${r}-${c}`,
                    r,
                    c,
                    x: startX + c * GAP_X,
                    y: startY + r * GAP_Y,
                    isHero,
                    distance
                });
            }
        }
        return items;
    }, [startX, startY]);


    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
            <AbsoluteFill style={{ 
                background: 'linear-gradient(to top, #1e293b 0%, #0f172a 100%)' 
            }} />

            {/* --- GRID OF EMPLOYEES --- */}
            <div style={{ opacity: gridOpacity }}>
                {employees.map((emp) => {
                    // Logic for lighting up
                    
                    // Wave Logic
                    // Wave starts at frame 60
                    // Speed: 5 frames per unit of distance
                    const waveStart = 60;
                    const waveDelay = emp.distance * 5; 
                    const triggerFrame = waveStart + waveDelay;

                    // Hero lights up earlier (frame 30)
                    const actualTrigger = emp.isHero ? 30 : triggerFrame;

                    const activationSpring = spring({
                        frame: frame - actualTrigger,
                        fps,
                        config: { stiffness: 60, damping: 12 }
                    });

                    // Color:
                    // Dim: #334155 (Slate 700)
                    // Lit: #fbbf24 (Amber 400) or #f59e0b (Amber 500)
                    // Hero: #fbbf24 (Amber 400)
                    
                    // Interpolate color manually or via opacity overlay
                    // Let's us an overlay method for cleaner blending
                    
                    const scale = interpolate(activationSpring, [0, 1], [1, 1.3]);
                    const brightness = interpolate(activationSpring, [0, 1], [1, 2]); // Filter brightness? expensive.
                    
                    // Color Logic
                    // Base Grey
                    const baseColor = '#334155';
                    // Active Color (Gradient based on distance? No, uniform revolution)
                    const activeColor = '#fbbf24';

                    return (
                        <div key={emp.id} style={{
                            position: 'absolute',
                            left: emp.x,
                            top: emp.y,
                            transform: `translate(-50%, -50%) scale(${emp.isHero ? scale * 1.2 : scale})`, // Hero pops more
                            zIndex: emp.isHero ? 10 : 1
                        }}>
                             {/* The Icon */}
                             <div style={{ position: 'relative' }}>
                                 {/* Base Layer (Dim) */}
                                 <User size={40} color={baseColor} />
                                 
                                 {/* Active Layer (Lit) - Fades in */}
                                 <div style={{
                                     position: 'absolute', top:0, left:0,
                                     opacity: interpolate(activationSpring, [0, 1], [0, 1])
                                 }}>
                                     <User size={40} color={activeColor} fill={activeColor} />
                                     
                                     {/* Glow */}
                                     <div style={{
                                         position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                         width: 60, height: 60, backgroundColor: activeColor, borderRadius: '50%',
                                         filter: 'blur(20px)', opacity: 0.6, zIndex: -1
                                     }} />
                                 </div>
                             </div>
                        </div>
                    );
                })}
            </div>

            {/* --- RIPPLE EFFECT FROM HERO --- */}
            {/* Just a visual ring expanding out */}
            {frame > 60 && (
                <div style={{
                     position: 'absolute',
                     left: startX + sourceCol * GAP_X,
                     top: startY + sourceRow * GAP_Y,
                     transform: 'translate(-50%, -50%)',
                }}>
                    <div style={{
                        width: 100, height: 100, borderRadius: '50%',
                        border: '2px solid #fbbf24',
                        opacity: interpolate(frame, [60, 140], [1, 0]),
                        transform: `scale(${interpolate(frame, [60, 140], [0, 20])})` // Expands huge
                    }} />
                </div>
            )}


            {/* --- TEXT OVERLAY --- */}
            {/* Center Top */}
            <div style={{
                position: 'absolute',
                top: height / 2,
                left: width / 2,
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 20,
                opacity: interpolate(frame, [140, 160], [0, 1]) // Appears after wave passes mostly
            }}>
                 <h1 style={{
                     fontSize: 80, fontWeight: 900, margin: 0,
                     background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     textShadow: '0 0 40px rgba(251, 191, 36, 0.4)'
                 }}>
                     START THE REVOLUTION
                 </h1>
                 <h2 style={{
                     color: 'white', fontSize: 40, letterSpacing: 5, marginTop: 10,
                     textTransform: 'uppercase'
                 }}>
                     YOURSELF
                 </h2>
            </div>

        </AbsoluteFill>
    );
};
