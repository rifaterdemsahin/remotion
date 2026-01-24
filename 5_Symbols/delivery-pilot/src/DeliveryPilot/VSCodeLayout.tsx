import React from "react";
import { AbsoluteFill } from "remotion";
import { Sidebar } from "./Sidebar";
import { Editor } from "./Editor";
import { Terminal } from "./Terminal";

export const VSCodeLayout: React.FC = () => {
  return (
    <AbsoluteFill style={{ flexDirection: "row", backgroundColor: "#1E1E1E", fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace" }}>
        {/* Activity Bar */}
        <div style={{ width: 50, backgroundColor: "#333333", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10 }}>
            <div style={{ width: 30, height: 30, backgroundColor: "#fff", opacity: 0.5, marginBottom: 20 }}></div>
            <div style={{ width: 30, height: 30, backgroundColor: "#fff", opacity: 0.2, marginBottom: 20 }}></div>
            <div style={{ width: 30, height: 30, backgroundColor: "#fff", opacity: 0.2, marginBottom: 20 }}></div>
        </div>

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Tabs */}
            <div style={{ height: 35, backgroundColor: "#2D2D2D", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <div style={{ padding: "5px 15px", backgroundColor: "#1E1E1E", color: "#fff", fontSize: 13, borderTop: "2px solid #569CD6" }}>
                    monitor.ts
                </div>
            </div>
            
            <div style={{ flex: 1, position: "relative" }}>
                <Editor />
            </div>

            <Terminal />
        </div>
    </AbsoluteFill>
  );
};
