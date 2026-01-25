# 3_Simulation - UI

User interfaces for and technologies used, including HTML5, CSS3, JavaScript, and best practices for UI development.

## Video Gallery

The `index.html` file serves as a video gallery for all rendered Remotion videos.

### Adding New Videos

⚠️ **Manual Step Required**: When new videos are rendered to this folder, you must manually update the `videos` array in `index.html`.

**Steps to add a new video:**

1. Render your video from the project folder:

   ```bash
   cd 5_Symbols/<project-name>
   npx remotion render <CompositionId> ../../../3_Simulation/<VideoName>.mp4
   ```

2. Open `3_Simulation/index.html` and add an entry to the `videos` array:

   ```javascript
   {
       id: 'your-video-id',
       title: 'Your Video Title',
       description: 'Description of your video.',
       basePath: 'VideoName',  // Matches the .mp4 filename without extension
       versions: [1]  // Add more version numbers as you render updates
   }
   ```

3. For version updates, render with a number suffix (e.g., `VideoName2.mp4`) and update the `versions` array.

### Current Videos

| Video | Versions | Source Project |
|-------|----------|----------------|
| AiAvalanche | 1, 2 | `5_Symbols/ai-avalanche` |
| AiTransformation | 1, 2, 3, 4 | `5_Symbols/ai-transformation` |
| BayesianLogic | 1 | `5_Symbols/bayesian-logic` |
| SimulationJourney | 1 | `5_Symbols/simulation-journey` |
| SurplusValue | 1, 2, 3, 4 | `5_Symbols/surplus-value` |

1. prompt to update the index.html file

```
Scan the 3_Simulation folder and update the index.html file with newly added videos. Git commit and push
```
