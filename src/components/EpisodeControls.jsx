// src/components/EpisodeControls.jsx
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import useMixcloudStream from "../hooks/useMixcloudStream";

const EpisodeControls = ({
  mixcloudUrl,
  waveColor,
  progressColor = "#00FFFF",
  cursorColor,
  youtubeUrl,
}) => {
  const { streamUrl, loading } = useMixcloudStream(mixcloudUrl);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeFocused, setVolumeFocused] = useState(false);

  // Inicializar WaveSurfer cuando streamUrl esté listo
  useEffect(() => {
    if (!streamUrl) return;

    if (wavesurfer.current) wavesurfer.current.destroy();

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor,
      progressColor,
      cursorColor,
      barWidth: 2,
      barGap: 2,
      height: 80,
      responsive: true,
      normalize: true,
      backend: "MediaElement",
    });

    wavesurfer.current.load(streamUrl);
    wavesurfer.current.setVolume(volume);

    return () => wavesurfer.current && wavesurfer.current.destroy();
  }, [streamUrl, waveColor, progressColor, cursorColor]);

  const togglePlay = () => {
    if (!wavesurfer.current) return;
    wavesurfer.current.playPause();
    setIsPlaying(wavesurfer.current.isPlaying());
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer.current) wavesurfer.current.setVolume(newVolume);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      {loading && <p className="text-white mb-4">Cargando audio de Mixcloud...</p>}

      <div ref={waveformRef} className="w-full mb-6" />

      <div className="flex justify-between items-center w-full px-4 mb-8">
        <button
          onClick={togglePlay}
          className={`text-white transition duration-300 ${
            isPlaying ? "animate-pulse text-white" : ""
          }`}
          onMouseEnter={(e) => (e.currentTarget.style.color = progressColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
        >
          {isPlaying ? (
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z"
              />
            </svg>
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          onFocus={() => setVolumeFocused(true)}
          onBlur={() => setVolumeFocused(false)}
          className="custom-slider"
          style={{
            appearance: "none",
            width: "160px",
            height: "8px",
            background: `linear-gradient(to right, ${
              volumeFocused ? progressColor : "#ffffff"
            } ${volume * 100}%, #333 ${volume * 100}%)`,
            borderRadius: "9999px",
            outline: "none",
            transition: "background 0.3s ease",
          }}
        />
      </div>

      <div className="flex gap-6 mt-14">
        {mixcloudUrl && (
          <a href={mixcloudUrl} target="_blank" rel="noopener noreferrer">
            <img
              src="logos/mixcloudwhite.svg"
              alt="Mixcloud"
              className="w-24 h-24 hover:scale-110 transition shadow-sm"
            />
          </a>
        )}
        {youtubeUrl && (
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            <img
              src="logos/youtube.svg"
              alt="YouTube"
              className="w-24 h-24 hover:scale-110 transition shadow-sm"
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default EpisodeControls;
