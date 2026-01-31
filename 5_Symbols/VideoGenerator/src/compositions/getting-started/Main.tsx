import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';
import { z } from 'zod';
import { Check } from 'lucide-react';

export const gettingStartedSchema = z.object({
  titleColor: z.string().default('#ffffff'),
  primaryColor: z.string().default('#8b5cf6'), // violet-500
  secondaryColor: z.string().default('#06b6d4'), // cyan-500
});

// Reusable Card Component
const ItemCard = ({ 
  imageSrc, 
  title, 
  description, 
  delay, 
  direction = 'left',
  index,
  showCheckmark = false
}: { 
  imageSrc: string, 
  title: string, 
  description: string, 
  delay: number,
  direction?: 'left' | 'right' | 'top',
  index: number,
  showCheckmark?: boolean
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    }
  });

  const xOffset = direction === 'left' ? -1000 : direction === 'right' ? 1000 : 0;
  const yOffset = direction === 'top' ? -1000 : 0;

  const x = interpolate(entrance, [0, 1], [xOffset, 0]);
  const y = interpolate(entrance, [0, 1], [yOffset, 0]);
  
  // Pulse effect separate from entrance
  const pulse = Math.sin((frame - delay) / 10) * 0.05 + 1; // gentle pulse
  const scale = frame > delay + 30 ? pulse : 1; 

  // Checkmark animation
  const checkScale = spring({
      frame: frame - (delay + 30), 
      fps,
      config: { damping: 10 }
  });

  return (
    <div 
      className="absolute bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl flex flex-col items-center justify-center gap-4 text-center w-[400px]"
      style={{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        top: '30%',
        left: index === 0 ? '10%' : index === 1 ? '38%' : '66%', 
      }}
    >
      <div className="relative">
        <div className="p-1 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-cyan-400/20 shadow-lg mb-4 hover:scale-105 transition-transform duration-500">
            <Img src={staticFile(imageSrc)} className="w-48 h-48 object-cover rounded-xl" />
        </div>
        {showCheckmark && (
            <div 
                className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg"
                style={{ transform: `scale(${checkScale})` }}
            >
                <Check size={24} color="white" />
            </div>
        )}
      </div>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <p className="text-xl text-gray-200">{description}</p>
    </div>
  );
};

// Simplified Background
const Background = () => {
    return (
        <AbsoluteFill>
             <Img 
                src={staticFile("images/getting-started/background.png")} 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-purple-900/80 to-cyan-900/80 mix-blend-multiply" />
             <div className="absolute inset-0 opacity-10 mix-blend-plus-lighter">
                <svg width="100%" height="100%">
                    <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10 10 h 80 v 80 h -80 Z" fill="none" stroke="white" strokeWidth="1" />
                        <path d="M50 10 v 80 M10 50 h 80" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
             </div>
        </AbsoluteFill>
    );
};

export const GettingStartedMain: React.FC<z.infer<typeof gettingStartedSchema>> = ({
  titleColor,
}) => {
  const frame = useCurrentFrame();

  // Title Animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1]);
  const titleScale = interpolate(frame, [0, 30], [0.8, 1], { extrapolateRight: 'clamp' });
  
  // Summary State
  const isSummary = frame >= 600; // 20s
  
  return (
    <AbsoluteFill className="bg-black text-white font-sans">
      <Background />

      {/* Opening sequence 0-2s */}
      <Sequence from={0} durationInFrames={60}>
        <AbsoluteFill className="justify-center items-center flex-col">
            <h1 
                style={{ opacity: titleOpacity, transform: `scale(${titleScale})`, color: titleColor }}
                className="text-7xl font-black mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-center"
            >
                ✨ Getting Started: Prerequisites ✨
            </h1>
            <h2 
                style={{ opacity: interpolate(frame, [10, 30], [0, 1]) }}
                className="text-4xl text-cyan-300 font-light tracking-wide"
            >
                Let's set up your toolkit!
            </h2>
        </AbsoluteFill>
      </Sequence>

      {/* Prerequisite 1: GitHub - 2s onwards */}
      <Sequence from={60}>
        <div className={`absolute inset-0 transition-all duration-1000 ${isSummary ? 'translate-x-[0px] translate-y-0 scale-75' : ''}`}>
             {!isSummary && <div className="absolute top-10 left-10 text-xl font-mono text-cyan-400/80">01_GITHUB_ACCESS</div>}
             <ItemCard 
                imageSrc="images/getting-started/github.png"
                title="GitHub Account" 
                description="Let's code! Version control & collaboration." 
                delay={0}
                direction="left"
                index={0}
                showCheckmark={isSummary}
             />
        </div>
      </Sequence>

      {/* Prerequisite 2: Gemini - 8s onwards */}
      <Sequence from={240}>
        <div className={`absolute inset-0 transition-all duration-1000 ${isSummary ? 'translate-x-[0px] translate-y-0 scale-75' : ''}`}>
            {!isSummary && <div className="absolute top-10 transform -translate-x-1/2 left-1/2 text-xl font-mono text-purple-400/80">02_GEMINI_AI</div>}
            <ItemCard 
                imageSrc="images/getting-started/gemini.png"
                title="Gemini Account" 
                description="AI ready! Access neural capabilities." 
                delay={0}
                direction="top"
                index={1}
                showCheckmark={isSummary}
             />
        </div>
      </Sequence>

      {/* Prerequisite 3: Antigravity - 14s onwards */}
      <Sequence from={420}>
         <div className={`absolute inset-0 transition-all duration-1000 ${isSummary ? 'translate-x-[0px] translate-y-0 scale-75' : ''}`}>
             {!isSummary && <div className="absolute top-10 right-10 text-xl font-mono text-pink-400/80">03_ANTIGRAVITY_TOOLS</div>}
             <ItemCard 
                imageSrc="images/getting-started/antigravity.png"
                title="Antigravity" 
                description="Defy limits! Powerful agentic tools." 
                delay={0}
                direction="right"
                index={2}
                showCheckmark={isSummary}
             />
        </div>
      </Sequence>

      {/* Summary Overlay - 20s-24s */}
      <Sequence from={600} durationInFrames={120}>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-20">
              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse">
                  Ready to build something amazing!
              </h2>
          </div>
      </Sequence>
      
      {/* Outro 24s-26s */}
      <Sequence from={720}>
         <AbsoluteFill className="bg-black justify-center items-center" style={{ opacity: interpolate(frame - 720, [0, 15], [0, 1]) }}>
            <h1 className="text-8xl text-white font-thin tracking-widest">
                Go.
            </h1>
         </AbsoluteFill>
      </Sequence>
      
    </AbsoluteFill>
  );
};
