import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const Sidebar: React.FC = () => {
    const frame = useCurrentFrame();

    // Slide in Sidebar (simulating it popping up)
    const width = interpolate(frame, [20, 40], [0, 300], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const opacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

    // Typing effect for "Check my internet speed"
    const textToType = "Check my internet speed.";
    const startTyping = 50; 
    const durationTyping = 50;
    const charsShown = interpolate(frame, [startTyping, startTyping + durationTyping], [0, textToType.length], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const currentText = textToType.substring(0, Math.round(charsShown));

    return (
        <div style={{ 
            width: width, 
            backgroundColor: "#252526", 
            borderRight: "1px solid #000",
            opacity,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
        }}>
            <div style={{ minWidth: 300 }}>
                <div style={{ padding: "10px 20px", borderBottom: "1px solid #333", color: "#BBBBBB", fontSize: 11, fontWeight: "bold", letterSpacing: 1, display: "flex", justifyContent: "space-between" }}>
                    <span>EXPLORER</span>
                    <span>...</span>
                </div>
                <div style={{ padding: "10px 20px", color: "#fff", fontWeight: "bold", fontSize: 13, backgroundColor: "#37373D", display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: 8 }}>🤖</span> AGENT
                </div>
                <div style={{ padding: 20 }}>
                    <div style={{ marginBottom: 10, color: "#CCCCCC", fontSize: 13 }}>Ask Agent:</div>
                    <div style={{ 
                        backgroundColor: "#3C3C3C", 
                        border: "1px solid #3C3C3C", 
                        padding: 8, 
                        borderRadius: 2,
                        color: "#fff",
                        fontSize: 13,
                        fontFamily: "sans-serif",
                        minHeight: 34,
                        boxShadow: frame > startTyping - 10 ? "0 0 0 1px #007FD4" : "none"
                    }}>
                        {currentText}
                        <span style={{ opacity: Math.round(frame / 15) % 2 ? 1 : 0, marginLeft: 2 }}>|</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
