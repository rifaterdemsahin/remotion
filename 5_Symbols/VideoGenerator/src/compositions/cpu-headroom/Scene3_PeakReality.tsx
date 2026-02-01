import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill, Easing } from 'remotion';
import {
    GraphContainer,
    Axes,
    Line,
    Motion,
    Text,
    Spike,
    XMark,
    Fade,
    AnnotationBox,
} from './Components';

export const PeakRealityScene: React.FC = () => {
    const frame = useCurrentFrame();

    // Slide transition effect
    const slideProgress = interpolate(frame, [0, 15], [100, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Actually, slide usually means the new scene slides IN.
    // We'll translate the whole container.

    return (
        <AbsoluteFill style={{
            backgroundColor: '#F5F5F5',
            transform: `translateX(${slideProgress}%)`
        }}>
            <GraphContainer title="What's Actually Happening: Peak Hour" x={100} y={150}>

                {/* Axes (minute-by-minute) */}
                <Axes
                    width={400}
                    height={250}
                    yMax={100}
                    xLabels={['12:00', '12:15', '12:30', '12:45', '1:00', '1:15']}
                />

                {/* 50% line faded - y=125 */}
                <Fade from={5} to={15}>
                    <Line
                        y={125}
                        color="#999"
                        dashArray="5,5"
                        opacity={0.3}
                        width={400}
                    />
                </Fade>

                {/* Peak average line (75%) -> y = 250 - (75/100*250) = 250 - 187.5 = 62.5 */}
                <Fade from={20} to={40}>
                    <Line
                        y={62.5}
                        color="#FF8800"
                        width={400}
                        strokeWidth={2}
                    />
                </Fade>

                <Text x={410} y={60} color="#FF8800" weight="bold" size={12}>
                    Peak Avg: 75%
                </Text>

                {/* Spiky pattern animates in sections */}
                {/* Spike 1: 92% -> y = 250 - (92/100*250) = 250 - 230 = 20 */}
                <Motion
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    durationInFrames={10}
                    delay={20}
                >
                    <Spike x={80} y={20} value="92%" color="#FF4444" />
                </Motion>

                {/* Spike 2: 95% -> y = 250 - (95/100*250) = 12.5 */}
                <Motion
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    durationInFrames={10}
                    delay={30}
                >
                    <Spike x={160} y={12.5} value="95%" color="#FF0000" />
                </Motion>

                {/* Spike 3: 88% -> y = 30 */}
                <Motion
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    durationInFrames={10}
                    delay={40}
                >
                    <Spike x={240} y={30} value="88%" color="#FF4444" />
                </Motion>

                {/* Spike 4: 98% -> y = 5 */}
                <Motion
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    durationInFrames={10}
                    delay={50}
                >
                    <Spike x={320} y={5} value="98%" color="#FF0000" />
                </Motion>

                {/* Red X appears */}
                <Fade from={50} to={60}>
                    <XMark
                        x={350}
                        y={120}
                        size={40}
                        color="#FF0000"
                    />
                </Fade>

                <Fade from={50} to={60}>
                    <Text x={400} y={130} color="#FF0000" size={14} weight="bold">
                        Average is a LIE ✗
                    </Text>
                </Fade>
            </GraphContainer>

            {/* Annotation box */}
            <AnnotationBox
                x={50}
                y={430}
                text="ACTUAL REALITY: Spikes reach 92-98% during peak hours"
                color="#FFEBEE"
                from={40}
            />
        </AbsoluteFill>
    );
};
