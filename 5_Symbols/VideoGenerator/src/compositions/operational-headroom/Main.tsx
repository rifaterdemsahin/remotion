import React from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Sequence, Img, staticFile, spring } from 'remotion';
import { z } from 'zod';

export const operationalHeadroomSchema = z.object({
    primaryColor: z.string(),
    textColor: z.string(),
});

const slides = [
    {
        text: "The root cause of these failures is a lack of operational \"headroom\" in the replication pipeline.",
        image: "/operational-headroom/pipeline_headroom.png"
    },
    {
        text: "While a 51% average CPU utilization looks safe on paper, it masks invisible micro-spikes that momentarily starve the WAL (Write-Ahead Log) sender process...",
        image: "/operational-headroom/cpu_microspikes.png"
    },
    {
        text: "...disrupting the millisecond-level synchronization required for EDB to maintain replication lag within acceptable bounds.",
        image: "/operational-headroom/wal_sender_starvation.png"
    },
    {
        text: "These CPU freezes cause the standby replica to stop receiving WAL segments, breaking the replication stream and triggering automated failover logic.",
        image: "/operational-headroom/failover_logic.png"
    },
    {
        text: "This kicks off a cascading \"recovery storm\" where the primary becomes read-only, in-flight transactions abort, connection pools exhaust retries, and applications hammer the failover endpoint...",
        image: "/operational-headroom/recovery_storm.png"
    },
    {
        text: "...all while the actual resource constraint was transient.",
        image: "/operational-headroom/transient_constraint.png"
    },
    {
        text: "The cluster collapses not because it ran out of resources, but because the replication monitoring system interpreted a timing anomaly as a genuine failure...",
        image: "/operational-headroom/monitoring_timing_anomaly.png"
    },
    {
        text: "...resulting in unnecessary promotion and a split-brain scenario that corrupts consistency—turning a minor CPU hiccup into a total service outage.",
        image: "/operational-headroom/split_brain_consistency.png"
    }
];

const Slide: React.FC<{ text: string; image: string; duration: number }> = ({ text, image, duration }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(
        frame,
        [0, 15, duration - 15, duration],
        [0, 1, 1, 0]
    );

    // Animate image sliding in
    const imageProgress = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12 }
    });

    const imageScale = interpolate(imageProgress, [0, 1], [0.8, 1]);
    const imageOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            backgroundColor: '#111',
            opacity
        }}>
            {/* Text Section */}
            <div style={{
                flex: 1,
                padding: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // textAlign: 'left'
            }}>
                <h1 style={{
                    color: 'white',
                    fontSize: 40,
                    fontFamily: 'system-ui, sans-serif',
                    lineHeight: 1.4,
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    {text}
                </h1>
            </div>

            {/* Image Section */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px'
            }}>
                <div style={{
                    boxShadow: '0 0 50px rgba(56, 189, 248, 0.2)',
                    borderRadius: 20,
                    overflow: 'hidden',
                    transform: `scale(${imageScale})`,
                    opacity: imageOpacity,
                    border: '2px solid rgba(56, 189, 248, 0.3)'
                }}>
                    <Img
                        src={staticFile(image)}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '800px',
                            objectFit: 'contain'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export const OperationalHeadroomMain: React.FC<z.infer<typeof operationalHeadroomSchema>> = ({
    primaryColor,
    textColor
}) => {
    const slideDuration = 180; // 6 seconds per slide

    return (
        <AbsoluteFill style={{ backgroundColor: '#111' }}>
            <div style={{
                position: 'absolute',
                top: 40,
                left: 40,
                color: primaryColor,
                fontSize: 30,
                fontWeight: 'bold',
                fontFamily: 'system-ui, sans-serif',
                opacity: 0.7,
                zIndex: 10
            }}>
                Operational Headroom
            </div>

            {slides.map((slide, index) => (
                <Sequence key={index} from={index * slideDuration} durationInFrames={slideDuration}>
                    <Slide text={slide.text} image={slide.image} duration={slideDuration} />
                </Sequence>
            ))}
        </AbsoluteFill>
    );
};
