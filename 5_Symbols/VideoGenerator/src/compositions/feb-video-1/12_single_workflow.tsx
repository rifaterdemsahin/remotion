
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Share2, Zap } from 'lucide-react';

export const SingleWorkflow: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- TIMING ---
    // 0-30: Single Node Appears
    // 30-50: Pulse + "Start Here"
    // 50-90: Duplicates Appear
    // 90-150: Zoom Out + Network growth
    
    // 1. Initial Node
    const initialScale = spring({ frame, fps, config: { stiffness: 120 } });
    
    // Pulse Effect
    const pulse = Math.sin(frame * 0.2) * 0.05 + 1; // 0.95 to 1.05
    
    // 2. Duplication Logic
    // Generate duplicates that fan out
    const clones = useMemo(() => {
        return Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            angle: (i / 6) * 360,
            delay: 50 + (i * 5),
            distance: 250
        }));
    }, []);
    
    // 3. Zoom Out / Camera Move
    const cameraZoom = interpolate(frame, [90, 140], [1, 0.4], { extrapolateRight: 'clamp' });
    const cameraY = interpolate(frame, [90, 140], [0, -100]); // Shift up slightly as we zoom out

    // 4. Text Opacity
    const textOpacity = interpolate(frame, [30, 45, 80, 90], [0, 1, 1, 0]);


    return (
        <AbsoluteFill style={{ backgroundColor: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
             {/* Background Grid */}
             <AbsoluteFill 
                style={{ 
                    backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', 
                    backgroundSize: '40px 40px',
                    transform: `scale(${cameraZoom}) translateY(${cameraY}px)`,
                    transformOrigin: 'center center'
                }} 
             />

             {/* MAIN CONTAINER for Zoom */}
             <div style={{
                 position: 'absolute',
                 left: width/2, top: height/2,
                 width: 0, height: 0, // Center coordinate
                 transform: `scale(${cameraZoom}) translateY(${cameraY}px)`
             }}>

                 {/* CONNECTIONS (Lines) */}
                 <svg style={{ position: 'absolute', left: -width, top: -height, width: width*2, height: height*2, overflow: 'visible' }}>
                     {clones.map((clone) => {
                         const time = frame - clone.delay;
                         if (time < 0) return null;
                         
                         const expansion = spring({ frame: time, fps });
                         const radians = (clone.angle * Math.PI) / 180;
                         const x = Math.cos(radians) * clone.distance * expansion;
                         const y = Math.sin(radians) * clone.distance * expansion;

                         return (
                             <line 
                                key={clone.id}
                                x1={width} y1={height} // Center of SVG (effectively 0 offset)
                                x2={width + x} y2={height + y}
                                stroke="#94a3b8"
                                strokeWidth={4}
                                strokeDasharray="10, 10"
                                opacity={expansion}
                             />
                         );
                     })}
                 </svg>


                 {/* CLONES */}
                 {clones.map((clone) => {
                     const time = frame - clone.delay;
                     if (time < 0) return null;

                     const expansion = spring({ frame: time, fps });
                     
                     const radians = (clone.angle * Math.PI) / 180;
                     const x = Math.cos(radians) * clone.distance * expansion;
                     const y = Math.sin(radians) * clone.distance * expansion;
                     
                     return (
                         <div key={clone.id} style={{
                             position: 'absolute',
                             left: x, top: y,
                             width: 100, height: 100,
                             transform: `translate(-50%, -50%) scale(${expansion})`,
                             backgroundColor: 'white',
                             borderRadius: 20,
                             boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                             display: 'flex', alignItems: 'center', justifyContent: 'center',
                             border: '3px solid #cbd5e1'
                         }}>
                             <Share2 size={50} color="#64748b" />
                         </div>
                     );
                 })}


                 {/* CENTER NODE (The "Seed") */}
                 <div style={{
                     position: 'absolute',
                     transform: `translate(-50%, -50%) scale(${initialScale * pulse})`,
                     width: 140, height: 140,
                     backgroundColor: '#ff6d5a', // n8n orange-ish
                     borderRadius: 30,
                     boxShadow: '0 0 60px rgba(255, 109, 90, 0.4)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     zIndex: 10
                 }}>
                      <Zap size={70} color="white" fill="white" />
                 </div>
                 
                 {/* "START HERE" Label */}
                 <div style={{
                     position: 'absolute',
                     top: 100,
                     left: 0,
                     transform: 'translateX(-50%)',
                     backgroundColor: '#1e293b',
                     color: 'white',
                     padding: '10px 20px',
                     borderRadius: 20,
                     fontWeight: 'bold',
                     opacity: textOpacity,
                     whiteSpace: 'nowrap'
                 }}>
                     Start Here
                     <div style={{ 
                         position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                         width: 0, height: 0, 
                         borderLeft: '8px solid transparent',
                         borderRight: '8px solid transparent',
                         borderBottom: '8px solid #1e293b'
                     }} />
                 </div>

             </div>

             {/* FINAL CTA OVERLAY (Static on screen, ignores zoom) */}
             <div style={{
                 position: 'absolute',
                 bottom: 100,
                 width: '100%',
                 textAlign: 'center',
                 opacity: interpolate(frame, [110, 130], [0, 1])
             }}>
                 <h1 style={{ color: '#1e293b', fontSize: 60, margin: 0 }}>BUILD YOUR FIRST WORKFLOW</h1>
             </div>

        </AbsoluteFill>
    );
};
