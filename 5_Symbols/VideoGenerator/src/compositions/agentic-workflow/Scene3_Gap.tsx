import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

interface Scene3Props {
    primaryColor: string;
}

export const Scene3_Gap: React.FC<Scene3Props> = ({ primaryColor }) => {
    const frame = useCurrentFrame();
    const { width } = useVideoConfig();

    const split = interpolate(frame, [0, 30], [width, width / 2]);
    const textOpacity = interpolate(frame, [20, 50], [0, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {/* Left Side: Technology */}
            <AbsoluteFill style={{ width: split, backgroundColor: '#111', overflow: 'hidden' }}>
                <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1 style={{ color: 'white', opacity: textOpacity }}>Technology</h1>
                    <p style={{ color: '#666', opacity: textOpacity }}>What AI can do</p>
                </div>
            </AbsoluteFill>

            {/* Right Side: Delivery */}
            <AbsoluteFill style={{ left: split, right: 0, backgroundColor: primaryColor, overflow: 'hidden' }}>
                <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1 style={{ color: 'white', opacity: textOpacity }}>Delivery</h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', opacity: textOpacity }}>What YOU deliver</p>
                </div>
            </AbsoluteFill>

            {/* The Gap Text */}
             <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ 
                    color: 'white', 
                    fontSize: 120, 
                    fontWeight: 'bold',
                    opacity: interpolate(frame, [60, 80], [0, 1]),
                    textShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}>
                    THE GAP
                </h1>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
