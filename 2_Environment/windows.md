# Windows Environment Prerequisites

To successfully run this Remotion project and achieve the objectives in `1_Real_Unknown`, your Windows environment must meet the following prerequisites.

## System Requirements

- **OS**: Windows 10/11
- **RAM**: Minimum 8GB (16GB+ Recommended for rendering)
- **Disk Space**: ~1GB for project files + Space for rendered videos

## Required Software

### 1. Node.js (LTS Version)

Required to run Remotion and manage dependencies.

- **Current Version**: v25.4.0 (Detected)
- **Recommended**: Latest LTS (v20.x or higher)
- **Download**: [nodejs.org](https://nodejs.org/)

### 2. NPM (Node Package Manager)

Installed automatically with Node.js.

- **Current Version**: 11.7.0 (Detected)
- **Usage**: `npm install`, `npm run dev`, `npm run build`

### 3. Git

Required for version control and syncing with the repository.

- **Current Version**: 2.52.0.windows.1 (Detected)
- **Download**: [git-scm.com](https://git-scm.com/)

### 4. FFmpeg (Optional but Recommended)

Remotion includes a binary, but a system-wide install helps with advanced encoding.

- **Download**: [ffmpeg.org](https://ffmpeg.org/) (or install via `winget install ffmpeg`)

## Setup Instructions

1. **Clone the Repository**:

    ```powershell
    git clone <repository-url>
    cd c:\projects\remotion
    ```

2. **Install Dependencies**:
    Navigate to a specific project (e.g., `5_Symbols/map-of-consciousness`) and run:

    ```powershell
    cd 5_Symbols/map-of-consciousness
    npm install
    ```

3. **Run Development Server**:

    ```powershell
    npm run dev
    ```

## Troubleshooting

- **Execution Policy Error**: If you see scripts features disabled, run:

    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```

- **Port Conflicts**: If default port 3000 is busy, Remotion will typically choose the next available port.
