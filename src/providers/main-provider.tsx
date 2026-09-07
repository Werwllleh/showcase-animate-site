import ReactLenis from "lenis/react";
import type {ReactNode} from "react";
import {Toaster} from "react-hot-toast";


const MainProvider = ({children}: { children: ReactNode }) => {
  return (
    <>
      <ReactLenis root options={{
        autoRaf: true,
      }}/>
      {children}
      <Toaster toastOptions={{
        style: {
          fontSize: '18px'
        }
      }} />
    </>
  );
};

export default MainProvider;
