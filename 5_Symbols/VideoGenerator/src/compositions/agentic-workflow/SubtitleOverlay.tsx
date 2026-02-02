import { AbsoluteFill, useCurrentFrame } from 'remotion';

type SubtitleType = 'A-Roll' | 'B-Roll';

interface SubtitleItem {
    startFrame: number;
    endFrame: number;
    text: string;
    type: SubtitleType;
}

const subtitles: SubtitleItem[] = [
    // Estimated Duration Maps (30fps) - Total approx 12900 frames
    // Scene 1: 0-1200
    { startFrame: 0, endFrame: 400, text: "The agentic error, how do I manage 240 plus workflows? Act 1. The hook, 00.", type: 'A-Roll' },
    { startFrame: 400, endFrame: 800, text: "If you are just typing prompts into chat GPT, you are essentially using the AI in a wrong way.", type: 'A-Roll' },
    { startFrame: 800, endFrame: 1200, text: "You are using a Ferrari just to go to the grocery store.", type: 'A-Roll' },

    // Scene 2: 1200-3300
    { startFrame: 1200, endFrame: 1600, text: "You are missing the wall point about the agentic error.", type: 'A-Roll' },
    { startFrame: 1600, endFrame: 2000, text: "For the last year, I have been obsessed with my Asperger's, looking into this agentic error...", type: 'A-Roll' },
    { startFrame: 2000, endFrame: 2400, text: "setting up all these workflows and not only using the chat GPT, but taking the outputs from it...", type: 'A-Roll' },
    { startFrame: 2400, endFrame: 2800, text: "I currently have over 240 autonomous workflows running in the background for my life in NA can.", type: 'A-Roll' },
    { startFrame: 2800, endFrame: 3300, text: "In this video, I'm going to show you an overview of the system that I'm using to bridge the AI skills gap...", type: 'A-Roll' },

    // Scene 3: 3300-4200
    { startFrame: 3300, endFrame: 3600, text: "I'm right now showing a showcase of the massive cameras of the NA 10 dashboard... 240 active workflows.", type: 'A-Roll' },
    { startFrame: 3600, endFrame: 3900, text: "The problem with the AI isn't just the technology. It is the gap what the technology can do and what you can deliver.", type: 'A-Roll' },
    { startFrame: 3900, endFrame: 4200, text: "I realized this yesterday on a Sunday at 5pm... all the shops were closed in the United Kingdom...", type: 'A-Roll' },

    // Scene 4: 4200-6000
    { startFrame: 4200, endFrame: 4600, text: "I could not have just used a single prompt. I needed an agent to be able to collect from my data sources...", type: 'A-Roll' },
    { startFrame: 4600, endFrame: 5000, text: "My key guy was always about intersection between gamifying the things and building real time projects...", type: 'A-Roll' },
    { startFrame: 5000, endFrame: 5400, text: "I don't want just the chatbot... I want to be able to have real time answers like a tutor...", type: 'A-Roll' },
    { startFrame: 5400, endFrame: 6000, text: "Instead of having just one channel... I'm right now starting telegram channels for my finance agent...", type: 'A-Roll' },

    // Scene 5: 6000-7800
    { startFrame: 6000, endFrame: 6600, text: "Now we do the screen share, the telegram. We show the telegram sidebar and specific channels for it.", type: 'A-Roll' },
    { startFrame: 6600, endFrame: 7200, text: "To keep this telegram becoming a mess, I started to use parametted in my obsidian... projects, areas, resources...", type: 'A-Roll' },
    { startFrame: 7200, endFrame: 7800, text: "In the NA10, I'm sometimes using Claude O1 as a specialist... you don't need a budget more than $20...", type: 'A-Roll' },

    // Scene 6: 7800-9600
    { startFrame: 7800, endFrame: 8400, text: "I have even built Blacklist system custom databases with zero cost to ensure that these agents don't throw errors...", type: 'A-Roll' },
    { startFrame: 8400, endFrame: 9000, text: "And from time to time, I'm using MCP to be able to fix those workflows. So I'm not actually writing a code...", type: 'A-Roll' },
    { startFrame: 9000, endFrame: 9600, text: "Now the screen share, I'm showing the NA10 error handling modes, the database... and Google sheets...", type: 'A-Roll' },

    // Scene 7: 9600-11100
    { startFrame: 9600, endFrame: 10100, text: "The app tree, it's the transformation. Now I have seen the alternative... a process runner in the background.", type: 'A-Roll' },
    { startFrame: 10100, endFrame: 10600, text: "I sit in root cause analysis meetings where highly paid professionals are unable to come up with the solutions...", type: 'A-Roll' },
    { startFrame: 10600, endFrame: 11100, text: "You have to start this revolution from your side. That is why I deleted all my distractions...", type: 'A-Roll' },

    // Scene 8: 11100-12900
    { startFrame: 11100, endFrame: 11600, text: "I'm creating delivery pilots for yourself to document the process so you can see them in the GitHub...", type: 'A-Roll' },
    { startFrame: 11600, endFrame: 12100, text: "I'm now showcasing the GitHub repository and in the documentation... the assessments and simulations...", type: 'A-Roll' },
    { startFrame: 12100, endFrame: 12500, text: "At the end of the day, AI isn't coming for your job. You have to make sure to be able to keep your job.", type: 'A-Roll' },
    { startFrame: 12500, endFrame: 12900, text: "Thanks for watching the video. I will see you in the next one.", type: 'A-Roll' },
];

export const SubtitleOverlay: React.FC = () => {
    const frame = useCurrentFrame();
    const currentSubtitle = subtitles.find(s => frame >= s.startFrame && frame < s.endFrame);

    if (!currentSubtitle) return null;

    const isARoll = currentSubtitle.type === 'A-Roll';

    return (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 150 }}>
            {/* Type Indicator Badge */}
            <div style={{
                backgroundColor: isARoll ? '#4ade80' : '#3b82f6', // Green for A-Roll, Blue for B-Roll
                color: isARoll ? '#000' : 'white',
                padding: '5px 15px',
                borderRadius: '20px',
                marginBottom: '20px',
                fontSize: 24,
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                textTransform: 'uppercase'
            }}>
                {isARoll ? 'A-ROLL (GREEN SCREEN)' : currentSubtitle.type}
            </div>

            {/* Subtitle Text */}
            <div style={{
                textAlign: 'center',
                maxWidth: '80%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '20px 40px',
                borderRadius: '10px',
            }}>
                <h2 style={{
                    color: 'white',
                    fontSize: 40,
                    margin: 0,
                    fontFamily: 'sans-serif',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    {currentSubtitle.text}
                </h2>
            </div>
        </AbsoluteFill>
    );
};
