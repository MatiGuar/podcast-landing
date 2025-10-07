// src/App.jsx
import React, { useState, useEffect } from "react";
import Episode from "./components/Episode";

const episodesList = [
  {
    id: 1,
    title: "Episode 001",
    imageUrl: "/covers/episodio_1.png",
    audioUrl: "/audio/ep001.mp3",
    mixcloudUrl: "https://www.mixcloud.com/",
    youtubeUrl: "https://www.youtube.com/",
  },
];

function App() {
  const [currentEpisode, setCurrentEpisode] = useState(episodesList[0]);


  useEffect(() => {
    const onLoadFromGallery = (e) => setCurrentEpisode(e.detail);
    window.addEventListener("loadEpisodeFromGallery", onLoadFromGallery);
    return () => window.removeEventListener("loadEpisodeFromGallery", onLoadFromGallery);
  }, []);

  return (
    <div className="App">
      <Episode
        title={currentEpisode.title}
        imageUrl={currentEpisode.imageUrl}
        audioUrl={currentEpisode.audioUrl}
        mixcloudUrl={currentEpisode.mixcloudUrl}
        youtubeUrl={currentEpisode.youtubeUrl}
        waveColor="#00E5FF"      // color de la parte no reproducida
        progressColor="#FFFFFF"  // color de la parte reproducida
        cursorColor="#FFFFFF"    // línea del cursor + color del slider (ver abajo)
        episodes={episodesList}
        currentEpisode={currentEpisode}
        setCurrentEpisode={setCurrentEpisode}
      />
    </div>
  );
}

export default App;
