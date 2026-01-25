# Video Generator - Consolidated Remotion Project

This is the master video generator folder that consolidates all Remotion video compositions into a single, unified project. This eliminates duplication of configuration files, dependencies, and infrastructure across multiple projects.

## 🎯 Purpose

Instead of maintaining 9+ separate Remotion projects (each with their own `package.json`, `node_modules`, config files, etc.), all video compositions are now managed in one place.

## 📁 Project Structure

```
VideoGenerator/
├── src/
│   ├── compositions/          # All video compositions organized by theme
│   │   ├── ai-avalanche/      # AI Avalanche and Dialectic videos
│   │   ├── ai-transformation/ # AI Transformation journey
│   │   ├── asc-protocol/      # ASC Protocol visualization
│   │   ├── bayesian-logic/    # Bayesian Logic explanation
│   │   ├── map-of-consciousness/  # Map of Consciousness
│   │   ├── simulation-journey/    # Simulation Journey
│   │   └── surplus-value/     # Surplus Value calculation
│   ├── HelloWorld/            # Base Remotion template components
│   ├── Root.tsx               # Main entry point - registers all compositions
│   └── index.ts               # Export configuration
├── public/                    # Static assets (images, sounds) organized by composition
├── package.json               # Single dependency management
├── remotion.config.ts         # Shared Remotion configuration
├── tsconfig.json              # Shared TypeScript configuration
└── eslint.config.mjs          # Shared ESLint configuration
```

## 🚀 Getting Started

### Installation

```bash
cd VideoGenerator
npm install
```

### Development

Start the Remotion Studio to preview and work on any composition:

```bash
npm run dev
```

This will open the Remotion Studio where you can:
- See all available video compositions in the sidebar
- Preview any composition
- Adjust composition parameters in real-time
- Test animations and timing

### Building

Bundle a composition for production:

```bash
npm run build
```

### Rendering a Video

To render a specific composition to video:

```bash
npx remotion render <composition-id> output.mp4
```

Example:
```bash
npx remotion render AiAvalanche ai-avalanche.mp4
npx remotion render BayesianLogic bayesian.mp4
```

## 📹 Available Compositions

| Composition ID | Description | Duration | Dimensions |
|---------------|-------------|----------|------------|
| `HelloWorld` | Base template with title and logo | 5s | 1920x1080 |
| `OnlyLogo` | Just the Remotion logo | 5s | 1920x1080 |
| `AiAvalanche` | AI Avalanche visualization | 11s | 1920x1080 |
| `Dialectic` | Dialectic concept animation | 11s | 1920x1080 |
| `AiTransformation` | AI transformation journey | 10s | 1920x1080 |
| `AscProtocol` | ASC Protocol steps | 12s | 1080x1920 (vertical) |
| `BayesianLogic` | Bayesian reasoning explained | 10s | 1920x1080 |
| `MapOfConsciousness` | Consciousness levels map | 15s | 1080x1920 (vertical) |
| `SimulationJourney` | Simulation process journey | 20.6s | 1920x1080 |
| `SurplusValue` | Economic surplus value | 10s | 1920x1080 |

## 🛠️ Development Commands

```bash
npm run dev       # Start Remotion Studio
npm run build     # Bundle for production
npm run lint      # Run ESLint and TypeScript checks
npm run upgrade   # Upgrade Remotion to latest version
```

## 📦 Dependencies

- **@remotion/cli**: Remotion command-line interface
- **remotion**: Core Remotion library
- **react**: React framework
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for React

## 🎨 Adding a New Composition

1. Create a new folder in `src/compositions/<your-composition-name>/`
2. Add your component files (e.g., `Main.tsx`)
3. Export your component and schema from `Main.tsx`
4. Add the composition to `src/Root.tsx`:

```tsx
import { YourComponent, yourSchema } from "./compositions/your-composition-name/Main";

// In the RemotionRoot component:
<Composition
  id="YourCompositionName"
  component={YourComponent}
  durationInFrames={300}  // 10 seconds at 30fps
  fps={30}
  width={1920}
  height={1080}
  schema={yourSchema}
  defaultProps={{
    // your default props
  }}
/>
```

5. If you have static assets (images, sounds), place them in `public/<your-composition-name>-<asset-type>/`

## 🗑️ Technical Debt Eliminated

This consolidation eliminates:
- ✅ 8 duplicate `package.json` files
- ✅ 8 duplicate `node_modules` directories (~391 packages each)
- ✅ 8 duplicate `remotion.config.ts` files
- ✅ 8 duplicate `tsconfig.json` files
- ✅ 8 duplicate `eslint.config.mjs` files
- ✅ 8 duplicate `.gitignore` files
- ✅ 8 duplicate `.vscode` configurations
- ✅ Redundant HelloWorld template code across projects

## 📝 Notes

- All compositions use the same Remotion version and dependencies
- Shared configuration ensures consistent behavior
- Single `npm install` for all compositions
- Easier to maintain and upgrade
- Faster CI/CD builds (single project to build)

## 🔗 Resources

- [Remotion Documentation](https://www.remotion.dev/docs/)
- [Remotion CLI](https://www.remotion.dev/docs/cli)
- [Parametrized Rendering](https://www.remotion.dev/docs/parametrized-rendering)
