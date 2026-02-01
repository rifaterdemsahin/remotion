import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Fade, Motion, Text, Subtitle, UnderlineAnimation } from './Components';

export const TitleScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#F5F5F5' }}>
            {/* Black fade-in background */}
            <AbsoluteFill style={{ backgroundColor: '#000' }}>
                <Fade from={0} to={30}>
                    <AbsoluteFill style={{ backgroundColor: '#F5F5F5' }} />
                </Fade>
            </AbsoluteFill>

            {/* Title slide in from left */}
            <Motion
                from={{ x: -300 }}
                to={{ x: 0 }}
                durationInFrames={30}
                delay={10}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: -100 // Adjust vertical position as per design implied
                }}
            >
                <Text size={48} weight="bold">
                    The 50% Average Trap
                </Text>
            </Motion>

            {/* Subtitle fade in */}
            <Fade from={50} to={100}>
                <Subtitle text="Why Averages Hide Cascade Risk" />
            </Fade>

            {/* Underline animation */}
            <UnderlineAnimation from={30} to={60} />
        </AbsoluteFill>
    );
};
