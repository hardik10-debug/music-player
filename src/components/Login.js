import React from "react";
import { getSpotifyAuthUrl } from "../auth";
import "./Login.css";

const Login = () => {
  const handleLogin = () => {
    window.location = getSpotifyAuthUrl();
  };

  return (
    <div className="login-page">
       <div className="vinyl-container left">
        <div className="vinyl" style={{ backgroundImage: "url('https://res.cloudinary.com/dzdgpwtox/image/upload/w_450,c_scale,f_auto/v1662181287/final_designs/seller_design_412784/f_20220903050125.png')" }}></div> {/* Replace with your image URL */}
      </div>
      <img
        src="https://png.pngtree.com/png-vector/20221001/ourmid/pngtree-music-player-icon-png-image_6248707.png"
        alt="logo-spotify"
        className="logo"
      />
      <div className="vinyl-container right">
        <div className="vinyl" style={{ backgroundImage: "url('https://res.cloudinary.com/dzdgpwtox/image/upload/w_450,c_scale,f_auto/v1662181287/final_designs/seller_design_412784/f_20220903050125.png')" }}></div> {/* Replace with your image URL */}
      </div>
      <div className="equalizer">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <button onClick={handleLogin} className="login-btn">LOG IN TO GHOST MUSIC</button>
    </div>
  );
};

export default Login;
