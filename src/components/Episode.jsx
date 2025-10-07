// src/components/Episode.jsx
import React, { useEffect } from "react";
import EpisodeControls from "./EpisodeControls";
import EpisodeGallery from "./EpisodeGallery";

const Episode = ({
  title,
  imageUrl,
  audioUrl,
  waveColor = "#0ff",
  progressColor = "#ff0",
  cursorColor = "#fff",
  mixcloudUrl,
  youtubeUrl,
  episodes = [],
  currentEpisode,
  setCurrentEpisode,
}) => {
  // Extrae el número del episodio desde el título y arma "Episode 001"
  const episodeNumber =
    (title || "").match(/(\d{1,})/)?.[1]?.padStart(3, "0") || "";
  const episodeLabel = episodeNumber ? `Episode ${episodeNumber}` : "Episode";

  // (Opcional) compatibilidad si tu EpisodeGallery emite eventos por window
  useEffect(() => {
    const onLoadFromGallery = (e) => {
      if (typeof setCurrentEpisode === "function") setCurrentEpisode(e.detail);
    };
    window.addEventListener("loadEpisodeFromGallery", onLoadFromGallery);
    return () => window.removeEventListener("loadEpisodeFromGallery", onLoadFromGallery);
  }, [setCurrentEpisode]);

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center px-4"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
    >
      {/* Galería lateral fija visible en md+ */}
      <div className="hidden md:flex-center absolute left-6 z-10">
        <EpisodeGallery
          episodes={episodes.slice().reverse?.() || episodes}
          currentEpisode={currentEpisode}
          setCurrentEpisode={setCurrentEpisode}
        />
      </div>

      {/* Contenido principal centrado */}
      <div className="z-20 text-center flex flex-col items-center justify-center">
        {/* Encabezado */}
        <div className="mb-4">
          <p className="text-shadow-lg text-sm font-lttechno uppercase tracking-widest">
            Presented by
          </p>
          <h2 className="text-shadow-lg text-xl font-overfield mt-1">
            Mati Guarnaccia
          </h2>
        </div>

        {/* Logo + etiqueta de episodio */}
        <div className="mb-8">
          <img
            src="/logos/plasma.png"
            alt="PLASMA logo"
            className="w-[500px] sm:w-[600px] md:w-[700px] lg:w-[800px] mx-auto"
          />
          <p className="text-shadow-lg text-xl mt-2 font-lttechno uppercase">
            {episodeLabel}
          </p>
        </div>

        {/* Controles de audio */}
        <EpisodeControls
          audioUrl={audioUrl ?? currentEpisode?.audioUrl}
          mixcloudUrl={mixcloudUrl ?? currentEpisode?.mixcloudUrl}
          youtubeUrl={youtubeUrl ?? currentEpisode?.youtubeUrl}
          waveColor={waveColor}
          progressColor={progressColor}
          cursorColor={cursorColor}
        />
      </div>
    </div>
  );
};

export default Episode;
