
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Bell, MessageSquare, Twitter, Linkedin, Github, Youtube } from 'lucide-react';

export const CtaEndCard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // --- TIMING ---
    // 0-30: Logo Fade In
    // 30-50: Subscribe & Bell
    // 50-100: Comment Text Typing
    // 100-150: Thumbnails Slide In
    // 150-180: Social Links

    // 1. LOGO FADE
    const logoOpacity = interpolate(frame, [0, 30], [0, 1]);
    const logoScale = interpolate(spring({ frame, fps }), [0, 1], [0.8, 1]);

    // 2. SUBSCRIBE BTN & BELL
    const btnSpring = spring({ frame: frame - 30, fps, config: { damping: 15 } });
    const btnY = interpolate(btnSpring, [0, 1], [300, 0]);
    
    // Bell Bouncing
    const bellBounce = spring({ frame: frame - 40, fps, config: { stiffness: 200, damping: 5 } });
    const bellScale = interpolate(bellBounce, [0, 1], [0, 1.2]);
    const bellRotate = Math.sin(frame * 0.5) * (frame > 40 ? 10 : 0);

    // 3. TYPING TEXT
    const fullText = "What will you build first? Comment below! 👇";
    const textLen = Math.floor(interpolate(frame, [50, 100], [0, fullText.length]));
    const currentText = fullText.substring(0, textLen);

    // 4. THUMBNAILS
    const thumbSpring = spring({ frame: frame - 100, fps, config: { damping: 20 } });
    const thumbLeftX = interpolate(thumbSpring, [0, 1], [-600, 150]);
    const thumbRightX = interpolate(thumbSpring, [0, 1], [width + 600, width - 150 - 500]); // width-margin-thumbWidth

    // 5. SOCIALS
    const socialOpacity = interpolate(frame, [150, 180], [0, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
            {/* Background */}
            <AbsoluteFill style={{ 
                background: 'linear-gradient(to top, #1e293b, #0f172a)',
                zIndex: 0
            }} />

            {/* --- CENTER AREA --- */}
            <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: `translate(-50%, -50%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10
            }}>
                {/* 1. CHANNEL LOGO */}
                <div style={{
                    opacity: logoOpacity,
                    transform: `scale(${logoScale})`,
                    marginBottom: 40,
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                    <div style={{
                        width: 150, height: 150, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 50px rgba(139, 92, 246, 0.5)',
                        border: '4px solid white',
                        marginBottom: 20
                    }}>
                        <span style={{ fontSize: 80 }}>🚀</span>
                    </div>
                    <h1 style={{ color: 'white', margin: 0, fontSize: 40 }}>The Agentic Era</h1>
                </div>

                {/* 2. SUBSCRIBE CTA */}
                <div style={{
                    transform: `translateY(${btnY}px)`,
                    display: 'flex', alignItems: 'center', gap: 20
                }}>
                    <div style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '15px 40px',
                        borderRadius: 50,
                        fontSize: 24, fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)'
                    }}>
                        Subscribe
                    </div>
                    
                    <div style={{ transform: `scale(${bellScale}) rotate(${bellRotate}deg)` }}>
                        <div style={{
                            width: 60, height: 60, borderRadius: '50%',
                            backgroundColor: '#334155',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '2px solid #475569'
                        }}>
                             <Bell size={30} color="#fbbf24" fill="#fbbf24" />
                        </div>
                    </div>
                </div>

                {/* 3. COMMENT PROMPT */}
                <div style={{
                    marginTop: 40,
                    height: 40, // fix height to prevent jump
                    color: '#94a3b8',
                    fontSize: 24,
                    fontStyle: 'italic'
                }}>
                    {currentText}
                    <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
                </div>
            </div>


            {/* --- THUMBNAILS (Next/Prev) --- */}
            {/* Left Thumbnail */}
            <div style={{
                position: 'absolute',
                top: height/2 - 140, // centered vertically approx
                left: thumbLeftX,
                width: 500, height: 280,
                backgroundColor: '#1e293b',
                borderRadius: 20,
                border: '2px solid #334155',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                 <div style={{ color: '#475569', fontSize: 20, fontWeight: 'bold' }}>Previous: AI Setup Guide</div>
            </div>

            {/* Right Thumbnail */}
            <div style={{
                position: 'absolute',
                top: height/2 - 140,
                left: thumbRightX,
                width: 500, height: 280,
                backgroundColor: '#1e293b',
                borderRadius: 20,
                border: '2px solid #334155',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                 <div style={{ color: '#475569', fontSize: 20, fontWeight: 'bold' }}>Next: 10x Automation</div>
            </div>


            {/* --- SOCIAL LINKS FOOTER --- */}
            <div style={{
                position: 'absolute',
                bottom: 50,
                width: '100%',
                display: 'flex', justifyContent: 'center', gap: 40,
                opacity: socialOpacity
            }}>
                {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                    <div key={i} style={{ color: '#cbd5e1', transform: 'scale(1.2)' }}>
                        <Icon size={30} />
                    </div>
                ))}
            </div>

        </AbsoluteFill>
    );
};
