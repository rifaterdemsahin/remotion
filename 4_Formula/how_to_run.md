# How to Run the Project

This guide explains how to run the Remotion video project located in `5_Symbols/hello-world`.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher recommended, tested with v20.19.4)
- **npm** (comes with Node.js)

## Quick Start

1. **Navigate to the project directory**:
   Open your terminal and change directory to the project folder:

   ```bash
   cd 5_Symbols/hello-world
   ```

2. **Install Dependencies** (if this is your first time):

   ```bash
   npm install
   ```

3. **Start the Development Studio**:
   This opens the Remotion Studio in your browser where you can preview and edit your video.

   ```bash
   npm run dev
   ```

4. **Render the Video**:
   To render the video to an MP4 file:

   ```bash
   npx remotion render
   ```

## Common Scripts

The `package.json` includes the following scripts:

- `npm run dev`: Starts the Remotion Studio.
- `npm run build`: Bundles the video (pre-rendering step).
- `npm run upgrade`: Upgrades Remotion packages to the latest version.
- `npm run lint`: Runs ESLint and TypeScript checks.

## Troubleshooting

- If you encounter issues, check the `6_Semblance` folder for error logs and solutions.
- Ensure you are in the correct directory (`5_Symbols/hello-world`) before running commands.
