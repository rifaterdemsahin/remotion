# How to Run the AI Transformation Video (macOS)

This guide explains how to run the `ai-transformation` project on macOS.

## Prerequisites

- **Node.js**: Install from [nodejs.org](https://nodejs.org/) (v16+ recommended).
- **Terminal**: Use the default Terminal app or iTerm2.

## Steps

1. **Open Terminal**.

2. **Navigate to the project directory**:
   Assuming the project is located in your `projects` folder:

   ```bash
   cd ~/projects/remotion/5_Symbols/ai-transformation
   ```

3. **Install Dependencies** (only needed once):

   ```bash
   npm install
   ```

4. **Start the Remotion Studio**:

   ```bash
   npm run dev
   ```

5. **View the Video**:
   Open your web browser and go to:
   **[http://localhost:3000](http://localhost:3000)**

   You should see the "AI Transformation Journey" video with the new layout, emojis, and large images.

6. **Render to MP4**:
   To create a video file:

   ```bash
   npx remotion render
   ```
