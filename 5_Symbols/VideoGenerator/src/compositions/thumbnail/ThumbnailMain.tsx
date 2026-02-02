import { AbsoluteFill, Img, staticFile } from 'remotion';
import React from 'react';

export const ThumbnailMain: React.FC = () => {
    return (
        <AbsoluteFill className="bg-black">
            {/* Background Image */}
            <Img
                src={staticFile("thumbnail/background.png")}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Text Box Container - Positioned at bottom center */}
            <div className="absolute bottom-12 w-full flex justify-center items-center z-10">
                {/* Blue Neon Box with Glassmorphism */}
                <div className="
            relative
            bg-blue-950/60
            border-[3px] border-cyan-400
            shadow-[0_0_30px_rgba(6,182,212,0.6),inset_0_0_20px_rgba(6,182,212,0.3)]
            rounded-xl
            px-16 py-8
            text-center
            backdrop-blur-sm
            max-w-[85%]
          ">
                    {/* Main Title */}
                    <h1 className="
              text-white
              text-7xl
              font-extrabold
              font-sans
              uppercase
              tracking-wider
              drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]
              mb-2
            ">
                        Future-Proof Your Career
                    </h1>

                    {/* Subtitle */}
                    <h2 className="
              text-cyan-100
              text-4xl
              font-sans
              font-medium
              tracking-wide
              drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]
            ">
                        Mastering the AI Revolution
                    </h2>

                    {/* Decorative Corner Glows (Optional subtle details) */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-cyan-300 rounded-tl-lg shadow-[0_0_10px_#06b6d4]"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-cyan-300 rounded-tr-lg shadow-[0_0_10px_#06b6d4]"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-cyan-300 rounded-bl-lg shadow-[0_0_10px_#06b6d4]"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-cyan-300 rounded-br-lg shadow-[0_0_10px_#06b6d4]"></div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
