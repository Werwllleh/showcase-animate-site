import ReactLenis from "lenis/react";
import type {ReactNode} from "react";


const MainProvider = ({children}: { children: ReactNode }) => {
  return (
    <>
      <ReactLenis root options={{
        autoRaf: true,
      }}/>
      {children}
    </>
  );
};

export default MainProvider;
