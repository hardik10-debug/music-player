// src/components/TokenHandler.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromUrl } from '../auth';

const TokenHandler = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('spotifyToken');
    if (savedToken) {
      setToken(savedToken);
    } else {
      const urlToken = getTokenFromUrl();
      if (urlToken.access_token) {
        localStorage.setItem('spotifyToken', urlToken.access_token);
        setToken(urlToken.access_token);
        navigate("/profile"); // Redirect to profile page
      }
    }
  }, [setToken, navigate]);

  return null;
};

export default TokenHandler;
