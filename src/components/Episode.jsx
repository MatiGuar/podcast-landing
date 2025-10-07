// src/components/Episode.jsx
import React from "react";
import EpisodeControls from "./EpisodeControls";
import EpisodeGallery from "./EpisodeGallery";

const Episode = ({
    title,
    imageUrl,
    audioUrl,
    waveColor,
    progressColor,
    cursorColor,
    mixcloudUrl,
    youtubeUrl,
    episodes = [],
    currentEpisode,
    setCurrentEpisode,
}) => {
    const episodeParts = title.split(" ");
    const episodeNumber = episodeParts.pop();
    const episodeText = episodeParts.join(" ");

    return (
        <div
            className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center px-4"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            {/* Galería lateral fija visible en md+ */}
            <div className="hidden md:flex-center absolute left-6 z-10">
                <EpisodeGallery
                    episodes={episodes.slice().reverse()}
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

                {/* Logo + Título */}
                <div className="mb-8">
                    <img
                        src="/logos/plasma.png"
                        alt="PLASMA logo"
                        className="w-[500px] sm:w-[600px] md:w-[700px] lg:w-[800px] mx-auto"
                    />
                    <p className="text-shadow-lg text-xl mt-2 font-lttechno">
                        <span className="font-normal">{episodeText} </span>
                        <span className="font-bold">{episodeNumber}</span>
                    </p>
                </div>

                {/* Controles de audio */}
                <EpisodeControls
                    mixcloudUrl="https://www.mixcloud.com/username/episode-12/"
                    waveColor="#0ff"
                    progressColor="#ff0"
                    cursorColor="#fff"
                    youtubeUrl="https://youtube.com/..."
                />
            </div>
        </div>
    );
};

export default Episode;
