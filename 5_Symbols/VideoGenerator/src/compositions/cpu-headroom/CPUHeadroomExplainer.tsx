import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { TitleScene } from './Scene1_TitleIntro';
import { DeceptiveAverageScene } from './Scene2_DeceptiveAverage';
import { PeakRealityScene } from './Scene3_PeakReality';
import { CascadeFailureScene } from './Scene4_CascadeFailure';
import { ConclusionScene } from './Scene5_Conclusion';

export const CPUHeadroomExplainer = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#F5F5F5' }}>
            <Sequence from={0} durationInFrames={3600}>
                {/* Scene 1: Title intro */}
                <TitleScene />
            </Sequence>

            <Sequence from={3600} durationInFrames={1800}>
                {/* Scene 2: 50% average deceptive curve */}
                <DeceptiveAverageScene />
            </Sequence>

            <Sequence from={5400} durationInFrames={1800}>
                {/* Scene 3: Peak reality spike pattern */}
                <PeakRealityScene />
            </Sequence>

            <Sequence from={7200} durationInFrames={2400}>
                {/* Scene 4: Cascade failure timeline */}
                <CascadeFailureScene />
            </Sequence>

            <Sequence from={9600} durationInFrames={1200}>
                {/* Scene 5: Bottom line conclusion */}
                <ConclusionScene />
            </Sequence>
        </AbsoluteFill>
    );
};
