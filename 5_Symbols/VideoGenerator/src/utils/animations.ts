import { interpolate, spring } from "remotion";

export const fadeIn = (frame: number, delay: number = 0, duration: number = 30) => {
  return interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
};

export const fadeOut = (frame: number, start: number, duration: number = 30) => {
  return interpolate(
    frame,
    [start, start + duration],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
};

export const slideInFromBottom = (frame: number, delay: number = 0) => {
  return spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 100, stiffness: 200, mass: 0.5 }
  });
};

export const slideInFromLeft = (frame: number, delay: number = 0) => {
  return spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 100, stiffness: 200, mass: 0.5 }
  });
};

export const slideInFromRight = (frame: number, delay: number = 0) => {
  return spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 100, stiffness: 200, mass: 0.5 }
  });
};

export const zoomEffect = (frame: number, from: number, to: number, duration: number = 90) => {
  return interpolate(frame, [0, duration], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
};

export const scaleIn = (frame: number, delay: number = 0) => {
  return spring({
    frame: frame - delay,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 200, mass: 0.5 }
  });
};

export const rotateIn = (frame: number, delay: number = 0) => {
  return spring({
    frame: frame - delay,
    fps: 30,
    from: -180,
    to: 0,
    config: { damping: 15, stiffness: 100 }
  });
};

export const countUp = (frame: number, from: number, to: number, delay: number = 0, duration: number = 60) => {
  return Math.floor(
    interpolate(
      frame,
      [delay, delay + duration],
      [from, to],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    )
  );
};
