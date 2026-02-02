# Animation Timeline Breakdown

## Scene 1: The Hook (Kinetic Typography)
**Duration**: 00:00 - 00:40 (1200 frames)

- **Frame 0 - 30**: 
  - `Title ("THE AGENTIC ERROR")`: Opacity 0 -> 1. Scale 0.9 -> 1.0. Ease: `spring`.
- **Frame 40**:
  - `Subtitle ("How I manage...")`: Slide Up + Fade In. `spring(damping: 10)`.
- **Frame 100 - 130**:
  - `Title Group`: Opacity 1 -> 0. Scale 1.0 -> 1.1. Fade out for transition.
- **Frame 150 - 180**:
  - `Metaphor Text ("Ferrari")`: Fade In. Color `#ef4444` (Red).
  - `Metaphor Text ("Grocery Store")`: Slide in from bottom.
- **Frame 200**:
  - `Icon (Ferrari)`: Slide in from Left to Center. Fast ease.
  - `Icon (Store)`: Static on Right.
- **Frame 240**:
  - `Icon (Ferrari)`: Moves to `Icon (Store)`. 
  - `Text Overlay`: "Wrong Use Case" stamps on top. Rotation -5deg. Scale 1.5 -> 1.0 (Impact).

## Scene 2: The Solution (Dashboard Counter)
**Duration**: 00:40 - 01:50

- **Frame 0 (Relative to Scene)**:
  - `Dashboard BG`: Fade In. Opacity 0 -> 1.
- **Frame 30 - 150**:
  - `Counter ("Workflows")`: Increment from 0 to 240. Linear interpolation or `easeOutExpo`.
  - `Counter ("Executions")`: Increment from 0 to 6900. Fast scroll.
- **Frame 60**:
  - `Network Graph`: Nodes expand outwards from center. `spring(stiffness: 100)`.
- **Frame 200**:
  - `Timeline Scrubber`: Moves across screen automatically to simulate playback.
- **Frame 300**:
  - `Lower Third ("Auto-GPT Hub")`: Slide in from Left. Background rectangle width 0 -> 100%. Text Opacity 0 -> 1.

## General Transition Rules
- **Scene Changes**: 
  - Cross-dissolve (30 frames) OR
  - Wipe Left (20 frames) for narrative progression.
- **Text Entry**:
  - Staggered entrance by word or line. `delay = index * 5`.
