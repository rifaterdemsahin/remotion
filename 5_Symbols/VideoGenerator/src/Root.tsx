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
import { OperationalHeadroomMain, operationalHeadroomSchema } from "./compositions/operational-headroom/Main";
import { CPUHeadroomExplainer } from "./compositions/cpu-headroom/CPUHeadroomExplainer";
import { ThumbnailMain } from "./compositions/thumbnail/ThumbnailMain";

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
    </>
  );
};
