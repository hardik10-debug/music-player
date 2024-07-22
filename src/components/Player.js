import React, { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import './Player.css';
import { useNavigate } from 'react-router-dom';

const Player = ({ trackUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate(); // Call useNavigate at the top level

  useEffect(() => {
    if (trackUrl) {
      soundRef.current = new Howl({
        src: [trackUrl],
        html5: true,
        onload: () => setDuration(soundRef.current.duration()),
        onend: () => {
          setIsPlaying(false);
          setProgress(0);
          clearInterval(intervalRef.current);
        },
      });

      // Cleanup on component unmount
      return () => {
        if (soundRef.current) {
          soundRef.current.unload();
        }
        clearInterval(intervalRef.current);
      };
    }
  }, [trackUrl]);

  const togglePlayPause = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
        clearInterval(intervalRef.current);
      } else {
        soundRef.current.play();
        intervalRef.current = setInterval(() => {
          setProgress((soundRef.current.seek() / soundRef.current.duration()) * 100);
        }, 1000);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopPlayback = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      setIsPlaying(false);
      setProgress(0);
      clearInterval(intervalRef.current);
    }
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    if (soundRef.current) {
      const newTime = (newProgress / 100) * soundRef.current.duration();
      soundRef.current.seek(newTime);
      setProgress(newProgress);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleShuffle = () => {
    // Implement shuffle functionality here
    console.log('Shuffle clicked');
  };

  const handleForward = () => {
    // Implement forward functionality here
    console.log('Forward clicked');
  };

  const handleHeartClick = () => {
    console.log('Heart clicked');
    navigate('/playlists'); // Navigate to the playlist page
  };

  return (
    <div className="player-block">
      <div className="player-controls">
        <button onClick={handleShuffle} className="control-btn">
          <i className="fas fa-random"></i>
        </button>
        <button onClick={handleForward} className="control-btn">
          <i className="fas fa-forward"></i>
        </button>
        <button onClick={togglePlayPause} className="control-btn">
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button onClick={stopPlayback} className="control-btn">
          <i className="fas fa-stop"></i>
        </button>
        <button onClick={handleHeartClick} className="control-btn">
          <i className="fas fa-heart"></i>
        </button>
      </div>
      <div className="equalizer2">
        <div className="bar1"></div>
        <div className="bar1"></div>
        <div className="bar1"></div>
        <div className="bar1"></div>
        <div className="bar1"></div>
      </div>
      <div className="progress-container">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="progress-bar"
        />
      </div>
      <div className="time-info">
        <span>{formatTime((progress / 100) * duration)}</span> / <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default Player;