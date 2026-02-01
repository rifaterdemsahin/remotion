# Thumbnail Generation

This folder contains the assets and logic for generating the YouTube thumbnail.

## Workflow

1. **Background**: A futuristic background image with the central character and icons was generated using Gemini.
    - Source: `c:\projects\remotion\5_Symbols\VideoGenerator\public\thumbnail\background.png`
2. **Composition**: The text overlay and layout were created using Remotion.
    - Location: `c:\projects\remotion\5_Symbols\VideoGenerator\src\compositions\thumbnail\ThumbnailMain.tsx`
    - The composition ID is `Thumbnail`.

## How to Render

To render the thumbnail as an image (PNG):

1. Navigate to the video generator project:

    ```bash
    cd c:\projects\remotion\5_Symbols\VideoGenerator
    ```

2. Run the Remotion render command:

    ```bash
    npx remotion render Thumbnail --still --output c:\projects\remotion\5_Symbols\Thumbnail\final_thumbnail.png
    ```

## Design Specs

- **Title**: FUTURE-PROOF YOUR CAREER
- **Subtitle**: Mastering the AI Revolution
- **Style**: Futuristic, Cyberpunk, Professional
