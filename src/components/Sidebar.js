import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMusic, faBook, faUser, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './Sidebar.module.css';

const Sidebar = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        <h2>Menu</h2>
        <button className={styles.toggleButton} onClick={toggleCollapse}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <ul className={styles.menu}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')} onClick={toggleCollapse}>
            <FontAwesomeIcon icon={faHome} className={styles.icon} />
            <span className={styles.text}>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlists" className={({ isActive }) => (isActive ? styles.active : '')} onClick={toggleCollapse}>
            <FontAwesomeIcon icon={faMusic} className={styles.icon} />
            <span className={styles.text}>Playlists</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/library" className={({ isActive }) => (isActive ? styles.active : '')} onClick={toggleCollapse}>
            <FontAwesomeIcon icon={faBook} className={styles.icon} />
            <span className={styles.text}>Top Artists</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.active : '')} onClick={toggleCollapse}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <span className={styles.text}>Profile</span>
          </NavLink>
        </li>
      </ul>
      <button className={styles.logoutButton} onClick={onLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon} />
        <span className={styles.text}>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
