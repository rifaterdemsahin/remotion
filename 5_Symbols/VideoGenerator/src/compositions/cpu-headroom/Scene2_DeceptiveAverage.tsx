import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';
import {
    GraphContainer,
    Axes,
    Line,
    Motion,
    Text,
    AnimatedCurve,
    Checkmark,
    Fade,
    AnnotationBox,
} from './Components';

export const DeceptiveAverageScene: React.FC = () => {
    const frame = useCurrentFrame();

    // Generate smooth curve points
    // X: 0 to 400
    // Y: 0 to 250 (100% at 0, 0% at 250)
    // We want curve mostly below 50% (below y=125)
    // So y > 125 mostly.
    const points = React.useMemo(() => {
        const pts = [];
        for (let i = 0; i <= 400; i += 5) {
            const x = i;
            // Some random noise around 30-40% (which is y ~ 150-175)
            // Math.sin for smoothness
            const timeOfDay = (x / 400) * 24; // 0 to 24
            // Dip at night (0-6), rise during day (8-18), dip at night (18-24)

            let baseVal = 40; // 40%
            if (timeOfDay > 8 && timeOfDay < 18) baseVal = 60; // 60% during day? No, average is 50%, so maybe base is 45%

            const noise = Math.sin(x * 0.1) * 10 + Math.cos(x * 0.05) * 5;
            const percent = 35 + (timeOfDay > 9 && timeOfDay < 17 ? 15 : 0) + (noise / 5);
            // Ensure it stays below 50% mostly

            // y = 250 - (percent / 100 * 250)
            const y = 250 - (percent / 100 * 250);
            pts.push({ x, y });
        }
        return pts;
    }, []);

    return (
        <AbsoluteFill style={{ backgroundColor: '#F5F5F5' }}>
            <GraphContainer title="What You're Told: 50% Average" x={100} y={150}>

                {/* Axes */}
                <Axes
                    width={400}
                    height={250}
                    yMax={100}
                    yLabels={['0%', '20%', '40%', '60%', '80%', '100%']}
                    xLabels={['12am', '6am', '12pm', '6pm', '12am']}
                />

                {/* 50% average line (dashed, animated in first) at y=125 */}
                <Motion
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    durationInFrames={30}
                    delay={10}
                >
                    <Line
                        y={125}
                        color="#4A90E2"
                        dashArray="5,5"
                        width={400} // Matched to axes width
                    />
                </Motion>

                <Text x={410} y={120} color="#4A90E2" weight="bold" size={12}>
                    Average: 50%
                </Text>

                {/* Smooth CPU curve (animates in like a drawing) */}
                <AnimatedCurve
                    points={points}
                    from={40}
                    to={80}
                    color="#4A90E2"
                    strokeWidth={3}
                />

                {/* Green checkmark appears at end */}
                <Fade from={70} to={90}>
                    <Checkmark
                        x={350}
                        y={120}
                        size={40}
                        color="#228B22"
                    />
                </Fade>

                <Fade from={70} to={90}>
                    <Text x={400} y={130} color="#228B22" size={14} weight="bold">
                        Looks Safe ✓
                    </Text>
                </Fade>
            </GraphContainer>

            {/* Annotation box */}
            <AnnotationBox
                x={50}
                y={430}
                text="APPEARS SAFE: Smooth curve stays below average line"
                color="#E3F2FD"
                from={60}
            />
        </AbsoluteFill>
    );
};
