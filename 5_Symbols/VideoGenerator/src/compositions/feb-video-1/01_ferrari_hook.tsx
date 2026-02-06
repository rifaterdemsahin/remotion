
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Bot, Car, ShoppingBag } from 'lucide-react';

export const FerrariHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // --- Animation Timing Configuration ---
  const CONFIG = {
    shrinkStart: 45,      // Interface starts shrinking at 1.5s (assuming 30fps)
    carEnter: 60,         // Car enters at 2s
    groceryAppear: 50,    // Grocery store pops up just before car
    text2Start: 100,      // "You're using a Ferrari..." text appears at 3.3s
    fadeDuration: 15,
  };

  // --- Helpers ---
  // Scale down and move the ChatGPT interface
  const shrinkProgress = spring({
    frame: frame - CONFIG.shrinkStart,
    fps,
    config: { damping: 14, mass: 0.8 }
  });

  const interfaceScale = interpolate(shrinkProgress, [0, 1], [1, 0.3]);
  // Move from center (width/2, height/2) to bottom left (width*0.15, height*0.85)
  // Note: We need to offset the top position carefully because we are scaling.
  const interfaceX = interpolate(shrinkProgress, [0, 1], [width / 2, width * 0.15]);
  const interfaceY = interpolate(shrinkProgress, [0, 1], [height / 2, height * 0.85]);

  // First Text Fade
  // "Just Typing Prompts?" should fade out when interface shrinks
  const text1Opacity = interpolate(
      frame,
      [0, 15, CONFIG.shrinkStart, CONFIG.shrinkStart + 15],
      [0, 1, 1, 0]
  );

  // Grocery Icon Appearance
  const grocerySpring = spring({
      frame: frame - CONFIG.groceryAppear,
      fps,
      config: { stiffness: 200, damping: 10 }
  });
  const groceryScale = interpolate(grocerySpring, [0, 1], [0, 1]);

  // Ferrari Movement
  // Drive from right off-screen to position near grocery store
  const carProgress = spring({
    frame: frame - CONFIG.carEnter,
    fps,
    config: { mass: 1, damping: 15, stiffness: 80 }
  });
  
  // Start: Right side off screen, End: Left-Center
  const carX = interpolate(carProgress, [0, 1], [width + 300, width * 0.45]);
  
  // Second Text Appearance
  const text2Opacity = spring({
      frame: frame - CONFIG.text2Start,
      fps,
      config: { mass: 0.5 }
  });
  const text2Y = interpolate(text2Opacity, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ 
        backgroundColor: '#0f172a', // Slate-900
        fontFamily: 'Inter, system-ui, sans-serif',
        color: 'white',
        overflow: 'hidden'
    }}>
        
        {/* Background Gradient */}
        <AbsoluteFill style={{
            background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
            zIndex: 0
        }} />

        {/* --- SCENE 1: ChatGPT Interface --- */}
        <div style={{
            position: 'absolute',
            left: interfaceX,
            top: interfaceY,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 600, // Fixed width container to scale
        }}>
            <div style={{
                transform: `scale(${interfaceScale})`,
                transformOrigin: 'center center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                {/* Logo Circle */}
                <div style={{
                    backgroundColor: '#10a37f',
                    padding: '40px',
                    borderRadius: '50%',
                    boxShadow: '0 0 40px rgba(16, 163, 127, 0.4)',
                    marginBottom: '20px'
                }}>
                    <Bot size={120} color="white" strokeWidth={1.5} />
                </div>
                
                {/* Fake Interface Box (Visible when large) */}
                <div style={{
                    width: '800px',
                    height: '120px',
                    backgroundColor: '#343541',
                    borderRadius: '12px',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 30px',
                    opacity: interpolate(shrinkProgress, [0, 0.5], [1, 0]), // Hide when shrinking starts
                    border: '1px solid #565869'
                }}>
                    <div style={{ width: '20px', height: '20px', border: '2px solid #8e8ea0', marginRight: '20px' }}></div>
                    <div style={{ height: '16px', width: '200px', backgroundColor: '#8e8ea0', borderRadius: '4px' }}></div>
                </div>
            </div>
        </div>

        {/* Text Overlay 1: Just Typing Prompts? */}
        <div style={{
            position: 'absolute',
            top: '65%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: text1Opacity,
            zIndex: 20
        }}>
            <h1 style={{
                fontSize: '80px',
                fontWeight: 800,
                textAlign: 'center',
                background: 'linear-gradient(to right, #fff, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
            }}>
                Just Typing Prompts?
            </h1>
        </div>

        {/* --- SCENE 2: The Ferrari Analogy --- */}
        
        {/* Grocery Store Icon */}
        <div style={{
            position: 'absolute',
            left: width * 0.35,
            top: height / 2,
            transform: `scale(${groceryScale}) translate(-50%, -50%)`,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.15)', // Blue tint
                border: '3px solid #60a5fa',
                padding: '25px',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)'
            }}>
                <ShoppingBag size={50} color="#60a5fa" />
            </div>
            <div style={{ marginTop: '15px', color: '#93c5fd', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                GROCERIES
            </div>
        </div>

        {/* Ferrari (Car Icon) */}
        <div style={{
            position: 'absolute',
            left: carX,
            top: height / 2,
            transform: 'translate(-50%, -50%)',
            zIndex: 6
        }}>
             {/* Styling the car to look fast (tilted slightly?) No, just sleek red */}
             <div style={{
                 transform: `rotate(${interpolate(carProgress, [0, 0.2, 1], [-5, 2, 0])}deg)` // Dynamic entry tilt
             }}>
                <Car size={160} color="#ef4444" fill="#7f1d1d" strokeWidth={1.5} 
                     style={{ filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.6))' }}
                />
             </div>
             {/* Speed lines */}
             {carProgress < 1 && (
                 <div style={{
                     position: 'absolute',
                     right: -50,
                     top: 20,
                     width: 100,
                     height: 4,
                     background: 'rgba(255,255,255,0.5)',
                     boxShadow: '0 10px 0 rgba(255,255,255,0.5), 0 -10px 0 rgba(255,255,255,0.5)',
                     borderRadius: '2px',
                     opacity: interpolate(carProgress, [0.8, 1], [1, 0])
                 }} />
             )}
        </div>

        {/* Text Overlay 2: Ferrari for Groceries */}
        <div style={{
            position: 'absolute',
            bottom: height * 0.15,
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: text2Opacity,
            transform: `translateY(${text2Y}px)`,
            zIndex: 30
        }}>
            <h2 style={{
                fontSize: '70px',
                fontWeight: 900,
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.1,
                textShadow: '0 10px 30px rgba(0,0,0,0.8)'
            }}>
                <span style={{ color: '#cbd5e1' }}>You're using a </span>
                <span style={{ 
                    color: '#ef4444', 
                    textTransform: 'uppercase', 
                    fontStyle: 'italic',
                    textShadow: '0 0 20px rgba(239, 68, 68, 0.6)'
                }}>Ferrari</span>
            </h2>
            <h2 style={{
                fontSize: '50px',
                fontWeight: 700,
                margin: '10px 0 0 0',
                color: '#60a5fa' // Matches grocery icon
            }}>
                for groceries
            </h2>
        </div>

    </AbsoluteFill>
  );
};
