import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Trending.css';

const Trending = ({ token }) => {
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingTracks = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token prop here
          },
          params: {
            q: 'genre:pop',
            type: 'track',
            limit: 50,
          },
        });

        console.log('API Response:', response.data);

        const tracks = response.data.tracks.items;
        setTrendingTracks(tracks);
        setError(null);
      } catch (error) {
        console.error('Error fetching trending tracks:', error);
        setError('Error fetching trending tracks. Please try again later.');
      }
    };

    if (token) {
      fetchTrendingTracks();
    }

    // Set body class when component mounts
    document.body.classList.add('specific-page1');

    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('specific-page1');
    };
  }, [token]);

  return (
    <div className="trending">
      <h2>Trending Songs</h2>
      {error && <div className="error">{error}</div>}
      <div className="trending-tracks">
        {trendingTracks.length > 0 ? (
          trendingTracks.map((track) => (
            <div key={track.id} className="trending-track">
              <Link to={`/song/${track.id}`}>
                <div className="track-image">
                  {track.album && track.album.images && track.album.images.length > 0 ? (
                    <img src={track.album.images[0].url} alt="Album cover" />
                  ) : (
                    <div
                      style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: 'grey',
                        borderRadius: '10px',
                      }}
                    />
                  )}
                </div>
                <div className="track-info">
                  <div className="track-name">{track.name}</div>
                  <div className="track-artists">by {track.artists.map((artist) => artist.name).join(', ')}</div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-tracks">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Trending;