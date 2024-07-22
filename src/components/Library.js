import React, { useState, useEffect } from 'react';
import { getUserTopArtists } from '../auth';

const Library = ({ token }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      if (!token) {
        setError('No token provided');
        setLoading(false);
        return;
      }

      try {
        const artists = await getUserTopArtists(token);
        setTopArtists(artists);
      } catch (error) {
        console.error('Error fetching top artists:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
    document.body.classList.add('specific-page5');

    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('specific-page5');
    };
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="library-container">
      <h2>Top Artists</h2>
      <div className="artist-grid">
        {topArtists.length > 0 ? (
          topArtists.map((artist) => (
            <div key={artist.id} className="artist-card">
              {artist.images && artist.images[0] ? (
                <img src={artist.images[0].url} alt={artist.name} />
              ) : (
                <div>No image available</div>
              )}
              <h3>{artist.name}</h3>
            </div>
          ))
        ) : (
          <div>No top artists found.</div>
        )}
      </div>
    </div>
  );
};

export default Library;
