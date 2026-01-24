# Antigravity - Workflow Reminders

This file contains important workflow steps that need to be done manually.

---

## 📁 Project Structure

| Folder | Purpose |
|--------|---------|
| `1_Real_Unknown` | Objectives (OKRs) - Defines project objectives and key results, starts with the unknown problem |
| `2_Environment` | Roadmap and Use Cases - Contains the project roadmap with development phases and detailed use cases |
| `3_Simulation` | UI - User interfaces and technologies used, including HTML5, CSS3, JavaScript |
| `4_Formula` | Guides and Best Practices - Provides guidelines built by GPT |
| `5_Symbols` | Core Source Code - Contains the main Remotion application files |
| `6_Semblance` | Error Logs and Solutions - Documents common issues, causes, and solutions |
| `7_Testing_known` | Validation - Contains test plans and acceptance criteria to reach objectives |

---

## 📹 New Video Rendered?

When you render a new video to `3_Simulation/`, you must **manually update** the video gallery:

### Steps:

1. **Open** `3_Simulation/index.html`

2. **Add** your video to the `videos` array (around line 195):
   ```javascript
   {
       id: 'your-video-id',           // Unique kebab-case identifier
       title: 'Your Video Title',      // Display name
       description: 'Description...',  // Brief description
       basePath: 'VideoFileName',       // Match the .mp4 filename (without extension)
       versions: [1]                    // Array of available versions
   }
   ```

3. **For new versions** of existing videos:
   - Render with suffix: `VideoName2.mp4`, `VideoName3.mp4`, etc.
   - Update the `versions` array: `versions: [1, 2, 3]`

### Example Render Commands:

```bash
# First version
cd 5_Symbols/ai-avalanche
npx remotion render AiAvalanche ../../3_Simulation/AiAvalanche.mp4

# Second version  
npx remotion render AiAvalanche ../../3_Simulation/AiAvalanche2.mp4
```

---

## Why Manual?

The video gallery uses a static HTML file without a build system. Automatic scanning would require:
- A Node.js script to scan the folder
- Running the script before serving
- Or converting to a dynamic backend

For simplicity, manual updates are preferred for this project.

---

**Last Updated:** 2026-01-24
