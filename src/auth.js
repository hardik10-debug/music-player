import qs from 'qs';

export const clientId = "40a4d0c2c361443bb4f8e8e6f045e7b8";
export const redirectUri = "http://localhost:3000/callback";
export const authEndpoint = "https://accounts.spotify.com/authorize";

export const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-public",
  "user-top-read",
];

export const userProfileEndpoint = "https://api.spotify.com/v1/me";
export const userPlaylistsEndpoint = "https://api.spotify.com/v1/me/playlists";
export const trendingSongsEndpoint = "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks";

export const getSpotifyAuthUrl = (redirectPath = '/') => {
  const authParams = {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'token',
    scope: scopes.join(' '),
    state: redirectPath,
  };

  return `${authEndpoint}?${qs.stringify(authParams)}`;
};

export const getTokenFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  return {
    access_token: urlParams.get('access_token'),
    state: urlParams.get('state'),
  };
};

export const getUserTopArtists = async (token) => {
  const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top artists');
  }

  const data = await response.json();
  console.log('API response data:', data); // Log the API response
  return data.items;
};
