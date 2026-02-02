import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface Scene4Props {
    primaryColor: string;
}

export const Scene4_Telegram: React.FC<Scene4Props> = ({ primaryColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const containerOpacity = interpolate(frame, [0, 20], [0, 1]);
    
    // Simulate messages popping in
    const message1Y = spring({ frame: frame - 30, fps, config: { damping: 15 } });
    const message2Y = spring({ frame: frame - 60, fps, config: { damping: 15 } });
    const message3Y = spring({ frame: frame - 90, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill style={{ backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' }}>
            <AbsoluteFill style={{ opacity: containerOpacity, top: '10%', bottom: '10%', left: '25%', right: '25%', backgroundColor: '#1c1c1c', borderRadius: 20, overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ height: 60, backgroundColor: '#2c2c2c', display: 'flex', alignItems: 'center', padding: '0 20px', color: 'white' }}>
                    <h3>Telegram - BotFather</h3>
                </div>
                
                {/* Chat Area */}
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 15 }}>
                    
                    {/* Message 1 */}
                    <div style={{ 
                        backgroundColor: '#333', 
                        padding: 15, 
                        borderRadius: '15px 15px 15px 0', 
                        color: '#ddd',
                        transform: `translateY(${interpolate(message1Y, [0, 1], [50, 0])}px)`,
                        opacity: message1Y
                    }}>
                        /newbot
                    </div>

                    {/* Message 2 */}
                    <div style={{ 
                        backgroundColor: primaryColor, 
                        alignSelf: 'flex-start',
                        padding: 15, 
                        borderRadius: '15px 15px 0 15px', 
                        color: 'white',
                        transform: `translateY(${interpolate(message2Y, [0, 1], [50, 0])}px)`,
                        opacity: message2Y
                    }}>
                        Alright, a new bot. How are we going to call it?
                    </div>

                    {/* Message 3 */}
                    <div style={{ 
                        backgroundColor: '#333', 
                        padding: 15, 
                        borderRadius: '15px 15px 15px 0', 
                        color: '#ddd',
                        transform: `translateY(${interpolate(message3Y, [0, 1], [50, 0])}px)`,
                        opacity: message3Y
                    }}>
                        Family_Agent_Bot
                    </div>

                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
