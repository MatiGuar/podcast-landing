import React from "react";
import { Trash2 } from "lucide-react";

const EpisodeCard = ({ title, image, onClick, onDelete, isActive }) => {
  return (
    <div
      className={`relative rounded overflow-hidden border-2 transition cursor-pointer w-[200px] ${
        isActive ? "border-cyan-500" : "border-transparent hover:border-cyan-700"
      }`}
      onClick={onClick}
    >
      {/* Imagen de fondo */}
      <div className="relative w-full h-50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Logo centrado */}
        <img
          src="/logos/plasma.png"
          alt="Plasma logo"
          className="absolute top-1/2 left-1/2 w-24 sm:w-28 -translate-x-1/2 -translate-y-1/2 drop-shadow-md pointer-events-none"
        />

        {/* Botón eliminar */}
        {onDelete && (
          <div
            className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 size={18} />
          </div>
        )}
      </div>

      {/* Título */}
      <div className="bg-zinc-900 text-white text-center py-2 font-lttechno uppercase text-xs tracking-widest">
        {title}
      </div>
    </div>
  );
};

export default EpisodeCard;
