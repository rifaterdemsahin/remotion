import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const codeContent = `
class ConnectionPilot {
  constructor() {
    this.status = 'idle';
  }

  // Check Local Connection
  async verifyNetwork() {
    const status = await system.check();
    return status;
  }
}
`.trim();

export const Editor: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Typing effect for the code
    const totalChars = codeContent.length;
    // Type over 100 frames
    const charsShown = interpolate(frame, [10, 110], [0, totalChars], { extrapolateRight: "clamp" });
    const currentCode = codeContent.substring(0, Math.round(charsShown));

    return (
        <div style={{ padding: 20, color: "#d4d4d4", fontSize: 16, lineHeight: 1.5, fontFamily: "'Consolas', 'Monaco', monospace" }}>
            <pre style={{ margin: 0 }}>
                {currentCode.split('\n').map((line, i) => (
                    <div key={i} style={{ display: "flex" }}>
                        <span style={{ color: "#858585", marginRight: 20, userSelect: "none", width: 20, textAlign: "right" }}>{i + 1}</span>
                        <span dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }}></span>
                    </div>
                ))}
                <span style={{ 
                        display: "inline-block", 
                        width: 10, 
                        height: 20, 
                        backgroundColor: "#fff", 
                        marginLeft: 4, 
                        verticalAlign: "middle",
                        opacity: frame < 120 && Math.round(frame / 10) % 2 ? 1 : 0 
                    }}></span>
            </pre>
        </div>
    );
};

// Basic syntax highlighting helper
function syntaxHighlight(line: string) {
    let html = line
        .replace(/\/\/.*/g, '<span style="color: #6A9955">$&</span>')
        .replace(/\b(class|constructor|async|const|return|await)\b/g, '<span style="color: #569CD6">$1</span>')
        .replace(/\b(this)\b/g, '<span style="color: #569CD6">$1</span>')
        .replace(/'[^']*'/g, '<span style="color: #CE9178">$&</span>')
        .replace(/\b(ConnectionPilot|status|verifyNetwork|system|check)\b/g, '<span style="color: #DCDCAA">$1</span>');
    return html;
}
