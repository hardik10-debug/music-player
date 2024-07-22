import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Player from './Player';
import './SongPlayerPage.css';

const SongPlayerPage = () => {
  const [song, setSong] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('spotifyToken')}`,
          },
        });

        console.log('Song Data:', response.data);
        setSong(response.data);
      } catch (error) {
        console.error('Error fetching song:', error);
      }
    };

    if (id) {
      fetchSong();
    }
    
    // Set body class when component mounts
    document.body.classList.add('specific-page4');

    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('specific-page4');
    };
  }, [id]);

  const handleBackClick = () => {
    navigate(-1); // Navigate back one step in the history
  };

  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div className="song-player-page">
      <button onClick={handleBackClick} className="butt">
        Back
      </button>
      <div className="vinyl-container1">
        <div  className="vinyl1" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/020/410/347/original/retro-style-illustration-of-a-vinyl-disc-with-text-let-s-rock-retro-party-print-greeting-card-party-invitation-vector.jpg')" }}></div>
      </div>
      <div className="vinyl-container2">
        <div  className="vinyl2" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/020/410/347/original/retro-style-illustration-of-a-vinyl-disc-with-text-let-s-rock-retro-party-print-greeting-card-party-invitation-vector.jpg')" }}></div>
      </div>
      
     
      <div className="song-image">
        <img src={song.album.images[0].url} alt="Song Cover" />
      </div>
      <div className="musical-notes">
        <div className="note">♪</div>
        <div className="note">♫</div>
        <div className="note">♬</div>
        <div className="note">♩</div>
        <div className="note">♪</div>
      </div>
      <div className="song-info">
        <h2>{song.name}</h2>
        <p>By: {song.artists.map(artist => artist.name).join(', ')}</p>
      </div>
      <Player trackUrl={song.preview_url} />
    </div>
  );
};

export default SongPlayerPage;
