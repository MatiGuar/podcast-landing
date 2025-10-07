// src/App.jsx
import React, { useState } from "react";
import Episode from "./components/Episode";

const episodesList = [
  {
    id: 1,
    title: "PLASMA Episode 12",
    imageUrl: "/covers/episodio_1.png",
    mixcloudUrl: "https://www.mixcloud.com/Black_sessions/black-sessions-118-mati-guarnaccia/",
    youtubeUrl: "https://www.youtube.com/watch?v=XXXXXX",
  },
  {
    id: 2,
    title: "PLASMA Episode 13",
    imageUrl: "/covers/episodio_1.png",
    mixcloudUrl: "https://www.mixcloud.com/username/episode-13/",
    youtubeUrl: "https://www.youtube.com/watch?v=YYYYYY",
  },
  // más episodios...
];

function App() {
  const [currentEpisode, setCurrentEpisode] = useState(episodesList[0]);

  return (
    <div className="App">
      <Episode
        title={currentEpisode.title}
        imageUrl={currentEpisode.imageUrl}
        mixcloudUrl={currentEpisode.mixcloudUrl}
        youtubeUrl={currentEpisode.youtubeUrl}
        waveColor="#0ff"
        progressColor="#ff0"
        cursorColor="#fff"
        episodes={episodesList}
        currentEpisode={currentEpisode}
        setCurrentEpisode={setCurrentEpisode}
      />
    </div>
  );
}

export default App;
