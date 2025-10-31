import { useEffect } from "react";
import { MarbleDropGame } from "./components/MarbleDropGame";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

function App() {
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    const hitSnd = new Audio("/sounds/hit.mp3");
    setHitSound(hitSnd);

    const successSnd = new Audio("/sounds/success.mp3");
    setSuccessSound(successSnd);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <MarbleDropGame />
    </div>
  );
}

export default App;
