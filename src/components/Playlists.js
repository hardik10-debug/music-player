// src/components/Playlists.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userPlaylistsEndpoint } from '../auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './Playlists.css';

const Playlists = ({ token }) => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(userPlaylistsEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaylists(response.data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

   
    if (token) {
      fetchPlaylists();
    }

    // Set body class when component mounts
    document.body.classList.add('specific-page2');

    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('specific-page2');
    };
  }, [token]);


  const handlePlaylistClick = (playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <div className="playlists">
      <h1>Your Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <img src={playlist.images[0]?.url || 'default-image-url'} alt={playlist.name} />
            <div className="playlist-details">
              <h2>{playlist.name}</h2>
              <p>Total tracks: {playlist.tracks.total}</p>
            </div>
            <div className="playlist-actions">
              <FontAwesomeIcon 
                icon={faPlay} 
                onClick={() => handlePlaylistClick(playlist)} 
                className="play-icon" 
                style={{ cursor: 'pointer', fontSize: '24px', marginLeft: '10px' }} 
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;