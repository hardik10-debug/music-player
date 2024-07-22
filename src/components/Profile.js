import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { userProfileEndpoint } from '../auth';
import './UserProfile.css';

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(userProfileEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (token) {
      fetchProfile();
    }

    // Set body class when component mounts
    document.body.classList.add('specific-page');

    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('specific-page');
    };
  }, [token]);

  return (
    <div className="profile">
      {profile ? (
        <>
          <h1>Profile</h1>
          <div className="profile-info">
            {profile.images && profile.images.length > 0 && (
              <img
                src={profile.images[1].url} // Use the first image for better visibility
                alt="Profile"
                className="profile-image"
              />
            )}
            <h2>{profile.display_name}</h2>
            <p>Username: {profile.id}</p>
            <p>Email: {profile.email}</p>
            <p>Country: {profile.country}</p>
            <p>Followers: {profile.followers.total}</p>
          </div>
        </>
      ) : (
        <div>Loading profile...</div>
      )}
    </div>
  );
};

export default Profile;