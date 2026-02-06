
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';
import { Bot } from 'lucide-react';

export const WorkforceCounter: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- Configuration ---
    const TOTAL_BOTS = 240;
    const DURATION_FRAMES = 90; // 3 seconds
    const COUNT_DURATION = 60;  // Count takes 2 seconds
    
    // Grid Setup
    const COLS = 20;
    const ROWS = 12; // 20 * 12 = 240
    const ICON_SIZE = 35;
    const GRID_GAP = 10;
    
    // Calculate Grid Dimensions
    const gridWidth = COLS * ICON_SIZE + (COLS - 1) * GRID_GAP;
    const gridHeight = ROWS * ICON_SIZE + (ROWS - 1) * GRID_GAP;
    
    const startX = (width - gridWidth) / 2;
    const startY = (height - gridHeight) / 2;

    // --- Animations ---
    
    // 1. Counter Logic
    // Interpolate frame 0 -> 60 to 0 -> 240
    const countProgress = spring({
        frame,
        fps,
        config: { stiffness: 50, damping: 10 }
    });
    
    // Ensure we don't exceed 240 and handle the "+" sign logic visually later
    const currentCount = Math.min(Math.round(interpolate(countProgress, [0, 1], [0, TOTAL_BOTS])), TOTAL_BOTS);
    
    // 2. Pulse Animation for the end
    const pulse = Math.sin(frame / 5) * 0.05 + 1; // Gentle scale 0.95 to 1.05
    const isPulseActive = frame > COUNT_DURATION + 10;

    // Generate Bot Icon Positions
    const bots = useMemo(() => {
        return Array.from({ length: TOTAL_BOTS }).map((_, i) => {
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            return {
                id: i,
                x: startX + col * (ICON_SIZE + GRID_GAP),
                y: startY + row * (ICON_SIZE + GRID_GAP),
            };
        });
    }, [startX, startY]);

    return (
        <AbsoluteFill style={{ 
            backgroundColor: '#0f172a', // Slate-900 background
            color: 'white',
            fontFamily: 'Inter, system-ui, sans-serif'
        }}>
            {/* Background Gradient */}
            <AbsoluteFill style={{
                background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
                zIndex: 0
            }} />

            {/* --- The Grid of Bots --- */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                transform: isPulseActive ? `scale(${pulse})` : 'none',
                transformOrigin: 'center center',
                transition: 'transform 0.1s linear' // Smooth out the pulse if needed
            }}>
                {bots.map((bot) => {
                    // Each bot appears when the count reaches its index
                    // We stagger them slightly based on the count progress
                    
                    // Determine if this specific bot is visible yet
                    const isVisible = bot.id < currentCount;
                    
                    if (!isVisible && frame < COUNT_DURATION) return null;

                    // Compute individual entrance spring
                    // The 'triggerFrame' is roughly mapped to when the count hits this number
                    // Since count is driven by a spring, let's look at the index fraction
                    const triggerRatio = bot.id / TOTAL_BOTS;
                    const triggerFrame = triggerRatio * COUNT_DURATION * 0.8; // Accelerate entrance slightly

                    const entrance = spring({
                        frame: frame - triggerFrame,
                        fps,
                        config: { mass: 0.5, stiffness: 150, damping: 12 }
                    });

                    // Random fly-in start position (scattered) used for interpolate
                    // Or keep it simple: Scale up from 0
                    const scale = interpolate(entrance, [0, 1], [0, 1]);
                    const opacity = interpolate(entrance, [0, 1], [0, 1]);

                    return (
                        <div
                            key={bot.id}
                            style={{
                                position: 'absolute',
                                left: bot.x,
                                top: bot.y,
                                width: ICON_SIZE,
                                height: ICON_SIZE,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: `scale(${scale})`,
                                opacity,
                            }}
                        >
                            <Bot 
                                size={ICON_SIZE} 
                                color={bot.id > 200 ? '#38bdf8' : (bot.id > 100 ? '#818cf8' : '#6366f1')} 
                                // Gradient effect across the grid by changing colors
                                strokeWidth={2}
                            />
                        </div>
                    );
                })}
            </div>

            {/* --- Large Counter Overlay --- */}
            <AbsoluteFill style={{
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10,
                textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
                <div style={{
                    textAlign: 'center',
                    background: 'rgba(15, 23, 42, 0.6)', // Semi-transparent backing
                    padding: '20px 60px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <h1 style={{
                        fontSize: '120px',
                        fontWeight: 900,
                        margin: 0,
                        fontVariantNumeric: 'tabular-nums', // Fixed width numbers to avoid jitter
                        background: 'linear-gradient(to right, #60a5fa, #c084fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        {currentCount}
                        {currentCount === TOTAL_BOTS ? '+' : ''}
                    </h1>
                    <h2 style={{
                        marginTop: 10,
                        fontSize: '40px',
                        fontWeight: 600,
                        color: '#cbd5e1',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        Autonomous Workflows
                    </h2>
                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
