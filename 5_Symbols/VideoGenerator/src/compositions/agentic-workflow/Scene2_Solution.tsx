import { AbsoluteFill, useCurrentFrame, interpolate, Img } from 'remotion';

interface Scene2Props {
    primaryColor: string;
    secondaryColor: string;
}

export const Scene2_Solution: React.FC<Scene2Props> = ({ primaryColor, secondaryColor }) => {
    const frame = useCurrentFrame();

    // Placeholder for B-Roll - Fade in
    const bRollOpacity = interpolate(frame, [0, 30], [0, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#1a1a1a' }}>
            <AbsoluteFill style={{ opacity: bRollOpacity }}>
                 {/* This would be the actual video file */}
                 <div style={{
                     width: '100%', 
                     height: '100%', 
                     backgroundColor: '#2a2a2a', 
                     display: 'flex', 
                     justifyContent: 'center', 
                     alignItems: 'center',
                     flexDirection: 'column'
                 }}>
                    <h2 style={{color: 'white'}}>NA10 Dashboard Showcase</h2>
                    <p style={{color: '#888'}}>B-Roll: 240 Active Workflows | 6,900 Executions</p>
                    
                    {/* Animated Counter Simulation */}
                    <h1 style={{color: secondaryColor, fontSize: 120}}>
                        {Math.min(240, Math.floor(frame / 2))} Workflows
                    </h1>
                 </div>
            </AbsoluteFill>
            
            {/* Lower Thirds or Overlay Text */}
            <AbsoluteFill style={{ top: 800, paddingLeft: 100 }}>
                <div style={{
                    backgroundColor: primaryColor,
                    padding: '20px 40px',
                    borderRadius: 15,
                    display: 'inline-block',
                    opacity: interpolate(frame, [50, 80], [0, 1])
                }}>
                    <h3 style={{margin: 0, color: 'white', fontSize: 30}}>Auto-GPT Hub</h3>
                    <p style={{margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 20}}>Autonomous Team Management</p>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
