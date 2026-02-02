import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

type SubtitleType = 'A-Roll' | 'ScreenCapture';

interface SubtitleItem {
    startFrame: number;
    endFrame: number;
    text: string;
    type: SubtitleType;
}

const subtitles: SubtitleItem[] = [
    // --- A-ROLL SEQUENCE (0 - 12900) ---
    // Scene 1
    { startFrame: 0, endFrame: 400, text: "The agentic error, how do I manage 240 plus workflows? Act 1. The hook, 00.", type: 'A-Roll' },
    { startFrame: 400, endFrame: 800, text: "If you are just typing prompts into chat GPT, you are essentially using the AI in a wrong way.", type: 'A-Roll' },
    { startFrame: 800, endFrame: 1200, text: "You are using a Ferrari just to go to the grocery store.", type: 'A-Roll' },
    // Scene 2
    { startFrame: 1200, endFrame: 1600, text: "You are missing the wall point about the agentic error.", type: 'A-Roll' },
    { startFrame: 1600, endFrame: 2000, text: "For the last year, I have been obsessed with my Asperger's, looking into this agentic error...", type: 'A-Roll' },
    { startFrame: 2000, endFrame: 2400, text: "setting up all these workflows and not only using the chat GPT, but taking the outputs from it...", type: 'A-Roll' },
    { startFrame: 2400, endFrame: 2800, text: "I currently have over 240 autonomous workflows running in the background for my life in NA can.", type: 'A-Roll' },
    { startFrame: 2800, endFrame: 3300, text: "In this video, I'm going to show you an overview of the system that I'm using to bridge the AI skills gap...", type: 'A-Roll' },
    // Scene 3
    { startFrame: 3300, endFrame: 3600, text: "I'm right now showing a showcase of the massive cameras of the NA 10 dashboard... 240 active workflows.", type: 'A-Roll' },
    { startFrame: 3600, endFrame: 3900, text: "The problem with the AI isn't just the technology. It is the gap what the technology can do and what you can deliver.", type: 'A-Roll' },
    { startFrame: 3900, endFrame: 4200, text: "I realized this yesterday on a Sunday at 5pm... all the shops were closed in the United Kingdom...", type: 'A-Roll' },
    // Scene 4
    { startFrame: 4200, endFrame: 4600, text: "I could not have just used a single prompt. I needed an agent to be able to collect from my data sources...", type: 'A-Roll' },
    { startFrame: 4600, endFrame: 5000, text: "My key guy was always about intersection between gamifying the things and building real time projects...", type: 'A-Roll' },
    { startFrame: 5000, endFrame: 5400, text: "I don't want just the chatbot... I want to be able to have real time answers like a tutor...", type: 'A-Roll' },
    { startFrame: 5400, endFrame: 6000, text: "Instead of having just one channel... I'm right now starting telegram channels for my finance agent...", type: 'A-Roll' },
    // Scene 5
    { startFrame: 6000, endFrame: 6600, text: "Now we do the screen share, the telegram. We show the telegram sidebar and specific channels for it.", type: 'A-Roll' },
    { startFrame: 6600, endFrame: 7200, text: "To keep this telegram becoming a mess, I started to use parametted in my obsidian... projects, areas, resources...", type: 'A-Roll' },
    { startFrame: 7200, endFrame: 7800, text: "In the NA10, I'm sometimes using Claude O1 as a specialist... you don't need a budget more than $20...", type: 'A-Roll' },
    // Scene 6
    { startFrame: 7800, endFrame: 8400, text: "I have even built Blacklist system custom databases with zero cost to ensure that these agents don't throw errors...", type: 'A-Roll' },
    { startFrame: 8400, endFrame: 9000, text: "And from time to time, I'm using MCP to be able to fix those workflows. So I'm not actually writing a code...", type: 'A-Roll' },
    { startFrame: 9000, endFrame: 9600, text: "Now the screen share, I'm showing the NA10 error handling modes, the database... and Google sheets...", type: 'A-Roll' },
    // Scene 7
    { startFrame: 9600, endFrame: 10100, text: "The app tree, it's the transformation. Now I have seen the alternative... a process runner in the background.", type: 'A-Roll' },
    { startFrame: 10100, endFrame: 10600, text: "I sit in root cause analysis meetings where highly paid professionals are unable to come up with the solutions...", type: 'A-Roll' },
    { startFrame: 10600, endFrame: 11100, text: "You have to start this revolution from your side. That is why I deleted all my distractions...", type: 'A-Roll' },
    // Scene 8
    { startFrame: 11100, endFrame: 11600, text: "I'm creating delivery pilots for yourself to document the process so you can see them in the GitHub...", type: 'A-Roll' },
    { startFrame: 11600, endFrame: 12100, text: "I'm now showcasing the GitHub repository and in the documentation... the assessments and simulations...", type: 'A-Roll' },
    { startFrame: 12100, endFrame: 12500, text: "At the end of the day, AI isn't coming for your job. You have to make sure to be able to keep your job.", type: 'A-Roll' },
    { startFrame: 12500, endFrame: 12900, text: "Thanks for watching the video. I will see you in the next one.", type: 'A-Roll' },

    // --- SCREEN CAPTURE B-ROLL SEQUENCE (13000+) ---
    { startFrame: 13000, endFrame: 13500, text: "I created NA10 in my own domain... 6,900 workflow executions... hundreds of pages...", type: 'ScreenCapture' },
    { startFrame: 13500, endFrame: 14000, text: "I control my home internet, respond to job offers, follow invoices... different use cases coming in.", type: 'ScreenCapture' },
    { startFrame: 14000, endFrame: 14600, text: "If you go into one of the NA10 workloads... created with MCP... communicate with router... telegram message.", type: 'ScreenCapture' },
    { startFrame: 14600, endFrame: 15200, text: "I should be able to go to telegram... internet on/off... automation with timelines depending on kids.", type: 'ScreenCapture' },
    { startFrame: 15200, endFrame: 15800, text: "BotFather creating new channels... add new members... Family Agent channel for specific actions.", type: 'ScreenCapture' },
    { startFrame: 15800, endFrame: 16400, text: "Having one channel is easier... set a workflow called error workflow... active workflows only.", type: 'ScreenCapture' },
    { startFrame: 16400, endFrame: 17000, text: "If something fails, it triggers... error core workflow... MCP connection to enable/disable access.", type: 'ScreenCapture' },
    { startFrame: 17000, endFrame: 17600, text: "Respond to job offers in Gmail... active workloads only with triggers can get MCP... adding webhook workflow.", type: 'ScreenCapture' },
    { startFrame: 17600, endFrame: 18200, text: "Blacklisting for not delivered emails... Google sheets rows... hold down state in NA10.", type: 'ScreenCapture' },
    { startFrame: 18200, endFrame: 18800, text: "GitHub repositories... delivery pilot... private library turning on/off internet... similar structure.", type: 'ScreenCapture' },
    { startFrame: 18800, endFrame: 19400, text: "Deep dive into symbols... backup folder... all workflow backed up... updated by MCP tools.", type: 'ScreenCapture' },
    { startFrame: 19400, endFrame: 20000, text: "Video production in Obsidian... git commit... cleanup processes... conflicting projects/deadlines.", type: 'ScreenCapture' },
    { startFrame: 20000, endFrame: 20600, text: "Second brain simulation... complex graph relationships... update daily... all integrated system.", type: 'ScreenCapture' },
    { startFrame: 20600, endFrame: 21200, text: "Para method... new thread... Tiago Forte... projects, areas, resources, archives working together.", type: 'ScreenCapture' },
    { startFrame: 21200, endFrame: 21800, text: "Start your journey... assessment... simulations... process checklist... transforming enterprise.", type: 'ScreenCapture' }
];

export const SubtitleOverlay: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig(); // Get fps for timecode calculation if needed
    
    const currentSubtitle = subtitles.find(s => frame >= s.startFrame && frame < s.endFrame);

    if (!currentSubtitle) return null;

    const isARoll = currentSubtitle.type === 'A-Roll';
    // Blueprint colors: Green for A-Roll, Red for Captures
    const badgeColor = isARoll ? '#2ecc71' : '#e74c3c'; 
    const badgeText = isARoll ? 'A-ROLL' : 'SCREEN CAPTURE';
    
    // Engineering Design Style (Blueprint Look)
    return (
        <AbsoluteFill style={{ 
            pointerEvents: 'none', // Allow clicking through if needed
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            paddingBottom: 100 
        }}>
            
            {/* Blueprint HUD Container */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '90%',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                border: `2px solid ${badgeColor}`,
                borderRadius: '8px',
                padding: '24px',
                boxShadow: `0 0 20px ${badgeColor}40`, // Soft glow
                position: 'relative',
            }}>
                
                {/* Status Header */}
                <div style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '24px',
                    backgroundColor: badgeColor,
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: 14,
                    fontWeight: 900,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    {badgeText}
                </div>

                {/* Technical Metadata (Blueprint style) */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontFamily: 'monospace',
                    fontSize: 12,
                    color: '#888',
                }}>
                    FR: {frame} | SEC: {(frame/fps).toFixed(1)}
                </div>

                {/* Narrative Script */}
                <h2 style={{
                    color: '#ffffff',
                    fontSize: 32,
                    fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace', // Monospace for technical code feel
                    textAlign: 'center',
                    lineHeight: 1.4,
                    margin: '10px 0 0 0',
                    fontWeight: 500,
                }}>
                    "{currentSubtitle.text}"
                </h2>
                
            </div>
        </AbsoluteFill>
    );
};
