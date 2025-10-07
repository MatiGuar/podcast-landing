// src/components/EpisodeControls.jsx
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const fmt = (sec = 0) => {
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  const m = Math.floor((sec / 60) % 60).toString().padStart(2, "0");
  const h = Math.floor(sec / 3600);
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
};

export default function EpisodeControls({
  audioUrl,                         // p.ej. "/audio/ep001.mp3"
  mixcloudUrl = "",                 // opcional (solo enlace)
  youtubeUrl = "",                  // opcional (solo enlace)
  waveColor = "#00E5FF",
  progressColor = "#00E5FF",
  cursorColor = "#FFFFFF",
  mixcloudLogo = "/logos/mixcloudwhite.svg",
  youtubeLogo  = "/logos/youtube.svg",
}) {
  const waveformRef = useRef(null);
  const wsRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(1);

  // Crea la instancia SOLO cuando cambia el audio
  useEffect(() => {
    if (!audioUrl || !waveformRef.current) return;

    try { wsRef.current?.destroy(); } catch {}
    wsRef.current = null;
    waveformRef.current.innerHTML = "";

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      url: audioUrl,
      backend: "WebAudio",
      height: 96,
      waveColor,
      progressColor,
      cursorColor,
      cursorWidth: 1,
      barWidth: 2,
      barGap: 2,
      normalize: true,
      responsive: true,
      hideScrollbar: true,
      splitChannels: false,
      removeMediaElementOnDestroy: true,
    });

    ws.on("ready", () => {
      setIsReady(true);
      setDuration(ws.getDuration());
      setCurrent(0);
      setIsPlaying(false);
      ws.setVolume(volume);
    });
    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("timeupdate", (t) => setCurrent(t));
    ws.on("finish", () => setIsPlaying(false));

    wsRef.current = ws;

    return () => {
      try { ws.destroy(); } catch {}
      if (waveformRef.current) waveformRef.current.innerHTML = "";
    };
  }, [audioUrl]);

  // Aplica cambios de color al vuelo (sin recrear)
  useEffect(() => {
    wsRef.current?.setOptions({ waveColor, progressColor, cursorColor });
  }, [waveColor, progressColor, cursorColor]);

  // Volumen
  useEffect(() => { wsRef.current?.setVolume(volume); }, [volume]);

  const togglePlay = () => wsRef.current?.playPause();

  // Logos chicos (alto fijo, ancho auto)
  const logoClassMxc = "h-[10px] md:h-[20px] w-90 object-contain";
  const logoClassYtb = "h-[10px] md:h-[20px] w-100 object-contain";

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      {/* Wave transparente */}
      <div
        ref={waveformRef}
        className="w-full mb-3 rounded-xl overflow-hidden"
        style={{ background: "transparent" }}
      />

      {/* Controles */}
      <div className="flex flex-wrap gap-3 items-center w-full px-1 md:px-4 mb-4">
        <button
          onClick={togglePlay}
          disabled={!isReady}
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
          className="p-3 rounded-full bg-white/50 text-black hover:bg-white transition disabled:opacity-40"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        <div className="text-sm opacity-80 ml-1">{fmt(current)} / {fmt(duration)}</div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-lttechno  opacity-70">Vol</span>
          <input
            type="range" min="0" max="1" step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-40"
            style={{
              accentColor: progressColor, // color del thumb + tramo lleno
            }}
          />
        </div>
      </div>

      {/* Logos pequeños */}
      <div className="flex gap-4 md:gap-6 mt-2 items-center">
        {mixcloudUrl ? (
          <a href={mixcloudUrl} target="_blank" rel="noopener noreferrer" title="Escuchar en Mixcloud">
            <img src={mixcloudLogo} alt="Mixcloud" className={logoClassMxc} />
          </a>
        ) : (
          <img src={mixcloudLogo} alt="Mixcloud (no disponible)" className={`${logoClass} opacity-50 cursor-not-allowed`} />
        )}
        {youtubeUrl ? (
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" title="Ver en YouTube">
            <img src={youtubeLogo} alt="YouTube" className={logoClassYtb} />
          </a>
        ) : (
          <img src={youtubeLogo} alt="YouTube (no disponible)" className={`${logoClass} opacity-50 cursor-not-allowed`} />
        )}
      </div>
    </div>
  );
}
