import React from 'react';
import Episode from '../components/Episode';

const Home = () => {
  return (
    <Episode
      title="EPISODIO 001"
      image="/covers/episodio_1.png"
      audioUrl="https://archive.org/details/ep001_202508"
      mixcloudUrl="https://mixcloud.com/tu-enlace"
      youtubeUrl="https://youtube.com/tu-enlace"
    />
  );
};

export default Home;
