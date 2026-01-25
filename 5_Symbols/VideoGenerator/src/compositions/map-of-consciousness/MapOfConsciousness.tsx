import { AbsoluteFill, useCurrentFrame } from "remotion";
import React from "react";

const levels = [
  { name: "Enlightenment", energy: 700, emoji: "🌟", type: "inward" },
  { name: "Peace", energy: 600, emoji: "☮️", type: "inward" },
  { name: "Joy", energy: 540, emoji: "😄", type: "inward" },
  { name: "Love", energy: 500, emoji: "❤️", type: "inward" },
  { name: "Reason", energy: 400, emoji: "🧠", type: "inward" },
  { name: "Acceptance", energy: 350, emoji: "🤝", type: "inward" },
  { name: "Willingness", energy: 310, emoji: "🙌", type: "inward" },
  { name: "Learning", energy: 250, emoji: "📚", type: "inward" },
  { name: "Courage", energy: 200, emoji: "🦁", type: "inward" },
  { name: "Pride", energy: 175, emoji: "😤", type: "outward" },
  { name: "Anger", energy: 150, emoji: "😠", type: "outward" },
  { name: "Desire", energy: 125, emoji: "😫", type: "outward" },
  { name: "Fear", energy: 100, emoji: "😱", type: "outward" },
  { name: "Grief", energy: 75, emoji: "😢", type: "outward" },
  { name: "Apathy", energy: 50, emoji: "😐", type: "outward" },
  { name: "Guilt", energy: 30, emoji: "😔", type: "outward" },
  { name: "Shame", energy: 20, emoji: "🙈", type: "outward" },
];

export const MapOfConsciousness: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: "#1e1e1e", color: "white", fontFamily: "sans-serif", padding: 40 }}>
             <h1 style={{textAlign: 'center', marginBottom: 20, color: '#fff'}}>Map of Consciousness</h1>
             
             <div style={{
                 flex: 1,
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 position: 'relative'
             }}>
                {levels.map((level, i) => {
                     // Wave animation
                     // We want a wave that propagates through the list
                     const waveOffset = Math.sin((frame / 20) + (i * 0.5)) * 30;
                     
                     // Colors:
                     // > 200 (Courage) : Inward/Positive (Blue/Purple/Green?)
                     // < 200 : Outward/Negative (Red/Orange/Grey?)
                     const isPositive = level.energy >= 200;
                     const color = isPositive ? "#81C784" : "#E57373";
                     const bgColor = isPositive ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)";

                     return (
                         <div key={level.name} style={{
                             transform: `translateX(${waveOffset}px)`,
                             display: 'flex',
                             alignItems: 'center',
                             marginBottom: 8,
                             backgroundColor: bgColor,
                             padding: '10px 20px',
                             borderRadius: 20,
                             width: 600,
                             justifyContent: 'space-between',
                             boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                             opacity: Math.min(1, frame / 30), // Fade in
                         }}>
                            <div style={{display: 'flex', alignItems: 'center', gap: 15, width: '40%'}}>
                                <span style={{ fontSize: 28 }}>{level.emoji}</span>
                                <span style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>{level.name}</span>
                            </div>

                            <div style={{ fontWeight: 'bold', fontSize: 20, color }}>
                                {level.energy}
                            </div>
                            
                            <div style={{ 
                                fontSize: 16, 
                                color: '#ccc', 
                                textTransform: 'uppercase', 
                                letterSpacing: 1,
                                width: '25%',
                                textAlign: 'right'
                            }}>
                                {level.type}
                            </div>
                         </div>
                     )
                })}
             </div>
             
             <div style={{marginTop: 20, textAlign: 'center', fontSize: 18, color: '#aaa'}}>
                 Below Courage: Negative / Outward Looking | Above Courage: Positive / Inward Looking
             </div>
        </AbsoluteFill>
    );
};
