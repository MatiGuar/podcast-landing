import React, { useEffect, useState } from "react";
import EpisodeCard from "./EpisodeCard";

const EpisodeGallery = () => {
  const [episodes, setEpisodes] = useState([]);

  const loadEpisodes = () => {
    const saved = JSON.parse(localStorage.getItem("plasma_episodes")) || [];
    setEpisodes(saved);
  };

  useEffect(() => {
    loadEpisodes();
    window.addEventListener("episodeUpdated", loadEpisodes);
    return () => window.removeEventListener("episodeUpdated", loadEpisodes);
  }, []);

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] pr-2">
      {episodes.map((ep, index) => (
        <EpisodeCard
          key={index}
          title={ep.title}
          image={ep.imageUrl}
          onClick={() => {
            const event = new CustomEvent("loadEpisodeFromGallery", { detail: ep });
            window.dispatchEvent(event);
          }}
          compact={true}
        />
      ))}
    </div>
  );
};

export default EpisodeGallery;
