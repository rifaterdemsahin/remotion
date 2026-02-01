import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill, Easing } from 'remotion';
import {
    Text,
    Fade,
    Motion,
} from './Components';

// Pulse effect component
const PulseEffect: React.FC<{ from: number, to: number, color: string }> = ({ from, to, color }) => {
    const frame = useCurrentFrame();
    const scale = interpolate(frame, [from, to], [1, 1.2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    const opacity = interpolate(frame, [from, to], [0.8, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 3,
            backgroundColor: color,
            opacity,
            transform: `scale(${scale})`,
            zIndex: -1
        }} />
    );
};

interface CascadeStepProps {
    step: number;
    time: string;
    title: string;
    subtitle?: string;
    color: string;
    frameFrom: number;
    frameTo: number;
    x: number;
    highlight?: boolean;
    pulse?: boolean;
}

const CascadeStep: React.FC<CascadeStepProps> = ({
    step,
    time,
    title,
    subtitle,
    color,
    frameFrom,
    frameTo,
    x,
    highlight,
    pulse,
}) => {
    const frame = useCurrentFrame();

    // Use Motion for entrance
    const opacity = interpolate(frame, [frameFrom, frameFrom + 10], [0, 1], { extrapolateRight: 'clamp' });
    const scale = interpolate(frame, [frameFrom, frameFrom + 10], [0.8, 1], { extrapolateRight: 'clamp' });

    return (
        <div style={{
            opacity,
            transform: `scale(${scale})`,
            position: 'absolute',
            left: x,
            top: highlight ? 250 : 180,
        }}>
            <div style={{
                width: 130, // Increased width slightly for text
                height: 60,
                backgroundColor: color,
                borderRadius: 3,
                border: highlight ? '2px solid #CC0000' : 'none',
                position: 'relative'
            }}>
                {/* Pulse effect if final step */}
                {pulse && (
                    <PulseEffect
                        from={frameFrom}
                        to={frameTo}
                        color={color}
                    />
                )}

                <div style={{ padding: 5 }}>
                    <div style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{time}</div>
                    <div style={{ fontSize: 11, color: 'white' }}>{title}</div>
                    {subtitle && (
                        <div style={{ fontSize: 10, color: '#330000', fontWeight: 'bold', marginTop: 2 }}>{subtitle}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AnimatedArrow: React.FC<{
    x1: number;
    x2: number;
    y: number;
    frameStart: number;
    frameEnd: number;
}> = ({ x1, x2, y, frameStart, frameEnd }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [frameStart, frameEnd], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <svg style={{ position: 'absolute', overflow: 'visible', opacity }}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="#333" strokeWidth={2} />
            <polygon points={`${x2},${y} ${x2 - 5},${y - 3} ${x2 - 5},${y + 3}`} fill="#333" />
        </svg>
    );
};

const AnimatedArrowDown: React.FC<{
    x: number;
    y1: number;
    y2: number;
    frameStart: number;
    frameEnd: number;
}> = ({ x, y1, y2, frameStart, frameEnd }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [frameStart, frameEnd], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <svg style={{ position: 'absolute', overflow: 'visible', opacity }}>
            <line x1={x} y1={y1} x2={x} y2={y2} stroke="#333" strokeWidth={2} />
            <polygon points={`${x},${y2} ${x - 3},${y2 - 5} ${x + 3},${y2 - 5}`} fill="#333" />
        </svg>
    );
};

const CriticalBox: React.FC<{
    x: number;
    y: number;
    width: number;
    height: number;
    bgColor: string;
    borderColor: string;
    children: React.ReactNode;
}> = ({ x, y, width, height, bgColor, borderColor, children }) => (
    <div style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        padding: 10,
        borderRadius: 5
    }}>
        {children}
    </div>
);

export const CascadeFailureScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#F5F5F5' }}>
            <Text x={50} y={50} size={32} weight="bold">What Happens at 95% Peak CPU</Text>

            {/* Timeline container */}
            <div style={{ position: 'absolute', top: 50, left: 50 }}> {/* Custom offset wrapper */}

                {/* Step 1: T=0s - Spike to 95% */}
                <CascadeStep
                    step={1}
                    time="T=0s"
                    title="Spike to 95%"
                    color="#FF6B6B"
                    frameFrom={5}
                    frameTo={20}
                    x={100}
                />

                {/* Arrow */}
                <AnimatedArrow x1={240} x2={290} y={210} frameStart={18} frameEnd={25} />

                {/* Step 2: T=2s - Backup Falls Behind */}
                <CascadeStep
                    step={2}
                    time="T=2s"
                    title="Backup Lags"
                    color="#FF8C42"
                    frameFrom={25}
                    frameTo={40}
                    x={300}
                />

                {/* Arrow */}
                <AnimatedArrow x1={440} x2={490} y={210} frameStart={38} frameEnd={45} />

                {/* Step 3: T=5s - Queue Grows */}
                <CascadeStep
                    step={3}
                    time="T=5s"
                    title="Queue Grows"
                    color="#FFA500"
                    frameFrom={45}
                    frameTo={55}
                    x={500}
                />

                {/* Arrow down */}
                <AnimatedArrowDown x={565} y1={250} y2={280} frameStart={53} frameEnd={60} />

                {/* Step 4: T=10s - Recovery Kicks In (CRITICAL) */}
                {/* x=100 again (below Step 1?) user diagram implies loops back or separate row? */}
                {/* User prompt put x=960 for step 1, but my canvas is 1920 wide approx? */}
                {/* Wait, user prompt x coords were ~900-1200. */}
                {/* Step 4 x=960. Wait, step 1 x=960. So Step 4 is below Step 1. */}
                {/* My coordinates are scaled differently. I used x=100 for step 1. */}
                {/* Let's follow grid: row 1 (y=180), row 2 (y=250 + offset?) */}
                {/* User loop: 1->2->3->6? Wait, arrows go 3->? */}
                {/* User prompt ArrowDown from Step 3. So Step 6 is below Step 3? */}
                {/* Wait, Step 4 x=960 (aligned with Step 1). Step 5 x=1075 (aligned with Step 2). Step 6 x=1190 (aligned with Step 3). */}
                {/* So Row 2 is steps 4, 5, 6. */}

                {/* Row 2 */}
                <CascadeStep
                    step={4}
                    time="T=10s"
                    title="Recovery Kicks In"
                    subtitle="⚠ USES MORE CPU"
                    color="#FF6B35"
                    frameFrom={60}
                    frameTo={75}
                    x={100} // Aligned with Step 1
                    highlight={true}
                />

                {/* Arrow 3->6? No, usually flow is linear or wraps. */}
                {/* User prompt: ArrowDown from Step 3 (x=1190) -> y2=245. Step 4 (x=960). */}
                {/* This seems disjointed. 3 is at right end, 4 is at left end. */}
                {/* Maybe arrow goes from 3 to 6? */}
                {/* Ah, Step 3 (Queue Grows) -> Step 6 (Cascade Spreads)? No. */}
                {/* Step 4 is "Recovery Kicks In". The arrow user provided is "AnimatedArrow from={1050} to={1070} y={272} ...". */}
                {/* Step 4 is x=960. Arrow from 4 to 5 probably. */}
                {/* Step 5 x=1075. So 4->5. */}
                {/* Step 6 x=1190. So 5->6. */}
                {/* So how do we get to 4? */}
                {/* Maybe independent track? Or "At T=10s" happens parallel? */}
                {/* Or visually, the flow might be simply sequential in time, but placed in rows. */}
                {/* ArrowDown was used after Step 3. But Step 3 is x=1190. Step 4 is x=960. */}
                {/* Maybe there's a big arrow back? Or maybe the user meant flow is left-to-right, then carriage return? */}
                {/* But ArrowDown at 1235 (Step 3 center approx) goes down. To what? */}
                {/* Step 6 is at 1190. So Step 3 is above Step 6. */}
                {/* So 1->2->3 ->(down)-> 6 ?? */}
                {/* But Step 4 and 5 are to the left of 6. */}
                {/* Maybe 1->2->3 and simultaneously 4->5->6? */}
                {/* Timeline suggests sequential T=0, 2, 5, 10, 15, 20. */}
                {/* Let's render them in order: 1, 2, 3 (top row). 4, 5, 6 (bottom row). */}
                {/* I'll assume standard reading order. */}
                {/* I adjusted positions to fit my x=100 start. Width=130 + gap. */}
                {/* x: 1->100, 2->300, 3->500. */}
                {/* Row 2 (y=250 + offset = 350 approx or 300?) */}
                {/* User highlight y=267 vs normal 197. Delta ~70. */}

                {/* Step 4 x=100. Step 5 x=300. Step 6 x=500. */}

                {/* Connecting 3 to 4? Text implies "Recovery kicks in". */}
                {/* I'll render Arrows 4->5 and 5->6. */}
                {/* And maybe an arrow from 3 down to ... nowhere? Or maybe text explains. */}
                {/* I'll replicate user arrows: 4->5, 5->6. */}

                <AnimatedArrow x1={240} x2={290} y={280} frameStart={73} frameEnd={80} />

                <CascadeStep
                    step={5}
                    time="T=15s"
                    title="Services Fail"
                    subtitle="❌ STARVING"
                    color="#FF4444"
                    frameFrom={80}
                    frameTo={95}
                    x={300}
                    highlight={true}
                />

                <AnimatedArrow x1={440} x2={490} y={280} frameStart={93} frameEnd={100} />

                <CascadeStep
                    step={6}
                    time="T=20s"
                    title="Cascade Spreads"
                    subtitle="🔴 TOTAL FAILURE"
                    color="#CC0000"
                    frameFrom={100}
                    frameTo={120}
                    x={500}
                    highlight={true}
                    pulse={true}
                />

            </div>

            {/* Critical insight box (appears at end) */}
            <Fade from={100} to={120}>
                <CriticalBox x={100} y={450} width={320} height={90} bgColor="#FFE6E6" borderColor="#CC0000">
                    <Text size={16} weight="bold" color="#CC0000">CRITICAL FLAW AT 95% CPU:</Text>
                    <Text size={14} color="#333">• Headroom = 100% - 95% = 5%</Text>
                    <Text size={14} color="#333">• Recovery needs ~30% CPU</Text>
                    <Text size={14} weight="bold" color="#CC0000">RECOVERY IS IMPOSSIBLE ✗</Text>
                </CriticalBox>
            </Fade>

        </AbsoluteFill>
    );
};
