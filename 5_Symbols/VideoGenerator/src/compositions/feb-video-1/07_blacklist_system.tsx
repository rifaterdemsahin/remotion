
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random } from 'remotion';
import { Shield, AlertTriangle, FileSpreadsheet, CheckCircle, ShieldAlert } from 'lucide-react';

export const BlacklistSystem: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- TIMING CONFIG ---
    // 0-30: Intro (Sheets + Shield appear)
    // 30-120: Errors fly in and bounce
    // 120-180: Success flow
    
    // --- ANIMATIONS ---
    
    // 1. Intro Elements
    const introSpring = spring({ frame, fps, config: { damping: 12 } });
    const sheetX = interpolate(introSpring, [0, 1], [-200, 200]);
    const sheetOpacity = interpolate(introSpring, [0, 1], [0, 1]);
    
    const shieldScale = interpolate(spring({ frame: frame - 10, fps, config: { stiffness: 60 } }), [0, 1], [0, 1.2]);


    // 2. ERROR PARTICLES
    // Generate random stream of errors
    // They fly from Sheet (Left) -> Shield (Center)
    // Hit shield around X=Center
    const ERRORS_COUNT = 15;
    const errors = useMemo(() => {
        return Array.from({ length: ERRORS_COUNT }).map((_, i) => ({
            id: i,
            delay: 30 + (i * 5), // Staggered start
            yOffset: (random(`ery-${i}`) - 0.5) * 400, // Spread vertically
            speed: 0.8 + random(`ers-${i}`) * 0.4 // Random speed
        }));
    }, []);
    
    // 3. SUCCESS PARTICLES
    const SUCCESS_COUNT = 10;
    const successItems = useMemo(() => {
        return Array.from({ length: SUCCESS_COUNT }).map((_, i) => ({
             id: i, 
             delay: 80 + (i * 8), // Start appearing after some errors hit
             yOffset: (random(`scy-${i}`) - 0.5) * 300,
        }));
    }, []);


    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
             <AbsoluteFill style={{ 
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
            }} />

            {/* HEADER TEXT */}
            <div style={{
                position: 'absolute',
                top: 50,
                width: '100%',
                textAlign: 'center',
                opacity: interpolate(frame, [0, 20], [0, 1])
            }}>
                 <h1 style={{ color: '#f87171', fontSize: 50, margin: 0, fontWeight: 800 }}>ERROR PREVENTION</h1>
                 <h2 style={{ color: '#cbd5e1', fontSize: 30, marginTop: 10 }}>AUTOMATED BLACKLIST FILTERING</h2>
            </div>
            
            {/* CONTAINER FOR FLOW */}
            <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                
                {/* --- LEFT: SOURCE (SHEETS) --- */}
                <div style={{
                    position: 'absolute',
                    left: sheetX,
                    top: height / 2 - 60,
                    opacity: sheetOpacity,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: 120, height: 120, backgroundColor: '#10b981', borderRadius: 20,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
                    }}>
                        <FileSpreadsheet size={70} color="white" />
                    </div>
                    <div style={{ color: '#cbd5e1', marginTop: 15, fontWeight: 'bold' }}>Input Stream</div>
                </div>


                {/* --- CENTER: SHIELD --- */}
                <div style={{
                    position: 'absolute',
                    left: width / 2,
                    top: height / 2,
                    transform: `translate(-50%, -50%) scale(${shieldScale})`,
                    zIndex: 10
                }}>
                     <div style={{ position: 'relative' }}>
                        <Shield size={250} color="#3b82f6" fill="#1e3a8a" strokeWidth={1.5} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <ShieldAlert size={100} color="#60a5fa" />
                        </div>
                     </div>
                </div>


                {/* --- ERROR PARTICLES --- */}
                {errors.map((err) => {
                    // Logic: Move from Left (200) to Center (Width/2 - 100)
                    // Then "Bounce" or Disappear
                    
                    const time = frame - err.delay;
                    if (time < 0) return null;
                    
                    // Travel time approx 40 frames
                    const travelProgress = interpolate(time, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
                    
                    const startX = 350;
                    const endX = width / 2 - 120; // Hit the shield
                    
                    const currentX = interpolate(travelProgress, [0, 1], [startX, endX]);
                    const currentY = height/2 + err.yOffset;
                    
                    // BOUNCE / IMPACT EFFECT
                    // If travelProgress >= 1, we hit. 
                    const isHit = travelProgress >= 1;
                    const hitTime = time - 40;
                    
                    // Scale down / fade out on hit
                    const scale = isHit 
                        ? interpolate(hitTime, [0, 10], [1, 0]) 
                        : 1;
                    
                    const opacity = isHit 
                        ? interpolate(hitTime, [0, 10], [1, 0]) 
                        : 1;

                    // Little "recoil" on X if hit
                    const recoilX = isHit ? interpolate(hitTime, [0, 5], [0, -50]) : 0;

                    return (
                        <div key={err.id} style={{
                            position: 'absolute',
                            left: currentX + recoilX,
                            top: currentY,
                            transform: `scale(${scale})`,
                            opacity,
                        }}>
                             <AlertTriangle size={40} color="#ef4444" fill="#7f1d1d" />
                        </div>
                    );
                })}


                {/* --- SUCCESS PARTICLES (RIGHT SIDE) --- */}
                {/* Emerge from Shield, move Right */}
                {successItems.map((item) => {
                     const time = frame - item.delay;
                     if(time < 0) return null;
                     
                     const moveProgress = interpolate(time, [0, 60], [0, 1]);
                     
                     const startX = width / 2 + 100;
                     const endX = width - 200;
                     
                     const currentX = interpolate(moveProgress, [0, 1], [startX, endX]);
                     const currentY = height/2 + item.yOffset;
                     
                     const opacity = interpolate(moveProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

                     return (
                        <div key={item.id} style={{
                            position: 'absolute',
                            left: currentX,
                            top: currentY,
                            opacity,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10
                        }}>
                             <CheckCircle size={30} color="#22c55e" fill="#064e3b" />
                             {/* Occasionally show text? */}
                             {item.id % 3 === 0 && (
                                 <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: 14 }}>VERIFIED</span>
                             )}
                        </div>
                     );
                })}

                {/* --- RIGHT: DESTINATION --- */}
                <div style={{
                    position: 'absolute',
                    right: 100,
                    top: height / 2 - 50,
                    opacity: interpolate(frame, [60, 80], [0, 1]), // Fades in later
                    border: '2px dashed #22c55e',
                    padding: '20px 40px',
                    borderRadius: 20,
                    color: '#22c55e',
                    fontWeight: 700
                }}>
                    VALIDATED DATA
                </div>

            </div>
        </AbsoluteFill>
    );
};
