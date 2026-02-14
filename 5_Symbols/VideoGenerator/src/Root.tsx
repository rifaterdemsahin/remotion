import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

// Import all compositions from the compositions folder
import { AiAvalancheMain, avalancheSchema } from "./compositions/ai-avalanche/Main";
import { DialecticMain, dialecticSchema } from "./compositions/ai-avalanche/Dialectic";
import { AiTransformMain, aiTransformSchema } from "./compositions/ai-transformation/Main";
import { AscProtocolMain, ascSchema } from "./compositions/asc-protocol/Main";
import { BayesianMain, bayesSchema } from "./compositions/bayesian-logic/Main";
import { MapOfConsciousness } from "./compositions/map-of-consciousness/MapOfConsciousness";
import { SimulationJourneyMain, simulationSchema } from "./compositions/simulation-journey/Main";
import { SurplusValueMain, surplusValueSchema } from "./compositions/surplus-value/Main";
import { CoderVsWizardMain, coderVsWizardSchema } from "./compositions/coder-vs-wizard/Main";
import { GettingStartedMain, gettingStartedSchema } from "./compositions/getting-started/Main";
import { MissionVisionMain, missionVisionSchema } from "./compositions/mission-vision/Main";
import { AgenticWorkflowMain, agenticWorkflowSchema } from "./compositions/agentic-workflow/Main";
import { OperationalHeadroomMain, operationalHeadroomSchema } from "./compositions/operational-headroom/Main";
import { CPUHeadroomExplainer } from "./compositions/cpu-headroom/CPUHeadroomExplainer";
import { ThumbnailMain } from "./compositions/thumbnail/ThumbnailMain";
import { AgenticEraMain, agenticEraSchema } from "./compositions/agentic-era/Main";
import { FerrariHook } from "./compositions/feb-video-1/01_ferrari_hook";
import { WorkforceCounter } from "./compositions/feb-video-1/02_workforce_counter";
import { N8nMammothZoom } from "./compositions/feb-video-1/03_n8n_mammoth";
import { SkillsGap } from "./compositions/feb-video-1/04_skills_gap";
import { TelegramCommandCenter } from "./compositions/feb-video-1/05_telegram_channels";
import { ParaMethod } from "./compositions/feb-video-1/06_para_method";
import { BlacklistSystem } from "./compositions/feb-video-1/07_blacklist_system";
import { McpProtocol } from "./compositions/feb-video-1/08_mcp_protocol";
import { RevolutionWave } from "./compositions/feb-video-1/09_revolution_wave";
import { AppDeletion } from "./compositions/feb-video-1/10_app_deletion";
import { GithubRepoTour } from "./compositions/feb-video-1/11_github_repo";
import { SingleWorkflow } from "./compositions/feb-video-1/12_single_workflow";
import { CtaEndCard } from "./compositions/feb-video-1/13_cta_endcard";

// Delivery Pilot Transformation compositions
import { GoldenMicIntro } from "./compositions/delivery-pilot/01_golden_mic";
import { PivotDecision } from "./compositions/delivery-pilot/02_pivot_decision";
import { ZombieSnails } from "./compositions/delivery-pilot/03_zombie_snails";
import { StatuesVsMercury } from "./compositions/delivery-pilot/04_statues_vs_mercury";
import { BreakingChains } from "./compositions/delivery-pilot/05_breaking_chains";
import { CloneLab } from "./compositions/delivery-pilot/06_clone_lab";
import { FreeTierTools } from "./compositions/delivery-pilot/07_free_tier_tools";
import { InternetKillSwitch } from "./compositions/delivery-pilot/08_internet_kill_switch";
import { LlmFeastTable } from "./compositions/delivery-pilot/09_llm_feast";
import { ClaudeCard } from "./compositions/delivery-pilot/10_claude_card";
import { ChatgptCard } from "./compositions/delivery-pilot/11_chatgpt_card";
import { DeepseekCard } from "./compositions/delivery-pilot/12_deepseek_card";
import { GeminiCard } from "./compositions/delivery-pilot/13_gemini_card";
import { N8nBespokeLogic } from "./compositions/delivery-pilot/14_n8n_bespoke";
import { SuccessMetrics } from "./compositions/delivery-pilot/15_success_metrics";
import { DroneCityFinale } from "./compositions/delivery-pilot/16_drone_city_finale";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Base Remotion Template Compositions */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      {/* AI Avalanche Compositions */}
      <Composition
        id="AiAvalanche"
        component={AiAvalancheMain}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
        schema={avalancheSchema}
        defaultProps={{
          titleColor: "white",
        }}
      />

      <Composition
        id="Dialectic"
        component={DialecticMain}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
        schema={dialecticSchema}
        defaultProps={{
          themeColor: "#ffffff",
        }}
      />

      {/* AI Transformation */}
      <Composition
        id="AiTransformation"
        component={AiTransformMain}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={aiTransformSchema}
        defaultProps={{
          titleColor: "#2c3e50",
        }}
      />

      {/* ASC Protocol */}
      <Composition
        id="AscProtocol"
        component={AscProtocolMain}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
        schema={ascSchema}
        defaultProps={{
          primaryColor: "#38bdf8",
          secondaryColor: "#a855f7",
          accentColor: "#fbbf24",
        }}
      />

      {/* Bayesian Logic */}
      <Composition
        id="BayesianLogic"
        component={BayesianMain}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={bayesSchema}
        defaultProps={{
          titleColor: "#2c3e50",
        }}
      />

      {/* Map of Consciousness */}
      <Composition
        id="MapOfConsciousness"
        component={MapOfConsciousness}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Simulation Journey */}
      <Composition
        id="SimulationJourney"
        component={SimulationJourneyMain}
        durationInFrames={620}
        fps={30}
        width={1920}
        height={1080}
        schema={simulationSchema}
        defaultProps={{
          titleColor: "#2c3e50",
        }}
      />

      {/* Surplus Value */}
      <Composition
        id="SurplusValue"
        component={SurplusValueMain}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={surplusValueSchema}
        defaultProps={{
          titleColor: "#2c3e50",
        }}
      />

      {/* Coder vs Wizard */}
      <Composition
        id="CoderVsWizard"
        component={CoderVsWizardMain}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        schema={coderVsWizardSchema}
        defaultProps={{}}
      />
      {/* Getting Started Prerequisites */}
      <Composition
        id="GettingStarted"
        component={GettingStartedMain}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={gettingStartedSchema}
        defaultProps={{
          titleColor: '#ffffff',
          primaryColor: '#8b5cf6',
          secondaryColor: '#06b6d4',
        }}
      />
      {/* Mission Vision Video */}
      <Composition
        id="MissionVision"
        component={MissionVisionMain}
        durationInFrames={570}
        fps={30}
        width={1920}
        height={1080}
        schema={missionVisionSchema}
        defaultProps={{
          primaryColor: '#3b82f6',
          secondaryColor: '#8b5cf6',
          accentColor: '#10b981',
        }}
      />
      <Composition
        id="OperationalHeadroom"
        component={OperationalHeadroomMain}
        durationInFrames={1440}
        fps={30}
        width={1920}
        height={1080}
        schema={operationalHeadroomSchema}
        defaultProps={{
          primaryColor: '#e74c3c',
          textColor: '#ffffff',
        }}
      />
      {/* CPU Headroom Explainer */}
      <Composition
        id="CPUHeadroomExplainer"
        component={CPUHeadroomExplainer}
        durationInFrames={10800}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Thumbnail */}
      <Composition
        id="Thumbnail"
        component={ThumbnailMain}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Agentic Era: Managing 240+ n8n Workflows */}
      <Composition
        id="AgenticEra"
        component={AgenticEraMain}
        durationInFrames={18000} // 600 seconds * 30 fps = 18000 frames (10 minutes)
        fps={30}
        width={1920}
        height={1080}
        schema={agenticEraSchema}
        defaultProps={{
          titleColor: '#007bff',
        }}
      />
      {/* Agentic Workflow Video */}
      <Composition
        id="AgenticWorkflow"
        component={AgenticWorkflowMain}
        durationInFrames={12000}
        fps={30}
        width={1920}
        height={1080}
        schema={agenticWorkflowSchema}
        defaultProps={{
            primaryColor: '#ef4444',
            secondaryColor: '#3b82f6',
            accentColor: '#f59e0b',
        }}
      />
      
      {/* Ferrari Hook Animation */}
      <Composition
        id="FerrariHook"
        component={FerrariHook}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Workforce Reveal Animation */}
      <Composition
        id="WorkforceCounter"
        component={WorkforceCounter}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* n8n Mammoth Zoom Animation */}
      <Composition
        id="N8nMammoth"
        component={N8nMammothZoom}
        durationInFrames={240} // 8 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Skills Gap Animation */}
      <Composition
        id="SkillsGap"
        component={SkillsGap}
        durationInFrames={180} // 6 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Telegram Command Center */}
      <Composition
        id="TelegramCommandCenter"
        component={TelegramCommandCenter}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* PARA Method Animation */}
      <Composition
        id="ParaMethod"
        component={ParaMethod}
        durationInFrames={240} // 8 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Blacklist System Flow */}
      <Composition
        id="BlacklistSystem"
        component={BlacklistSystem}
        durationInFrames={180} // 6 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* MCP Protocol Visualization */}
      <Composition
        id="McpProtocol"
        component={McpProtocol}
        durationInFrames={150} // 5 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Revolution Wave Animation */}
      <Composition
        id="RevolutionWave"
        component={RevolutionWave}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* App Deletion Montage */}
      <Composition
        id="AppDeletion"
        component={AppDeletion}
        durationInFrames={120} // 4 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* GitHub Repo Tour */}
      <Composition
        id="GithubRepoTour"
        component={GithubRepoTour}
        durationInFrames={240} // 8 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Single Workflow Starting Point */}
      <Composition
        id="SingleWorkflow"
        component={SingleWorkflow}
        durationInFrames={150} // 5 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Call-to-Action End Card */}
      <Composition
        id="CtaEndCard"
        component={CtaEndCard}
        durationInFrames={300} // 10 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ===== Delivery Pilot Transformation ===== */}
      <Composition id="DP-GoldenMic" component={GoldenMicIntro} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="DP-PivotDecision" component={PivotDecision} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="DP-ZombieSnails" component={ZombieSnails} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="DP-StatuesVsMercury" component={StatuesVsMercury} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="DP-BreakingChains" component={BreakingChains} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="DP-CloneLab" component={CloneLab} durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="DP-FreeTierTools" component={FreeTierTools} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="DP-InternetKillSwitch" component={InternetKillSwitch} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="DP-LlmFeast" component={LlmFeastTable} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="DP-ClaudeCard" component={ClaudeCard} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="DP-ChatgptCard" component={ChatgptCard} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="DP-DeepseekCard" component={DeepseekCard} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="DP-GeminiCard" component={GeminiCard} durationInFrames={150} fps={30} width={1920} height={1080} />
      <Composition id="DP-N8nBespoke" component={N8nBespokeLogic} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="DP-SuccessMetrics" component={SuccessMetrics} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="DP-DroneCityFinale" component={DroneCityFinale} durationInFrames={210} fps={30} width={1920} height={1080} />
    </>
  );
};
