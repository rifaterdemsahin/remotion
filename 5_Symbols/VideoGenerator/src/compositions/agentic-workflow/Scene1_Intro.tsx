import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface Scene1Props {
    primaryColor: string;
    accentColor: string;
}

export const Scene1_Intro: React.FC<Scene1Props> = ({ primaryColor, accentColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [0, 30, 100, 130], [0, 1, 1, 0]);
    const titleScale = interpolate(frame, [0, 130], [0.9, 1.1]);
    
    const subtitleEnter = spring({
        frame: frame - 40,
        fps,
        config: { damping: 10 }
    });

    const ferrariEnter = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            {/* Title Sequence */}
            <AbsoluteFill style={{ opacity: titleOpacity, transform: `scale(${titleScale})`, justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: primaryColor, fontSize: 100, fontFamily: 'sans-serif', textAlign: 'center' }}>
                    THE AGENTIC ERROR
                </h1>
                <h2 style={{ color: 'white', fontSize: 40, marginTop: 20, opacity: subtitleEnter }}>
                    How I manage 240+ Workflows
                </h2>
            </AbsoluteFill>

            {/* Metaphor Sequence */}
            {frame > 150 && (
                <AbsoluteFill style={{ opacity: ferrariEnter, justifyContent: 'center', alignItems: 'center' }}>
                     <h1 style={{ color: 'white', fontSize: 60, textAlign: 'center' }}>
                        Don't use a <span style={{color: accentColor}}>Ferrari</span>
                        <br/>
                        to go to the grocery store.
                    </h1>
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
