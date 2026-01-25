import "./index.css";
import { Composition } from "remotion";
import { MapOfConsciousness } from "./MapOfConsciousness";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MapOfConsciousness"
        component={MapOfConsciousness}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
