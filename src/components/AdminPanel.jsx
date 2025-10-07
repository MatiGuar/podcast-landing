import React, { useState, useEffect } from "react";

const AdminPanel = ({ defaultEpisode, onEpisodeChange, onReset }) => {
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [waveColor, setWaveColor] = useState("#8E44AD");
  const [progressColor, setProgressColor] = useState("#00FFFF");
  const [cursorColor, setCursorColor] = useState("#39FF14");
  const [mixcloudUrl, setMixcloudUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  useEffect(() => {
    const savedEpisodes = JSON.parse(localStorage.getItem("plasma_episodes")) || [];
    if (savedEpisodes.length === 0) {
      localStorage.setItem("plasma_episodes", JSON.stringify([defaultEpisode]));
      localStorage.setItem("plasma_active_episode", JSON.stringify(defaultEpisode));
    }
  }, [defaultEpisode]);

  // Función para convertir archivo a base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const audioUrl = audioFile ? await toBase64(audioFile) : "";
    const imageUrl = imageFile ? await toBase64(imageFile) : "";

    const newEpisode = {
      title,
      audioUrl,
      imageUrl,
      waveColor,
      progressColor,
      cursorColor,
      mixcloudUrl,
      youtubeUrl,
    };

    const episodes = JSON.parse(localStorage.getItem("plasma_episodes")) || [];
    episodes.unshift(newEpisode);
    localStorage.setItem("plasma_episodes", JSON.stringify(episodes));
    localStorage.setItem("plasma_active_episode", JSON.stringify(newEpisode));

    if (onEpisodeChange) onEpisodeChange(newEpisode);
    window.dispatchEvent(new CustomEvent("episodeUpdated"));

    // Resetear inputs
    setTitle("");
    setAudioFile(null);
    setImageFile(null);
    setWaveColor("#8E44AD");
    setProgressColor("#00FFFF");
    setCursorColor("#39FF14");
    setMixcloudUrl("");
    setYoutubeUrl("");

    alert("Nuevo episodio generado ✅");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-black text-white font-sora">
      <h2 className="text-2xl font-bold mb-6 text-center">Panel de Administración de Plasma</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1">Título del episodio</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Archivo de audio (MP3 o WAV)</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            className="w-full p-2 rounded bg-white text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Imagen de fondo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-2 rounded bg-white text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Color de onda (waveColor)</label>
          <input
            type="color"
            value={waveColor}
            onChange={(e) => setWaveColor(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Color de progreso (progressColor)</label>
          <input
            type="color"
            value={progressColor}
            onChange={(e) => setProgressColor(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Color del cursor (cursorColor)</label>
          <input
            type="color"
            value={cursorColor}
            onChange={(e) => setCursorColor(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Enlace a Mixcloud</label>
          <input
            type="url"
            value={mixcloudUrl}
            onChange={(e) => setMixcloudUrl(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
        </div>

        <div>
          <label className="block mb-1">Enlace a YouTube</label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded"
          >
            Generar episodio
          </button>

          <button
            type="button"
            onClick={onReset}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Restaurar episodio por defecto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;
