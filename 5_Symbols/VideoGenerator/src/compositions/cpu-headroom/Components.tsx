import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

// Helper to interpolate styles from object to object
export const Motion: React.FC<{
    from: React.CSSProperties;
    to: React.CSSProperties;
    durationInFrames: number;
    delay: number;
    children: React.ReactNode;
    style?: React.CSSProperties;
}> = ({ from, to, durationInFrames, delay, children, style }) => {
    const frame = useCurrentFrame();
    const progress = interpolate(frame - delay, [0, durationInFrames], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic)
    });

    const interpolatedStyle: React.CSSProperties = {};
    const keys = new Set([...Object.keys(from), ...Object.keys(to)]);

    keys.forEach((key) => {
        const k = key as keyof React.CSSProperties;
        const startValue = from[k];
        const endValue = to[k];

        if (typeof startValue === 'number' && typeof endValue === 'number') {
            // @ts-ignore
            interpolatedStyle[k] = interpolate(progress, [0, 1], [startValue, endValue]);
        } else {
            // Fallback for non-interpolatable values
            interpolatedStyle[k] = progress >= 1 ? endValue : startValue;
        }

        // Special handling for transform shorthand in user request (x, y)
        // The user used { x: -300 } which isn't valid CSS, so we'll map custom props if needed or assume user meant standard CSS or we handle 'x' 'y' manually.
        // However, React.CSSProperties doesn't have 'x'.
        // Let's assume the user meant to map 'x' to 'translateX' and 'y' to 'translateY' if they exist in the input object (casted).
    });

    // Handle custom 'x' and 'y' for transform if present in the generic objects
    const fromObj = from as any;
    const toObj = to as any;

    if (fromObj.x !== undefined || toObj.x !== undefined || fromObj.y !== undefined || toObj.y !== undefined) {
        const x = interpolate(progress, [0, 1], [fromObj.x || 0, toObj.x || 0]);
        const y = interpolate(progress, [0, 1], [fromObj.y || 0, toObj.y || 0]);
        interpolatedStyle.transform = `translate(${x}px, ${y}px)`;
    }

    return <div style={{ ...style, ...interpolatedStyle }}>{children}</div>;
};

export const Fade: React.FC<{
    from: number;
    to: number;
    children: React.ReactNode;
}> = ({ from, to, children }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [from, to], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return <div style={{ opacity }}>{children}</div>;
};

export const Axes: React.FC<{
    width: number;
    height: number;
    yMax: number;
    xLabels: string[];
    yLabels?: string[]; // Made optional as user didn't always provide it in prompt usage
}> = ({ width, height, yMax, xLabels, yLabels = [] }) => {
    return (
        <svg width={width + 50} height={height + 50} style={{ overflow: 'visible' }}>
            {/* Y-axis */}
            <line x1="0" y1="0" x2="0" y2={height} stroke="#333" strokeWidth={2} />

            {/* X-axis */}
            <line x1="0" y1={height} x2={width} y2={height} stroke="#333" strokeWidth={2} />

            {/* Grid lines and labels */}
            {yLabels.map((label, i) => (
                <g key={i}>
                    <line
                        x1="0"
                        y1={height - (i * height / (yLabels.length - 1 || 1))}
                        x2={width}
                        y2={height - (i * height / (yLabels.length - 1 || 1))}
                        stroke="#EEE"
                        strokeWidth="1"
                    />
                    <text
                        x="-10"
                        y={height - (i * height / (yLabels.length - 1 || 1)) + 5}
                        fontSize="10"
                        fill="#666"
                        textAnchor="end"
                    >
                        {label}
                    </text>
                </g>
            ))}

            {/* X-axis labels */}
            {xLabels.map((label, i) => (
                <text
                    key={i}
                    x={i * (width / (xLabels.length - 1 || 1))}
                    y={height + 20}
                    fontSize="10"
                    fill="#666"
                    textAnchor="middle"
                >
                    {label}
                </text>
            ))}
        </svg>
    );
};

// Helper for path generation
const generatePathUpToProgress = (points: { x: number, y: number }[], progress: number) => {
    if (points.length < 2) return "";

    // Total length logic is complex, simplify by drawing subset of points
    const totalPoints = points.length;
    const currentPointIndex = Math.floor((totalPoints - 1) * progress);
    const visiblePoints = points.slice(0, currentPointIndex + 1);

    if (visiblePoints.length === 0) return "";

    let path = `M ${visiblePoints[0].x} ${visiblePoints[0].y}`;
    for (let i = 1; i < visiblePoints.length; i++) {
        path += ` L ${visiblePoints[i].x} ${visiblePoints[i].y}`;
    }

    return path;
};

export const AnimatedCurve: React.FC<{
    points: { x: number, y: number }[];
    from: number;
    to: number;
    color: string;
    strokeWidth: number;
}> = ({ points, from, to, color, strokeWidth }) => {
    const frame = useCurrentFrame();
    const progress = interpolate(frame, [from, to], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const animatedPath = generatePathUpToProgress(points, progress);

    return (
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
            <path d={animatedPath} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
        </svg>
    );
};

export const Title: React.FC<{ text: string, x?: number, y?: number, color?: string }> = ({ text, x = 0, y = 0, color = "#000" }) => (
    <div style={{ position: 'absolute', left: x, top: y, fontSize: 32, fontWeight: 'bold', color }}>{text}</div>
);

export const Subtitle: React.FC<{ text: string }> = ({ text }) => (
    <div style={{ position: 'absolute', top: 500, width: '100%', textAlign: 'center', fontSize: 24, padding: 20 }}>
        {text}
    </div>
);

export const UnderlineAnimation: React.FC<{ from: number, to: number }> = ({ from, to }) => {
    const frame = useCurrentFrame();
    const width = interpolate(frame, [from, to], [0, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return <div style={{ position: 'absolute', bottom: 400, left: '50%', transform: 'translateX(-50%)', height: 4, backgroundColor: 'red', width }} />;
}

export const Checkmark: React.FC<{ x: number, y: number, size: number, color: string }> = ({ x, y, size, color }) => (
    <div style={{ position: 'absolute', left: x, top: y, fontSize: size, color }}>✓</div>
);

export const XMark: React.FC<{ x: number, y: number, size: number, color: string }> = ({ x, y, size, color }) => (
    <div style={{ position: 'absolute', left: x, top: y, fontSize: size, color }}>✗</div>
);

export const AnnotationBox: React.FC<{ x: number, y: number, text: string, color: string, from: number }> = ({ x, y, text, color, from }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [from, from + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <div style={{
            position: 'absolute',
            left: x,
            top: y,
            backgroundColor: color,
            padding: 10,
            borderRadius: 5,
            opacity,
            width: 300
        }}>
            {text}
        </div>
    );
}

export const Spike: React.FC<{ x: number, y: number, value: string, color: string }> = ({ x, y, value, color }) => (
    <div style={{ position: 'absolute', left: x, top: y, color, fontWeight: 'bold' }}>
        <div style={{ width: 4, height: 40, backgroundColor: color, margin: '0 auto' }}></div>
        {value}
    </div>
);

export const Text: React.FC<{
    x?: number;
    y?: number;
    size?: number;
    weight?: string;
    color?: string;
    children: React.ReactNode
}> = ({ x, y, size = 16, weight = 'normal', color = 'black', children }) => {
    const style: React.CSSProperties = {
        fontSize: size,
        fontWeight: weight as any,
        color,
        position: (x !== undefined || y !== undefined) ? 'absolute' : 'static',
        left: x,
        top: y,
    };
    return <div style={style}>{children}</div>;
};

export const GraphContainer: React.FC<{
    title: string;
    x: number;
    y: number;
    children: React.ReactNode;
}> = ({ title, x, y, children }) => {
    return (
        <div style={{ position: 'absolute', left: x, top: y }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{title}</div>
            <div style={{ position: 'relative' }}>
                {children}
            </div>
        </div>
    );
};

export const Line: React.FC<{
    y: number;
    color: string;
    width: number;
    dashArray?: string;
    strokeWidth?: number;
    opacity?: number;
}> = ({ y, color, width, dashArray, strokeWidth = 2, opacity = 1 }) => {
    return (
        <div style={{ position: 'absolute', top: y, width, height: strokeWidth, borderTop: `${strokeWidth}px ${dashArray ? 'dashed' : 'solid'} ${color}`, opacity }} />
    );
};
