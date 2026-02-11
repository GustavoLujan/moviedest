import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ onSearch }) => {
  return (
    <nav className={styles['nav-fixed-top']}>
      <div className={styles['nav-flex-wrapper']}>
        
        {/* LOGO */}
        <Link to="/" className={styles['nav-logo-text']}>
          movie<span className={styles['text-red-dest']}>dest</span>
        </Link>

        {/* BOTÓN FAVORITOS (Lo subimos en el orden visual para móvil) */}
        <Link to="/favorites" className={styles['nav-fav-pill']}>
          <span>❤️</span>
          <span>Favoritos</span>
        </Link>

        {/* BUSCADOR (Bajará a su propia línea en móvil gracias al order: 3) */}
        <div className={styles['nav-search-capsule']}>
          <span>🔍</span>
          <input 
            type="text" 
            className={styles['nav-search-input']} 
            placeholder="¿Qué quieres ver hoy?" 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;