import React from "react";
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  interpolate, 
  spring, 
  useVideoConfig,
  Sequence,
  Audio,
  staticFile
} from "remotion";
import { z } from "zod";

export const simulationSchema = z.object({
  titleColor: z.string(),
});

const Scene: React.FC<{
  title: string;
  description: string;
  image: string;
  emoji?: string;
  showPilot?: boolean;
}> = ({ title, description, image, emoji, showPilot }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 10, 80, 90], [0, 1, 1, 0]);
    const scale = spring({ frame, fps, config: { damping: 15 } });

    // Pilot Animation
    const pilotY = spring({ frame: frame - 20, fps, config: { damping: 12 } });
    const pilotYVal = interpolate(pilotY, [0, 1], [300, 0]);
    
    return (
        <AbsoluteFill style={{ 
            justifyContent: "center", 
            alignItems: "center", 
            backgroundColor: "white",
            opacity 
        }}>
           <div style={{
               fontSize: 60,
               fontWeight: "bold",
               marginBottom: 40,
               color: "#333",
               textAlign: "center"
           }}>
               {title}
               {emoji && <span style={{marginLeft: 20}}>{emoji}</span>}
           </div>

           <div style={{
               width: 800,
               height: 500,
               border: "10px solid #eee",
               borderRadius: 20,
               overflow: "hidden",
               boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
               transform: `scale(${scale})`,
               position: "relative"
           }}>
               <img src={image} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 20 }} alt="" />
               
               {showPilot && (
                   <div style={{
                       position: "absolute",
                       bottom: -50,
                       right: -50,
                       width: 250,
                       height: 250,
                       transform: `translateY(${pilotYVal}px)`
                   }}>
                       <img src={staticFile("simulation-journey-images/delivery_pilot.png")} style={{ width: "100%" }} alt="Pilot" />
                   </div>
               )}
           </div>

           <div style={{
               fontSize: 32,
               color: "#666",
               marginTop: 40,
               maxWidth: 1000,
               textAlign: "center"
           }}>
               {description}
           </div>
        </AbsoluteFill>
    )
}

export const SimulationJourneyMain: React.FC<z.infer<typeof simulationSchema>> = ({
  titleColor,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#f5f6fa" }}>
        
        {/* Step 1: Identify Gap */}
        <Sequence from={0} durationInFrames={100}>
            <Audio src={staticFile("simulation-journey-sounds/whoosh.mp3")} />
            <Scene 
                title="Identify Skill Gap" 
                emoji="🔍"
                description="The user analyzes their assessment results and identifies specific areas needing improvement."
                image={staticFile("simulation-journey-images/gap_identification.png")}
            />
        </Sequence>

        {/* Step 2: Go to Simulation */}
        <Sequence from={100} durationInFrames={100}>
            <Audio src={staticFile("simulation-journey-sounds/whoosh.mp3")} />
            <Scene 
                title="Interactive Simulation" 
                emoji="🎓"
                description="They navigate to the simulation module, watching guided videos and following checklists."
                image={staticFile("simulation-journey-images/checklist_interface.png")}
            />
        </Sequence>

        {/* Step 3: Submit to Pilot */}
        <Sequence from={200} durationInFrames={100}>
            <Audio src={staticFile("simulation-journey-sounds/pop.mp3")} />
            <Scene 
                title="Submit & Guide" 
                emoji="🤖"
                description="Work is submitted to the AI Delivery Pilot, which provides immediate feedback and the next roadmap steps."
                image={staticFile("simulation-journey-images/delivery_pilot.png")}
                showPilot={false} // Image is already the pilot
            />
        </Sequence>

        {/* Step 4: Roadmap & Build */}
        <Sequence from={300} durationInFrames={100}>
            <Audio src={staticFile("simulation-journey-sounds/whoosh.mp3")} />
             <Scene 
                title="Follow Roadmap" 
                emoji="🗺️"
                description="Guided by the roadmap, the user builds real-world products to gain practical experience."
                image={staticFile("simulation-journey-images/roadmap_journey.png")}
                showPilot={true}
            />
        </Sequence>

        {/* Step 5: Build Products */}
         <Sequence from={400} durationInFrames={100}>
            <Audio src={staticFile("simulation-journey-sounds/pop.mp3")} />
             <Scene 
                title="Build Products" 
                emoji="🛠️"
                description="Hands-on construction of AI solutions."
                image={staticFile("simulation-journey-images/building_products.png")}
            />
        </Sequence>

        {/* Step 6: Certification */}
        <Sequence from={500} durationInFrames={120}>
             <Audio src={staticFile("simulation-journey-sounds/pop.mp3")} />
             <Scene 
                title="Get Certified" 
                emoji="🏆"
                description="Upon successful completion, the user is certified as a qualified pilot."
                image={staticFile("simulation-journey-images/certification_badge_final.png")}
            />
        </Sequence>

    </AbsoluteFill>
  );
};
