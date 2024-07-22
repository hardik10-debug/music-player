// src/components/Callback.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromUrl, handleRedirect } from '../auth';

const Callback = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = () => {
      const { access_token, state } = getTokenFromUrl();
      if (access_token) {
        setToken(access_token);
        const redirectPath = state || '/';
        navigate(redirectPath);
      }
    };

    handleRedirect();
    handleCallback();
  }, [navigate, setToken]);

  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Callback;