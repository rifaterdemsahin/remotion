
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Folder, FileText, Star, GitFork, Code as CodeIcon, ChevronRight, ChevronDown } from 'lucide-react';

export const GithubRepoTour: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- TIMING ---
    // 0-20: Repo Interface appears
    // 20-50: Expand folders
    // 50-80: Files appear
    // 80-120: Preview slides in
    // 120-150: Stars/Fork increment
    
    // 1. Container Slide Up
    const containerSpring = spring({ frame, fps, config: { damping: 20 } });
    const containerY = interpolate(containerSpring, [0, 1], [100, 0]);
    const containerOpacity = interpolate(containerSpring, [0, 1], [0, 1]);

    // 2. Folder Structure
    const FOLDERS = [
        { id: 1, name: 'assessments', delay: 20 },
        { id: 2, name: 'simulations', delay: 30 },
        { id: 3, name: 'workflows', delay: 40 },
    ];
    
    // 3. Stats
    const stars = Math.floor(interpolate(frame, [120, 180], [142, 1250], { extrapolateRight: 'clamp' }));
    const forks = Math.floor(interpolate(frame, [130, 190], [25, 340], { extrapolateRight: 'clamp' }));

    return (
        <AbsoluteFill style={{ backgroundColor: '#0d1117', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', color: '#c9d1d9' }}>
             
             {/* BACKGROUND ACCENTS */}
             <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(0,0,0,0) 70%)' }} />

             {/* MAIN REPO CONTAINER */}
             <div style={{
                 width: '90%',
                 height: '85%',
                 margin: '5% auto',
                 backgroundColor: '#0d1117',
                 border: '1px solid #30363d',
                 borderRadius: 6,
                 transform: `translateY(${containerY}px)`,
                 opacity: containerOpacity,
                 display: 'flex',
                 flexDirection: 'column',
                 overflow: 'hidden',
                 boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
             }}>
                 
                 {/* HEADER */}
                 <div style={{
                     padding: '20px',
                     borderBottom: '1px solid #30363d',
                     backgroundColor: '#161b22',
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center'
                 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                         <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#f0f6fc' }} /> 
                         <span style={{ color: '#58a6ff', fontSize: 24, fontWeight: 600 }}>agentic-era-handbook</span>
                         <span style={{ color: '#8b949e', border: '1px solid #30363d', borderRadius: 20, padding: '2px 10px', fontSize: 14 }}>Public</span>
                     </div>
                     
                     <div style={{ display: 'flex', gap: 20 }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 5, border: '1px solid #30363d', padding: '5px 15px', borderRadius: 6 }}>
                             <Star size={18} fill={frame > 120 ? "#e3b341" : "none"} color={frame > 120 ? "#e3b341" : "#8b949e"} />
                             <span style={{ fontWeight: 600 }}>Star</span>
                             <span style={{ backgroundColor: '#30363d', padding: '0 8px', borderRadius: 10, fontSize: 12 }}>{stars}</span>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 5, border: '1px solid #30363d', padding: '5px 15px', borderRadius: 6 }}>
                             <GitFork size={18} color="#8b949e" />
                             <span style={{ fontWeight: 600 }}>Fork</span>
                             <span style={{ backgroundColor: '#30363d', padding: '0 8px', borderRadius: 10, fontSize: 12 }}>{forks}</span>
                         </div>
                     </div>
                 </div>

                 {/* CONTENT: SPLIT VIEW */}
                 <div style={{ display: 'flex', flex: 1 }}>
                     
                     {/* LEFT: FILE EXPLORER */}
                     <div style={{ width: '30%', borderRight: '1px solid #30363d', padding: 20 }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                            <div style={{ fontWeight: 600, color: '#c9d1d9' }}>Files</div>
                         </div>
                         
                         {FOLDERS.map((folder, i) => {
                             const isOpen = frame > folder.delay;
                             // Reveal folder
                             const opacity = interpolate(frame, [folder.delay, folder.delay + 10], [0, 1], { extrapolateRight: 'clamp' });
                             const y = interpolate(frame, [folder.delay, folder.delay + 10], [10, 0], { extrapolateRight: 'clamp' });
                             
                             return (
                                 <div key={folder.id} style={{ 
                                     marginBottom: 10,
                                     opacity,
                                     transform: `translateY(${y}px)`
                                 }}>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c9d1d9', cursor: 'pointer', padding: '5px 0' }}>
                                         {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                         <Folder size={18} color="#58a6ff" fill="#58a6ff" />
                                         <span>{folder.name}</span>
                                     </div>
                                     
                                     {/* Fake Files inside */}
                                     {isOpen && (
                                         <div style={{ paddingLeft: 24, marginTop: 5 }}>
                                             {['readme.md', 'config.json', 'index.ts'].map((file, j) => {
                                                 // Stagger files
                                                 const fileDelay = folder.delay + 10 + (j * 5);
                                                 const fileOp = interpolate(frame, [fileDelay, fileDelay + 10], [0, 1], { extrapolateRight: 'clamp' });
                                                 
                                                 return (
                                                     <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8b949e', fontSize: 14, padding: '3px 0', opacity: fileOp }}>
                                                         <FileText size={14} />
                                                         <span>{file}</span>
                                                     </div>
                                                 )
                                             })}
                                         </div>
                                     )}
                                 </div>
                             );
                         })}
                     </div>
                     
                     {/* RIGHT: CODE PREVIEW */}
                     <div style={{ flex: 1, backgroundColor: '#0d1117', padding: 30, position: 'relative' }}>
                         
                         {/* SLIDE IN PREVIEW WINDOW */}
                         <div style={{
                             backgroundColor: '#161b22',
                             borderRadius: 6,
                             border: '1px solid #30363d',
                             padding: 20,
                             height: '100%',
                             opacity: interpolate(frame, [80, 100], [0, 1]),
                             transform: `translateX(${interpolate(frame, [80, 100], [50, 0])}px)`
                         }}>
                              <div style={{ borderBottom: '1px solid #30363d', paddingBottom: 10, marginBottom: 15, display: 'flex', gap: 10, alignItems: 'center' }}>
                                  <FileText size={16} color="#c9d1d9" />
                                  <span style={{ fontWeight: 600 }}>agent_config.json</span>
                              </div>
                              
                              {/* TYPING CODE EFFECT */}
                              <div style={{ fontFamily: 'monospace', fontSize: 16, lineHeight: 1.6, color: '#c9d1d9' }}>
                                  <span style={{ color: '#ff7b72' }}>{"{"}</span> <br/>
                                  &nbsp;&nbsp;<span style={{ color: '#7ee787' }}>"role"</span>: <span style={{ color: '#a5d6ff' }}>"Architect"</span>,<br/>
                                  &nbsp;&nbsp;<span style={{ color: '#7ee787' }}>"permissions"</span>: <span style={{ color: '#ff7b72' }}>{"["}</span><br/>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#a5d6ff' }}>"read_codebase"</span>,<br/>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#a5d6ff' }}>"execute_tests"</span>,<br/>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#a5d6ff' }}>"deploy_production"</span><br/>
                                  &nbsp;&nbsp;<span style={{ color: '#ff7b72' }}>{"]"}</span>,<br/>
                                  &nbsp;&nbsp;<span style={{ color: '#7ee787' }}>"status"</span>: <span style={{ color: '#a5d6ff' }}>"active"</span><br/>
                                  <span style={{ color: '#ff7b72' }}>{"}"}</span>
                              </div>

                              {/* CURSOR */}
                              <div style={{
                                  display: 'inline-block', width: 10, height: 20, backgroundColor: '#58a6ff', marginLeft: 5,
                                  opacity: Math.sin(frame * 0.5) > 0 ? 1 : 0
                              }} />

                         </div>
                     
                     </div>
                 </div>

             </div>

        </AbsoluteFill>
    );
};
