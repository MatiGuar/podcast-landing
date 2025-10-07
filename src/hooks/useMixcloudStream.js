// src/hooks/useMixcloudStream.js
import { useState, useEffect } from "react";

export default function useMixcloudStream(mixcloudUrl) {
  const [streamUrl, setStreamUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mixcloudUrl) return;

    const fetchStream = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${mixcloudUrl}.json`);
        const data = await response.json();
        if (data.stream_url) {
          setStreamUrl(data.stream_url);
        } else {
          console.error("Mixcloud no proporcionó stream_url", data);
        }
      } catch (error) {
        console.error("Error al obtener stream de Mixcloud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStream();
  }, [mixcloudUrl]);

  return { streamUrl, loading };
}
