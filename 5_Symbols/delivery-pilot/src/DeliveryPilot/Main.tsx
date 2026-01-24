import React from "react";
import { AbsoluteFill } from "remotion";
import { VSCodeLayout } from "./VSCodeLayout";
import { Overlay } from "./Overlay";

export const Main: React.FC = () => {
  return (
    <AbsoluteFill className="bg-neutral-900 text-white font-sans">
      <VSCodeLayout />
      <Overlay />
    </AbsoluteFill>
  );
};
