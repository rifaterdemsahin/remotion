import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';
import {
    Text,
    Fade,
    Motion,
} from './Components';

const Box: React.FC<{
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
        height, // Note: contents might overflow if height is fixed and small, used auto or sufficient height
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 10,
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        gap: 5
    }}>
        {children}
    </div>
);

const BoxTitle: React.FC<{ children: React.ReactNode, color?: string }> = ({ children, color = 'black' }) => (
    <div style={{ fontSize: 18, fontWeight: 'bold', color, marginBottom: 5 }}>{children}</div>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ fontSize: 14, color: '#333' }}>{children}</div>
);

export const ConclusionScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#F5F5F5' }}>
            {/* Screen wipes from cascade to conclusion could be handled by parent transition or just cut */}

            {/* Full-screen comparison */}
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>

                {/* Left box: 50% Average */}
                <Fade from={5} to={15}>
                    <Box x={100} y={150} width={400} height={250} bgColor="#FFCCCB" borderColor="#CC0000">
                        <BoxTitle color="#CC0000">50% Average (TRAP)</BoxTitle>
                        <Bullet>• Daily average: 50%</Bullet>
                        <Bullet>• Peak during business: 95%</Bullet>
                        <Bullet>• Recovery headroom: 5%</Bullet>
                    </Box>
                </Fade>

                {/* Center: vs. */}
                <Fade from={15} to={20}>
                    <Text x={550} y={250} size={32} weight="bold">vs.</Text>
                </Fade>

                {/* Right box: 30-35% Baseline */}
                <Fade from={20} to={30}>
                    <Box x={650} y={150} width={400} height={250} bgColor="#CCFFCC" borderColor="#228B22">
                        <BoxTitle color="#228B22">30-35% Baseline (SAFE)</BoxTitle>
                        <Bullet>• Daily average: 30-35%</Bullet>
                        <Bullet>• Peak during business: 60-70%</Bullet>
                        <Bullet>• Recovery headroom: 30%+</Bullet>
                    </Box>
                </Fade>

                {/* Center: Key insight */}
                <Fade from={15} to={30}>
                    <Box x={100} y={450} width={950} height={150} bgColor="#E3F2FD" borderColor="#1565C0">
                        <BoxTitle color="#1565C0">Why It Matters</BoxTitle>
                        <Text size={24}>Cascade failures happen at PEAKS, not averages.</Text>
                        <Text size={24} weight="bold" color="#CC0000">Average is a LIE. Peak is the TRUTH.</Text>
                    </Box>
                </Fade>

                {/* Final statement */}
                <Fade from={15} to={30}>
                    <Motion
                        from={{ scale: 0.95 }}
                        to={{ scale: 1 }}
                        durationInFrames={15}
                        delay={15}
                        style={{
                            position: 'absolute',
                            left: 100,
                            top: 650,
                            width: 950,
                            textAlign: 'center'
                        }}
                    >
                        <Text size={28} weight="bold" color="#333">
                            You need headroom at PEAKS, not averages. 30-35% baseline keeps you safe.
                        </Text>
                    </Motion>
                </Fade>

            </div>
        </AbsoluteFill>
    );
};
