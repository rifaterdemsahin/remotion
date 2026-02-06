
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random } from 'remotion';

// --- Types & Config ---
type Node = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    type: 'trigger' | 'action' | 'logic';
};

type Connection = {
    id: string;
    from: string;
    to: string;
    delay: number; // For animation stagger
};

const COLORS = {
    trigger: '#FF6D5A', // Orange (n8n triggerish)
    action: '#4080FF',  // Blue
    logic: '#2ECC71',   // Green
    bg: '#1C1C1C',      // Dark canvas
    grid: '#333333',
    line: '#999999',
    lineActive: '#FFD700', // Gold for active pulse
};

// --- Helper to generate a random graph ---
const generateGraph = (count: number, canvasWidth: number, canvasHeight: number) => {
    const nodes: Node[] = [];
    const connections: Connection[] = [];
    
    // Create clusters of workflows
    const columns = 8;
    const rows = 6;
    const cellW = canvasWidth / columns;
    const cellH = canvasHeight / rows;

    let nodeIdCounter = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Center of this workflow cluster
            const cx = c * cellW + cellW / 2;
            const cy = r * cellH + cellH / 2;
            
            // Randomize position slightly
            const clusterX = cx + (random(`x-${r}-${c}`) - 0.5) * 200;
            const clusterY = cy + (random(`y-${r}-${c}`) - 0.5) * 200;

            // Generate a linear-ish chain for this "workflow"
            const length = Math.floor(random(`len-${r}-${c}`) * 5) + 3; // 3 to 8 nodes per workflow
            
            let prevNodeId: string | null = null;

            for (let i = 0; i < length; i++) {
                const id = `node-${nodeIdCounter++}`;
                // First node is trigger, others random action/logic
                const type = i === 0 ? 'trigger' : (random(`type-${id}`) > 0.7 ? 'logic' : 'action');
                
                // Position relative to cluster center + offset
                const nx = clusterX + i * 180 + (random(`nx-${id}`) - 0.5) * 40;
                const ny = clusterY + (random(`ny-${id}`) - 0.5) * 100;

                nodes.push({
                    id,
                    x: nx,
                    y: ny,
                    width: 140,
                    height: 60,
                    color: COLORS[type],
                    type
                });

                if (prevNodeId) {
                    connections.push({
                        id: `conn-${prevNodeId}-${id}`,
                        from: prevNodeId,
                        to: id,
                        delay: random(`del-${prevNodeId}`) * 30 // Random delay for animation
                    });
                }
                prevNodeId = id;
            }
        }
    }
    return { nodes, connections };
};

export const N8nMammothZoom: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // The virtual canvas is much larger than the screen
    const CANVAS_WIDTH = 4000;
    const CANVAS_HEIGHT = 3000;

    // Generate graph once
    const { nodes, connections } = useMemo(() => 
        generateGraph(0, CANVAS_WIDTH, CANVAS_HEIGHT), 
    []);

    // Pick a "Hero Node" to start focused on (e.g., node-10, somewhere in top left)
    const heroNode = nodes[10] || nodes[0];

    // --- ZOOM ANIMATION ---
    const ZOOM_DURATION = 150; // 5 seconds of zoom
    
    // Scale: Start at 2.5 (very close), Zoom out to 0.4 (see huge chunks)
    const zoomProgress = spring({
        frame,
        fps,
        config: { mass: 2, damping: 50, stiffness: 20 }
    });
    
    const scale = interpolate(zoomProgress, [0, 1], [2.5, 0.45]);
    
    // Translate: 
    // At Scale 2.5, we want Hero Node at center of screen (width/2, height/2)
    // Formula: Translate = ScreenCenter - (HeroPosition * Scale)
    // But as we zoom out, we want to drift to the center of the CANVAS
    
    const virtualCenterX = CANVAS_WIDTH / 2;
    const virtualCenterY = CANVAS_HEIGHT / 2;

    const targetX = interpolate(zoomProgress, [0, 1], [heroNode.x, virtualCenterX]);
    const targetY = interpolate(zoomProgress, [0, 1], [heroNode.y, virtualCenterY]);

    // Calculate actual transform values
    // To center 'targetX' on screen:
    // translateX = (ScreenW / 2) - (targetX * scale) // No this is applying scale to translation too if applied on container
    // Easier approach: Transform Origin top-left.
    // X = (ScreenW / 2) - (targetX)
    
    // Actually, let's interpolate the "Focus Point" (tx, ty) and then compute matrix
    const translateX = (width / 2) - (targetX * scale);
    const translateY = (height / 2) - (targetY * scale);


    // --- CONNECTION ANIMATION ---
    // Lines draw in as we zoom out
    
    // --- TEXT OVERLAY ---
    const textOpacity = interpolate(frame, [60, 90], [0, 1]);


    return (
        <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#111' }}>
            
            {/* --- CANVAS CONTAINER --- */}
            <div style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                transformOrigin: '0 0',
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
                position: 'absolute',
                backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                backgroundSize: '40px 40px', // Grid dots
            }}>
                
                {/* Connections (Bottom Layer) */}
                <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                    {connections.map((conn) => {
                        const fromNode = nodes.find(n => n.id === conn.from)!;
                        const toNode = nodes.find(n => n.id === conn.to)!;
                        
                        // Bezier path: Start Right of From, End Left of To
                        const startX = fromNode.x + fromNode.width;
                        const startY = fromNode.y + fromNode.height / 2;
                        const endX = toNode.x;
                        const endY = toNode.y + toNode.height / 2;
                        
                        const cp1x = startX + (endX - startX) * 0.5;
                        const cp1y = startY;
                        const cp2x = endX - (endX - startX) * 0.5;
                        const cp2y = endY;

                        const pathD = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
                        
                        // Animation: Dash offset
                        const length = Math.abs(endX - startX) + Math.abs(endY - startY); // Approx length for dash
                        
                        // We want lines to light up based on frame.
                        // Stagger based on distance from hero node? Or just random staggered sequence?
                        // Let's use the 'id' numeric part to stagger roughly left-to-right
                        const stagger = parseInt(conn.to.split('-')[1]) * 2; 
                        
                        const drawProgress = spring({
                            frame: frame - 20 - stagger,
                            fps,
                            config: { stiffness: 60, damping: 15 }
                        });
                        
                        if (drawProgress <= 0) return null;

                        return (
                            <path 
                                key={conn.id}
                                d={pathD}
                                stroke={COLORS.line}
                                strokeWidth={4}
                                fill="none"
                                strokeDasharray={length}
                                strokeDashoffset={length * (1 - drawProgress)}
                                strokeLinecap="round"
                            />
                        );
                    })}
                </svg>

                {/* Nodes (Top Layer) */}
                {nodes.map((node) => {
                    // Slight parallax or just nice styling
                    return (
                        <div
                            key={node.id}
                            style={{
                                position: 'absolute',
                                left: node.x,
                                top: node.y,
                                width: node.width,
                                height: node.height,
                                backgroundColor: '#2D2D2D',
                                border: '1px solid #555',
                                borderRadius: '8px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Header Strip */}
                            <div style={{
                                width: '100%',
                                height: '6px',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                backgroundColor: node.color
                            }} />
                            
                            {/* Content Mockup */}
                            <div style={{ padding: '8px', display: 'flex', gap: '5px', alignItems: 'center', height: '100%' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#444' }} />
                                <div style={{ flex: 1, height: '8px', backgroundColor: '#444', borderRadius: '2px' }} />
                            </div>

                            {/* IO Dots */}
                            {node.type !== 'trigger' && (
                                <div style={{ 
                                    position: 'absolute', left: -5, top: '50%', marginTop: -5, 
                                    width: 10, height: 10, borderRadius: '50%', backgroundColor: '#777' 
                                }} />
                            )}
                            <div style={{ 
                                position: 'absolute', right: -5, top: '50%', marginTop: -5, 
                                width: 10, height: 10, borderRadius: '50%', backgroundColor: '#777' 
                            }} />

                        </div>
                    );
                })}


            </div>

            {/* --- OVERLAYS (Fixed to Screen) --- */}
            
            {/* Vignette */}
            <AbsoluteFill style={{
                background: 'radial-gradient(circle at center, transparent 40%, #000 100%)',
                opacity: 0.6,
                pointerEvents: 'none'
            }} />

            {/* Text Overlay */}
            <div style={{
                position: 'absolute',
                top: 100,
                left: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: textOpacity,
                transform: `translateY(${interpolate(textOpacity, [0, 1], [30, 0])}px)`
            }}>
                <h1 style={{
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 100,
                    fontWeight: 900,
                    textShadow: '0 0 30px rgba(0,0,0,0.8)',
                    margin: 0
                }}>
                    240 <span style={{ color: '#FFD700' }}>Active</span> Workflows
                </h1>
                <div style={{
                    marginTop: 20,
                    padding: '10px 30px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50px',
                    color: '#ddd',
                    fontWeight: 600,
                    fontSize: 24,
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    SYSTEM ARCHITECTURE
                </div>
            </div>

            {/* Scale Indicator / Technical UI */}
            <div style={{
                position: 'absolute',
                bottom: 50,
                right: 50,
                fontFamily: 'monospace',
                color: '#555',
                fontSize: 24
            }}>
                ZOOM: {Math.round(scale * 100)}%
            </div>

        </AbsoluteFill>
    );
};
