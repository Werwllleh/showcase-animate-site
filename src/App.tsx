import './App.css'
import ScrollProgress from "./components/scroll-progress.tsx";
import Hero from "./components/hero.tsx";
import Cards from "./components/cards.tsx";
import StartLoader from "./components/start-loader.tsx";
import {useState} from "react";

function App() {

  const [loaderActive, setLoaderActive] = useState(true);

  return (
    <>
      <StartLoader active={loaderActive} setLoaderActive={setLoaderActive} timeout={2000} />
      {!loaderActive && (
        <>
          <ScrollProgress />
          <Hero />
          <Cards />
        </>
      )}
    </>
  )
}

export default App