
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';
import { Send, Menu, Search, MoreVertical, MessageSquare } from 'lucide-react';

// --- DATA ---
const CHANNELS = [
    { id: 1, name: "Finance Agent", icon: "💰", color: "#60a5fa", message: "Monthly budget optimization complete. Savings: 12%", badge: 3 },
    { id: 2, name: "Family Agent", icon: "👨👩👧", color: "#f472b6", message: "Grocery list updated. Scheduled piano practice.", badge: 5 },
    { id: 3, name: "Project Agents", icon: "🚀", color: "#a78bfa", message: "Deployment successful. CI/CD pipeline green.", badge: 12 },
    { id: 4, name: "Health Tracker", icon: "❤️", color: "#f87171", message: "Daily step goal reached! Heart rate normal.", badge: 1 },
];

export const TelegramCommandCenter: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- TIMING & ANIMATION ---
    const phoneEnter = spring({
        frame,
        fps,
        config: { damping: 14 }
    });
    
    // Scale up nicely
    const phoneScale = interpolate(phoneEnter, [0, 1], [0.8, 1]);
    const phoneOpacity = interpolate(phoneEnter, [0, 1], [0, 1]);

    // Sidebar Slide In inside the phone
    const sidebarSlide = spring({
        frame: frame - 25,
        fps,
        config: { stiffness: 60 }
    });
    
    const sidebarX = interpolate(sidebarSlide, [0, 1], [-400, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            <AbsoluteFill style={{ 
                background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)' 
            }} />

            {/* --- PHONE MOCKUP --- */}
            <div style={{
                width: 450,
                height: 850,
                backgroundColor: '#1c1c1c',
                borderRadius: 40,
                border: '12px solid #333',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                position: 'relative',
                overflow: 'hidden',
                transform: `scale(${phoneScale})`,
                opacity: phoneOpacity,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Status Bar Mock */}
                <div style={{ padding: '15px 25px', display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 12, fontWeight: 'bold', zIndex: 20 }}>
                     <span>9:41</span>
                     <div style={{display:'flex', gap: 5}}>
                         <span>📶</span><span>🔋</span>
                     </div>
                </div>

                {/* --- TELEGRAM APP INTERFACE --- */}
                <div style={{ flex: 1, position: 'relative', backgroundColor: '#0f172a' }}>
                    
                    {/* Header */}
                    <div style={{ 
                        height: 60, backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 15px', 
                        justifyContent: 'space-between', color: 'white', borderBottom: '1px solid #334155', position: 'relative', zIndex: 10
                    }}>
                        <Menu size={24} />
                        <span style={{ fontWeight: 'bold', fontSize: 18 }}>Telegram</span>
                        <Search size={24} />
                    </div>

                    {/* Channel List (Sidebar Content) */}
                    <div style={{ 
                        paddingTop: 10,
                        transform: `translateX(0px)` // It's effectively the main view here
                    }}>
                        {CHANNELS.map((channel, index) => {
                             // Staggered typing / appearance sequence
                             const delay = 40 + index * 25;
                             
                             // Fade/Slide In Row
                             const rowSpring = spring({
                                 frame: frame - delay,
                                 fps,
                                 config: { stiffness: 80 }
                             });
                             const rowOpacity = interpolate(rowSpring, [0, 1], [0, 1]);
                             const rowY = interpolate(rowSpring, [0, 1], [30, 0]);

                             // Typing Effect for Name
                             // "Typing" animation duration approx 20 frames
                             const typingProgress = interpolate(frame - delay - 10, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
                             const nameLength = Math.floor(channel.name.length * typingProgress);
                             const typedName = channel.name.substring(0, nameLength);
                             
                             // Badge Pop
                             const badgeSpring = spring({
                                 frame: frame - delay - 30, // Pop after name types
                                 fps,
                                 config: { overshootClamping: false, stiffness: 200 }
                             });
                             const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

                             return (
                                 <div key={channel.id} style={{
                                     display: 'flex',
                                     alignItems: 'center',
                                     padding: '12px 15px',
                                     borderBottom: '1px solid #1e293b',
                                     opacity: rowOpacity,
                                     transform: `translateY(${rowY}px)`,
                                     backgroundColor: 'transparent'
                                 }}>
                                    
                                    {/* Avatar */}
                                    <div style={{
                                        width: 50, height: 50, borderRadius: '50%', 
                                        backgroundColor: channel.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 24, marginRight: 15, position: 'relative'
                                    }}>
                                       {channel.icon}
                                    </div>
                                    
                                    {/* Content */}
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>{typedName}</span>
                                            <span style={{ color: '#64748b', fontSize: 12 }}>12:0{index}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ 
                                                color: '#94a3b8', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '85%'
                                            }}>
                                                {channel.message}
                                            </span>
                                            
                                            {/* Notification Badge */}
                                            {channel.badge > 0 && (
                                                <div style={{
                                                    backgroundColor: '#3b82f6',
                                                    color: 'white',
                                                    fontSize: 11,
                                                    fontWeight: 'bold',
                                                    padding: '2px 8px',
                                                    borderRadius: 10,
                                                    transform: `scale(${badgeScale})`
                                                }}>
                                                    {channel.badge}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bounded Context Label (Appears late) */}
                                    <div style={{
                                        position: 'absolute',
                                        right: -120, // Outside phone initially? Or overlay? Let's overlay inside.
                                        top: 10,
                                        backgroundColor: 'rgba(251, 191, 36, 0.2)', // Amber tint
                                        border: '1px solid #fbbf24',
                                        padding: '2px 6px',
                                        borderRadius: 4,
                                        fontSize: 9,
                                        color: '#fbbf24',
                                        fontWeight: 'bold',
                                        opacity: interpolate(frame - 150 - (index * 10), [0, 10], [0, 1]), // Late appearance
                                        transform: `translateX(${interpolate(frame - 150 - (index * 10), [0, 10], [10, -50])}px)`
                                    }}>
                                        BOUNDED CONTEXT
                                    </div>
                                    
                                 </div>
                             );
                        })}
                    </div>
                    
                    {/* Floating Action Button */}
                    <div style={{
                        position: 'absolute',
                        bottom: 25,
                        right: 25,
                        width: 55,
                        height: 55,
                        borderRadius: '50%',
                        backgroundColor: '#3b82f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(59, 130, 246, 0.4)'
                    }}>
                        <Send size={24} color="white" style={{ marginLeft: 3 }} />
                    </div>

                </div>
            </div>

            {/* --- Overlay Title --- */}
            <div style={{
                position: 'absolute',
                top: 100,
                right: 150,
                textAlign: 'right',
                opacity: interpolate(phoneEnter, [0.5, 1], [0, 1])
            }}>
                <h1 style={{ color: 'white', fontSize: 60, margin: 0, fontWeight: 900 }}>Command Center</h1>
                <h2 style={{ color: '#94a3b8', fontSize: 32, margin: 0 }}>Mobile Integration</h2>
            </div>

        </AbsoluteFill>
    );
};
