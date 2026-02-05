import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; // Asegúrate de usar el archivo CSS que editamos

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();

  return (
    <nav className={styles['nav-fixed-top']}>
      <div className={styles['nav-flex-wrapper']}>
        
        {/* LOGO: movieDEST */}
        <Link to="/" className={styles['nav-logo-text']}>
          movie<span className={styles['text-red-dest']}>dest</span>
        </Link>

        {/* BUSCADOR */}
        <div className={styles['nav-search-capsule']}>
          <span style={{ fontSize: '1.2rem' }}>🔍</span>
          <input 
            type="text" 
            className={styles['nav-search-input']} 
            placeholder="¿Qué quieres ver hoy?" 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* BOTÓN FAVORITOS */}
        <Link to="/favorites" className={styles['nav-fav-pill']}>
          <span style={{ marginRight: '8px' }}>❤️</span>
          Favoritos
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;