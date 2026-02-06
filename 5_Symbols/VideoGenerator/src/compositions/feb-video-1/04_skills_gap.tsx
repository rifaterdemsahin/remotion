
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, interpolateColors } from 'remotion';
import { Brain, User, Zap, ArrowRight, Layers } from 'lucide-react';

export const SkillsGap: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- TIMING CONFIG ---
    // Total Duration: 180 frames (6 seconds)
    // 0-30: Intro bars
    // 30-80: Gap Widens
    // 80-120: Bridge Appears
    // 120-160: Equalize / Glow Green
    
    // --- ANIMATION VALUES ---

    // 1. INTRO
    const introProgress = spring({
        frame,
        fps,
        config: { damping: 12 }
    });

    // 2. GAP WIDENS
    // The gap effectively moves the Human capability down or keeps it low while AI stays high
    // Let's visualize vertical bars side-by-side or separated horizontally?
    // Description says "Right side vs Left side", gap widens.
    // Let's start them relatively close, then move them apart.
    const gapSpring = spring({
        frame: frame - 30, // Start widening at 1s
        fps,
        config: { stiffness: 40, damping: 10 }
    });
    
    // Initial distance 200px, widens to 600px
    const gapDistance = interpolate(gapSpring, [0, 1], [0, 500]);
    // Center is width/2. Left bar moves left, Right bar moves right.
    // Left X: width/2 - 100 - (gap/2)
    // Right X: width/2 + 100 + (gap/2)
    
    const leftBarX = (width / 2) - 150 - (gapDistance / 2);
    const rightBarX = (width / 2) + 150 + (gapDistance / 2);


    // 3. BAR HEIGHTS & COLORS
    // AI Capability (Left): Always Full (100%)
    const aiHeight = 700; 
    
    // Human Delivery (Right): Starts Low (20%), eventually matches
    const equalizeSpring = spring({
        frame: frame - 110, // Start equalizing at ~3.7s
        fps,
        config: { mass: 2, damping: 15 }
    });
    
    const humanProgress = interpolate(equalizeSpring, [0, 1], [0.25, 1]); // 25% -> 100%
    const humanHeight = aiHeight * humanProgress;

    // Colors
    // Red -> Green for Human
    // Blue -> Green for AI (or Blue stays Blue until sync?)
    // "Both bars equalize and glow green"
    const aiColor = interpolateColors(equalizeSpring, [0, 1], ['#3b82f6', '#22c55e']); // Blue -> Green
    const humanColor = interpolateColors(equalizeSpring, [0, 1], ['#ef4444', '#22c55e']); // Red -> Green
    
    // Glow Intensity
    const glowIntensity = interpolate(equalizeSpring, [0, 1], [0, 40]);


    // 4. BRIDGE APPEARANCE (Agentic System)
    // Appears in the middle.
    const bridgeSpring = spring({
        frame: frame - 80, // Start at 2.6s
        fps,
        config: { stiffness: 80 }
    });

    const bridgeScale = interpolate(bridgeSpring, [0, 1], [0, 1]);
    const bridgeOpacity = interpolate(bridgeSpring, [0, 1], [0, 1]);
    
    // Connector Lines
    // Draw lines from bridge to bars
    const lineDraw = interpolate(bridgeSpring, [0, 1], [0, 1]);
    const bridgeY = height / 2;
    const bridgeWidth = 300;

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', color: 'white', fontFamily: 'Inter, sans-serif' }}>
            
            <AbsoluteFill style={{ 
                background: 'linear-gradient(to bottom, #0f172a, #1e293b)' 
            }} />

            {/* --- LEFT BAR: AI CAPABILITY --- */}
            <div style={{
                position: 'absolute',
                left: leftBarX,
                bottom: (height - aiHeight) / 2,
                width: 140,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: 'translateX(-50%)',
                opacity: introProgress 
            }}>
                <div style={{ marginBottom: 20, textAlign: 'center' }}>
                    <div style={{ 
                        background: 'rgba(59, 130, 246, 0.2)', padding: 20, borderRadius: '50%', marginBottom: 10,
                        border: `2px solid ${aiColor}`,
                        boxShadow: `0 0 ${20}px ${aiColor}40`
                    }}>
                        <Brain size={50} color={aiColor} />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: '#e2e8f0', whiteSpace: 'nowrap' }}>AI Capability</h2>
                </div>
                
                {/* Bar Container */}
                <div style={{
                    width: '100%',
                    height: aiHeight,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid #334155'
                }}>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: aiColor,
                        boxShadow: `0 0 ${glowIntensity}px ${aiColor}`,
                        transition: 'background-color 0.1s'
                    }} />
                    
                    {/* Tech markings */}
                    <div style={{ position: 'absolute', top: 20, right: 10, color: 'rgba(0,0,0,0.3)', fontWeight: 'bold' }}>100%</div>
                </div>
            </div>


            {/* --- RIGHT BAR: HUMAN DELIVERY --- */}
            <div style={{
                position: 'absolute',
                left: rightBarX,
                bottom: (height - aiHeight) / 2, // Align bottom with AI
                width: 140,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: 'translateX(-50%)',
                opacity: introProgress 
            }}>
                <div style={{ marginBottom: 20, textAlign: 'center' }}>
                     <div style={{ 
                        background: 'rgba(239, 68, 68, 0.1)', padding: 20, borderRadius: '50%', marginBottom: 10,
                        border: `2px solid ${humanColor}`,
                        boxShadow: `0 0 ${20}px ${humanColor}40`
                    }}>
                        <User size={50} color={humanColor} />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: '#e2e8f0', whiteSpace: 'nowrap' }}>Human Delivery</h2>
                </div>
                
                {/* Bar Container */}
                <div style={{
                    width: '100%',
                    height: aiHeight, // Container matches AI height
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid #334155'
                }}>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: humanHeight, // Dynamic Height
                        backgroundColor: humanColor,
                        boxShadow: `0 0 ${glowIntensity}px ${humanColor}`,
                         transition: 'background-color 0.1s'
                    }} />
                     {/* Tech markings */}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: humanHeight + 10, 
                        width: '100%', 
                        textAlign: 'center',
                        color: humanColor, 
                        fontWeight: 'bold',
                        opacity: humanProgress < 0.95 ? 1 : 0
                    }}>
                        {Math.round(humanProgress * 100)}%
                    </div>
                </div>
            </div>


            {/* --- BRIDGE / AGENTIC SYSTEM --- */}
            <div style={{
                position: 'absolute',
                top: height / 2,
                left: width / 2,
                transform: `translate(-50%, -50%) scale(${bridgeScale})`,
                opacity: bridgeOpacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10
            }}>
                {/* Connecting Lines (Behind Icon) */}
                <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: width, height: 200, zIndex: -1, overflow: 'visible' }}>
                     {/* Left Line */}
                     <line 
                        x1={-bridgeWidth/2}
                        y1={0}
                        x2={leftBarX - (width/2) + 70} // Connect to edge of bar
                        y2={0}
                        stroke="#fbbf24"
                        strokeWidth={4}
                        strokeDasharray="10, 10"
                        opacity={0.6}
                     />
                     {/* Right Line */}
                     <line 
                        x1={bridgeWidth/2}
                        y1={0}
                        x2={rightBarX - (width/2) - 70} 
                        y2={0}
                         stroke="#fbbf24"
                        strokeWidth={4}
                        strokeDasharray="10, 10"
                        opacity={0.6}
                     />
                     
                     {/* Flowing particles? Simpler: Just opacity pulse on lines? */}
                </svg>

                {/* Main Badge */}
                <div style={{
                    backgroundColor: '#1e293b',
                    border: '4px solid #fbbf24', // Amber
                    borderRadius: 20,
                    padding: '20px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    boxShadow: '0 0 50px rgba(251, 191, 36, 0.4)'
                }}>
                    <Layers size={60} color="#fbbf24" />
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800, color: 'white' }}>AGENTIC</h1>
                        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: '#fbbf24', letterSpacing: 2 }}>SYSTEM</h2>
                    </div>
                    <Zap size={40} color="#fbbf24" fill="#fbbf24" style={{ marginLeft: 10 }} />
                </div>
                
                <div style={{
                    marginTop: 20,
                    background: '#22c55e',
                    color: '#003300',
                    padding: '8px 20px',
                    borderRadius: 20,
                    fontWeight: 'bold',
                    opacity: interpolate(equalizeSpring, [0, 0.5], [0, 1]) // Fade in label
                }}>
                    OPTIMIZING...
                </div>
            </div>

        </AbsoluteFill>
    );
};
