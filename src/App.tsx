import './App.css'
import ScrollProgress from "./components/scroll-progress.tsx";
import Hero from "./components/hero.tsx";
import Cards from "./components/cards.tsx";
import StartLoader from "./components/start-loader.tsx";
import {useState} from "react";
import Overlay from "./components/overlay.tsx";
import MainProvider from "./providers/main-provider.tsx";
import {useLenis} from "lenis/react";
import UpCards from "./components/up-cards.tsx";

function App() {

  const [loaderActive, setLoaderActive] = useState(true);

  useLenis((lenis) => {
    if (loaderActive) {
      lenis.stop();
    } else {
      lenis.start();
    }
  })

  return (
    <MainProvider>
      <StartLoader
        active={loaderActive}
        setLoaderActive={setLoaderActive}
        lineDuration={700}
        holdDuration={300}
      />
      <ScrollProgress />
      <Hero />
      <Cards />
      <Overlay />
      <UpCards />
    </MainProvider>
  )
}

export default App
