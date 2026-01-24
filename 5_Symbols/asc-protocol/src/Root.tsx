import "./index.css";
import { Composition } from "remotion";
import { AscProtocolMain, ascSchema } from "./AscProtocol/Main";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AscProtocol"
        component={AscProtocolMain}
        durationInFrames={360} // 9s + 3s end card = 12s * 30fps = 360
        fps={30}
        width={1080}
        height={1920}
        schema={ascSchema}
        defaultProps={{
          primaryColor: "#38bdf8",
          secondaryColor: "#a855f7",
          accentColor: "#fbbf24",
        }}
      />
    </>
  );
};
