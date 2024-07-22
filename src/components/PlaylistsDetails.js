// src/components/PlaylistsDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PlaylistsDetails.css';

const PlaylistsDetails = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Playlist Data:', response.data); // Log to check data
        setPlaylist(response.data);
        setTracks(response.data.tracks.items);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    if (token && id) {
      fetchPlaylist();
    }
    
    // Set body class when component mounts
    document.body.classList.add('specific-page3');

    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('specific-page3');
    };
  }, [id, token]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  const handleTrackClick = (trackId) => {
    navigate(`/song/${trackId}`); // Navigate to the SongPlayerPage with the track ID
  };
  const handleBackClick = () => {
    navigate(-1); // Navigate back one step in the history
  };
  return (
    <div className="playlists-details">
      <h1>{playlist.name}</h1>
      <p>{playlist.description || 'No description available.'}</p>
      <ul className="tracks-list">
        {tracks.length === 0 ? (
          <li>No tracks available in this playlist.</li>
        ) : (
          tracks.map((trackItem, index) => (
            <li key={index} className="track-item" onClick={() => handleTrackClick(trackItem.track.id)}>
              <img 
                src={trackItem.track.album.images[0]?.url || 'default-image-url'} 
                alt={trackItem.track.name} 
                className="track-image" 
              />
              <div className="track-info">
                <h3>{trackItem.track.name}</h3>
                <p>{trackItem.track.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            </li>
          ))
        )}
      </ul>
      <button onClick={handleBackClick} className="butt2">
        Back
      </button>
    </div>
  );
};

export default PlaylistsDetails;