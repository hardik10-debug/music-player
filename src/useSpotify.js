import { useState, useEffect } from 'react';
import axios from 'axios';

const useSpotify = (token) => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      if (!token) return;

      try {
        const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtists(response.data.artists.items);
      } catch (err) {
        setError('Failed to fetch artists.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [token]);

  useEffect(() => {
    const fetchLatestTracks = async (artistId) => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTracks((prevTracks) => ({
          ...prevTracks,
          [artistId]: response.data.tracks,
        }));
      } catch (err) {
        console.error(`Error fetching tracks for artist ${artistId}:`, err);
      }
    };

    if (artists.length > 0) {
      artists.forEach((artist) => {
        fetchLatestTracks(artist.id);
      });
    }
  }, [artists, token]);

  return { artists, tracks, loading, error };
};

export default useSpotify;