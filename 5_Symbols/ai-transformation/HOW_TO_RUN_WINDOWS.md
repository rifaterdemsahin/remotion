# How to Run the AI Transformation Video (Windows)

This guide explains how to run the `ai-transformation` project on Windows.

## Prerequisites

- **Node.js**: Install from [nodejs.org](https://nodejs.org/) (LTS version).
- **PowerShell** or **Command Prompt** (cmd.exe).

## Steps

1. **Open PowerShell** or **Command Prompt**.

2. **Navigate to the project directory**:
   Replace `path\to\your\projects` with the actual path.

   ```powershell
   cd path\to\your\projects\remotion\5_Symbols\ai-transformation
   ```

   *Example:*

   ```powershell
   cd C:\Users\YourName\projects\remotion\5_Symbols\ai-transformation
   ```

3. **Install Dependencies** (only needed once):

   ```powershell
   npm install
   ```

4. **Start the Remotion Studio**:

   ```powershell
   npm run dev
   ```

   *Note: You may need to allow Node.js through the Windows Firewall if prompted.*

5. **View the Video**:
   Open your web browser (Chrome, Edge, etc.) and go to:
   **[http://localhost:3000](http://localhost:3000)**

   You should see the "AI Transformation Journey" video with the new layout, emojis, and large images.

6. **Render to MP4**:
   To create a video file:

   ```powershell
   npx remotion render
   ```
