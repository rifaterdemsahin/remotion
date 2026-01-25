# NPM Prerequisites & Commands

This project relies on **NPM** to manage packages and execute Remotion scripts.

## Essential Commands

| Command | Description |
| :--- | :--- |
| `npm install` | Installs all dependencies listed in `package.json`. |
| `npm run dev` | Starts the Remotion Studio at `http://localhost:3000`. |
| `npm run build` | Renders the video defined in the config. |
| `npm run upgrade` | Upgrades Remotion packages to the latest version. |

## 1_Real_Unknown Objectives Support

To reach the objectives in `1_Real_Unknown` (Video Production Support), you will frequently use:

### 1. New Project Creation

Create new animations in `5_Symbols`:

```bash
npx create-remotion
# Follow prompts to select folder location inside 5_Symbols
```

### 2. Rendering

Render high-quality MP4s for the `3_Simulation` folder:

```bash
npx remotion render <CompositionID> ../../../3_Simulation/<OutputName>.mp4
```

### 3. Tailwind CSS

This project uses Tailwind CSS for styling. Ensure `postcss` and `tailwindcss` are installed if starting fresh:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
