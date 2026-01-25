import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";
import { z } from "zod";

export const dialecticSchema = z.object({
  themeColor: z.string(),
});

// A big Plus Sign
const PlusSign: React.FC<{
  color: string;
  scale?: number;
}> = ({ color, scale = 1 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 600,
          backgroundColor: color,
          borderRadius: 20,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 200,
          backgroundColor: color,
          borderRadius: 20,
        }}
      />
    </div>
  );
};

// A big Minus Sign
const MinusSign: React.FC<{
  color: string;
  scale?: number;
}> = ({ color, scale = 1 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 200,
          backgroundColor: color,
          borderRadius: 20,
        }}
      />
    </div>
  );
};

// The Synthesis Shape (e.g. a diamond/star)
const SynthesisShape: React.FC<{
  color: string;
  scale?: number;
}> = ({ color, scale = 1 }) => {
  return (
    <div
      style={{
        width: 500,
        height: 500,
        backgroundColor: color,
        transform: `scale(${scale}) rotate(45deg)`,
        borderRadius: 40,
        boxShadow: `0 0 60px ${color}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       <div style={{ transform: "rotate(-45deg)", color: "white", fontSize: 60, fontFamily: "sans-serif", fontWeight: "bold" }}>
          NEW
       </div>
    </div>
  );
};

// Conflict particles/chaos
const Chaos: React.FC = () => {
    const frame = useCurrentFrame();
    const particles = new Array(20).fill(0).map((_, i) => {
        const x = (random(i) - 0.5) * 800;
        const y = (random(i + 100) - 0.5) * 800;
        const speed = random(i + 200) * 10;
        const size = random(i + 300) * 40 + 10;
        
        // Jitter
        const jX = (random(frame + i) - 0.5) * 50;
        const jY = (random(frame + i + 1000) - 0.5) * 50;

        // Move based on speed
        const moveX = Math.sin(frame / 10 + i) * speed;
        const moveY = Math.cos(frame / 10 + i) * speed;
        
        return (
            <div
                key={i}
                style={{
                    position: "absolute",
                    left: 960 + x + jX + moveX,
                    top: 540 + y + jY + moveY,
                    width: size,
                    height: size,
                    backgroundColor: i % 2 === 0 ? "#FFD700" : "#ff0000",
                    borderRadius: "50%",
                    opacity: 0.6
                }} 
            />
        )
    });
    return <AbsoluteFill>{particles}</AbsoluteFill>;
}


export const DialecticMain: React.FC<z.infer<typeof dialecticSchema>> = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Timeline (Total ~10s = 300 frames)
  // 0-2s: Thesis (+) appears
  // 2-4s: Antithesis (-) appears opposite
  // 4-6s: They move to center & conflict
  // 6-7s: Intense flash/chaos
  // 7-10s: Synthesis appears

  const scene1Start = 0;
  const scene2Start = 2 * fps;
  const conflictStart = 4 * fps;
  const synthesisStart = 7 * fps;

  // -- Scene 1: Thesis Animation --
  const thesisScale = spring({
      frame: frame - scene1Start,
      fps,
      config: { stiffness: 100 }
  });
  
  // Slide Thesis to left when Antithesis comes
  const thesisMove = spring({
      frame: frame - scene2Start,
      fps,
      config: { stiffness: 60 }
  });
  const thesisX = interpolate(thesisMove, [0, 1], [0, -500]);
  
  // -- Scene 2: Antithesis Animation --
  const antithesisSlide = spring({
      frame: frame - scene2Start,
      fps,
      config: { stiffness: 80 }
  });
  const antithesisX = interpolate(antithesisSlide, [0, 1], [1200, 500]); // Starts off screen right, moves to +500

  // -- Scene 3: Conflict/Merge --
  // Move both to 0
  const mergeProgress = spring({
      frame: frame - conflictStart,
      fps,
      config: { stiffness: 30 }
  });
  
  // When merging, shake them
  const isMerging = frame > conflictStart && frame < synthesisStart;
  const shake = isMerging ? (random(frame) - 0.5) * 40 : 0;
  
  const currentThesisX = interpolate(mergeProgress, [0, 1], [thesisX, 0]);
  const currentAntithesisX = interpolate(mergeProgress, [0, 1], [antithesisX, 0]);
  
  // Scale down/distort during conflict
  const conflictDistort = interpolate(mergeProgress, [0, 0.8, 1], [1, 1.2, 0]); // Shrink to 0 at end of conflict

  // -- Scene 4: Synthesis --
  const synthesisScale = spring({
      frame: frame - synthesisStart,
      fps,
      config: { stiffness: 100, damping: 10 }
  });


  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
        
        <div style={{
            position: "absolute",
            top: 100,
            width: "100%",
            textAlign: "center",
            color: "#666",
            fontSize: 40,
            fontFamily: "monospace"
        }}>
            THE DIALECTIC PROCESS
        </div>

        {/* THESIS (+): Visible until synthesis starts */}
        {frame < synthesisStart && (
             <div style={{
                 position: "absolute",
                 left: "50%",
                 top: "50%",
                 transform: `translate(-50%, -50%) translate(${currentThesisX + shake}px, ${shake}px) scale(${thesisScale * conflictDistort})`
             }}>
                 <PlusSign color="#3498db" />
                 <div style={{ textAlign: "center", marginTop: 250, fontSize: 60, fontWeight: "bold", color: "#3498db" }}>THESIS</div>
             </div>
        )}

        {/* ANTITHESIS (-): Visible from Scene 2 until synthesis starts */}
        {frame > scene2Start && frame < synthesisStart && (
             <div style={{
                 position: "absolute",
                 left: "50%",
                 top: "50%",
                 transform: `translate(-50%, -50%) translate(${currentAntithesisX - shake}px, ${-shake}px) scale(${conflictDistort})`
             }}>
                 <MinusSign color="#e74c3c" />
                 <div style={{ textAlign: "center", marginTop: 250, fontSize: 60, fontWeight: "bold", color: "#e74c3c" }}>ANTITHESIS</div>
             </div>
        )}
        
        {/* CHAOS/CONFLICT OVERLAY */}
        {isMerging && (
            <AbsoluteFill style={{ opacity: interpolate(mergeProgress, [0, 1], [0, 1]) }}>
               <Chaos />
               <div style={{
                   position: 'absolute',
                   top: '40%',
                   width: '100%',
                   textAlign: 'center',
                   fontSize: 100,
                   fontWeight: 900,
                   color: 'white',
                   textShadow: '0 0 20px red',
                   opacity: random(frame)
               }}>
                   CONFLICT
               </div>
            </AbsoluteFill>
        )}
        
        {/* SYNTHESIS: Appears at end */}
        {frame > synthesisStart && (
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                 <div style={{ transform: `scale(${synthesisScale})` }}>
                    <SynthesisShape color="#9b59b6" />
                     <div style={{ textAlign: "center", marginTop: 100, fontSize: 80, fontWeight: "bold", color: "#9b59b6", fontFamily: 'sans-serif' }}>
                         SYNTHESIS
                     </div>
                 </div>
                 {/* Sparkles/Particles for newness */}
            </AbsoluteFill>
        )}

    </AbsoluteFill>
  );
};
