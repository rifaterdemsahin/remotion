
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Database, Server, Smartphone, Lightbulb, Code } from 'lucide-react';

export const McpProtocol: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- TIMING ---
    // 0-40: Blurred Code appears
    // 40-70: MCP Icon descends
    // 70-110: Transform Code -> Nodes
    // 110-150: Connections & Pulse
    
    // --- ANIMATIONS ---
    
    // 1. BLURRED CODE
    // Start visible, then fade out / morph
    const codeOpacity = interpolate(frame, [70, 90], [1, 0]);
    const codeBlur = interpolate(frame, [0, 40], [10, 2]); // Start very blurry, become clearer, then disappear
    
    // 2. MCP ICON
    const mcpDrop = spring({
        frame: frame - 40,
        fps,
        config: { damping: 15 }
    });
    const mcpY = interpolate(mcpDrop, [0, 1], [-200, 150]);
    
    // 3. NODES REVEAL
    // They scale up as code fades out
    const nodesScale = interpolate(spring({ frame: frame - 80, fps }), [0, 1], [0, 1]);
    
    // 4. CONNECTIONS
    const connProgress = spring({ frame: frame - 100, fps, config: { stiffness: 40 } });
    
    // 5. PULSE BRAIN
    const pulseSpring = spring({ frame: frame - 110, fps, config: { stiffness: 100, damping: 5 } });
    const pulseScale = interpolate(pulseSpring, [0, 1], [0, 1.2]);


    // MOCK CODE BLOCKS positions matching node positions approx
    const items = [
        { id: 1, x: width/2 - 300, y: height/2 + 100, icon: Database, label: 'PostgreSQL', code: "import pg from 'pg';\nconst client = new pg.d..." },
        { id: 2, x: width/2 + 300, y: height/2 + 100, icon: Smartphone, label: 'Mobile Consumer', code: "function renderView() {\n  return <View>...</View>\n}" },
        { id: 3, x: width/2, y: height/2 + 250, icon: Server, label: 'API Gateway', code: "app.get('/api', (req) => {\n  return status(200);\n});" },
    ];


    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
            <AbsoluteFill style={{ 
                background: 'linear-gradient(to bottom, #0f172a, #111827)' 
            }} />

            {/* --- MCP ICON (Protocol) --- */}
            <div style={{
                position: 'absolute',
                top: mcpY,
                left: width / 2,
                transform: 'translateX(-50%)',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    width: 100, height: 100, backgroundColor: '#fbbf24', borderRadius: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 50px rgba(251, 191, 36, 0.5)'
                }}>
                    <div style={{ fontSize: 40, fontWeight: 900, color: '#78350f' }}>MCP</div>
                </div>
                <div style={{ color: '#fbbf24', marginTop: 10, fontWeight: 'bold' }}>Model Context Protocol</div>
            </div>


            {/* --- CONTENT AREA --- */}
            
            {/* 1. CODE BLOCKS (The "Before") */}
            <div style={{ opacity: codeOpacity }}>
                {items.map((item, i) => (
                    <div key={item.id} style={{
                        position: 'absolute',
                        left: item.x,
                        top: item.y,
                        width: 200,
                        height: 120,
                        backgroundColor: '#1e293b',
                        borderRadius: 8,
                        padding: 10,
                        transform: 'translate(-50%, -50%)',
                        filter: `blur(${codeBlur}px)`,
                        border: '1px solid #334155',
                        display: 'flex',
                        gap: 10
                    }}>
                        <Code size={20} color="#64748b" />
                        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#94a3b8', lineHeight: 1.4 }}>
                            {item.code}
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. NODES (The "After") */}
            <div style={{ transform: `scale(${nodesScale})`, opacity: interpolate(frame, [70, 90], [0, 1]) }}>
                {/* Draw Connections first (behind nodes) */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                     {/* Connect MCP to items */}
                     {items.map(item => {
                         const startX = width/2;
                         const startY = 150 + 50; // Bottom of MCP
                         const endX = item.x;
                         const endY = item.y - 40; // Top of node
                         
                         return (
                             <line 
                                key={item.id}
                                x1={startX} y1={startY} x2={endX} y2={endY}
                                stroke="#fbbf24"
                                strokeWidth={2}
                                strokeDasharray="1000"
                                strokeDashoffset={1000 * (1 - connProgress)}
                                opacity={0.6}
                             />
                         );
                     })}
                     
                     {/* Connect Items to each other (mesh) */}
                     {items.map((item1, i) => items.map((item2, j) => {
                         if (i >= j) return null;
                         return (
                            <line 
                                key={`${i}-${j}`}
                                x1={item1.x} y1={item1.y} x2={item2.x} y2={item2.y}
                                stroke="#475569"
                                strokeWidth={1}
                                strokeDasharray="5, 5"
                                opacity={0.3 * connProgress}
                             /> 
                         )
                     }))}
                </svg>

                {items.map((item) => (
                    <div key={item.id} style={{
                        position: 'absolute',
                        left: item.x,
                        top: item.y,
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            width: 80, height: 80, backgroundColor: '#334155', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '2px solid #94a3b8',
                            boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                        }}>
                             <item.icon size={40} color="white" />
                        </div>
                        <div style={{ marginTop: 10, color: 'white', fontWeight: 600 }}>{item.label}</div>
                    </div>
                ))}
            </div>


            {/* --- OVERLAY TEXT --- */}
             <div style={{
                position: 'absolute',
                top: height / 2,
                left: width / 2,
                transform: `translate(-50%, -50%) scale(${pulseScale})`,
                opacity: interpolate(frame, [110, 120], [0, 1]),
                zIndex: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                 <div style={{
                     background: 'rgba(16, 185, 129, 0.1)',
                     border: '1px solid #10b981',
                     padding: '20px 40px',
                     borderRadius: 100,
                     backdropFilter: 'blur(10px)',
                     boxShadow: '0 0 50px rgba(16, 185, 129, 0.2)'
                 }}>
                     <h2 style={{ color: '#34d399', fontSize: 40, margin: 0 }}>NO CODE WRITING REQUIRED</h2>
                 </div>
                 
                 <div style={{ marginTop: 20 }}>
                     <Lightbulb size={60} color="#34d399" fill="#34d399" />
                 </div>
            </div>

        </AbsoluteFill>
    );
};
