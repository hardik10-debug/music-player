import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Trending from './components/Trending';
import Playlists from './components/Playlists';
import Profile from './components/Profile';
import SongPlayerPage from './components/SongPlayerPage';
import PlaylistsDetails from './components/PlaylistsDetails';
import Library from './components/Library'; // Import Library component
import Login from './components/Login';
import TokenHandler from './components/TokenHandler'; // Import TokenHandler
import './App.css';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('spotifyToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('spotifyToken');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <TokenHandler setToken={setToken} /> {/* Include TokenHandler */}
        {token ? (
          <>
            <Sidebar onLogout={handleLogout} />
            <div className="content">
              <Routes>
                <Route path="/" element={<Trending token={token} />} />
                <Route path="/playlists" element={<Playlists token={token} />} />
                <Route path="/playlist/:id" element={<PlaylistsDetails token={token} />} />
                <Route path="/profile" element={<Profile token={token} />} />
                <Route path="/library" element={<Library token={token} />} /> {/* Add Library route */}
                <Route path="/song/:id" element={<SongPlayerPage token={token} />} />
              </Routes>
            </div>
          </>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
};

export default App;
