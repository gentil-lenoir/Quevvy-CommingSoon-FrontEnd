import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const addRipple = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget;
    if (btn.hasAttribute('disabled')) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255,255,255,0.5)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.transition = 'all 0.6s';
    ripple.style.pointerEvents = 'none';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => {
      ripple.style.width = '300px';
      ripple.style.height = '300px';
      ripple.style.opacity = '0';
    }, 10);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <>
      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          padding: 1rem 0;
        }
        .header.scrolled {
          background: rgba(10, 12, 18, 0.95);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          border-bottom: 1px solid rgba(110,231,179,0.3);
        }
        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.9rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-decoration: none;
          color: #F0F3FA;
        }
        .logo img {
          height: 50px;
          width: auto;
        }
        .logo span {
          background: linear-gradient(135deg, #C0F2B6, #6EE7B3);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          color: #C9D6FF;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          transition: all 0.3s;
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .nav-link:hover {
          color: #6EE7B3;
          background: rgba(110,231,179,0.1);
          transform: translateY(-2px);
        }
        .nav-link.active {
          color: #6EE7B3;
          background: rgba(110,231,179,0.2);
          border: 1px solid rgba(110,231,179,0.4);
        }
        .donate-btn {
          background: linear-gradient(105deg, #6EE7B3, #3B82F6);
          color: #0A0C12 !important;
          font-weight: 700;
          padding: 0.75rem 1.5rem !important;
          border-radius: 30px !important;
          box-shadow: 0 4px 15px rgba(110,231,179,0.4);
        }
        .donate-btn:hover {
          transform: translateY(-3px) scale(1.05) !important;
          box-shadow: 0 10px 25px rgba(110,231,179,0.5) !important;
        }
        .lang-selector, .mobile-menu-btn {
          background: rgba(20,25,40,0.9);
          border: 1px solid rgba(110,231,179,0.4);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .lang-selector:hover, .mobile-menu-btn:hover {
          border-color: #6EE7B3;
          box-shadow: 0 0 0 3px rgba(110,231,179,0.25);
        }
        .mobile-menu {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .mobile-menu {
            display: block;
          }
          .mobile-menu.open {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(10,12,18,0.98);
            backdrop-filter: blur(20px);
            padding: 2rem 1.5rem;
            border-top: 1px solid rgba(110,231,179,0.3);
          }
          .mobile-nav-links {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
          }
        }
        @media (max-width: 480px) {
          .logo { font-size: 1.5rem; }
          .logo img { height: 40px; }
        }
      `}</style>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
<Link to="/" className="logo ripple" onClick={addRipple}>
            <img src="/img/general-logo.png" alt="Quevvy" />
          </Link>

          <nav className="nav-links">
            <Link to="/" className="nav-link ripple" onClick={addRipple}>Accueil</Link>
            <Link to="/donations" className="nav-link ripple" onClick={addRipple}>Dons</Link>
            <Link to="/donate" className="nav-link donate-btn ripple" onClick={addRipple}>
              Faire un don
            </Link>
          </nav>

          <div className="nav-right">
            <select className="lang-selector" defaultValue="fr">
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇺🇸 EN</option>
              <option value="sw">🇨🇩 SW</option>
            </select>
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu open">
            <div className="mobile-nav-links">
              <Link to="/" className="nav-link ripple" onClick={() => { addRipple({currentTarget: document.createElement('a') } as any); setIsMobileMenuOpen(false); }}>Accueil</Link>
              <Link to="/donations" className="nav-link ripple" onClick={() => { addRipple({currentTarget: document.createElement('a') } as any); setIsMobileMenuOpen(false); }}>Dons</Link>
              <Link to="/donate" className="nav-link donate-btn ripple" onClick={() => { addRipple({currentTarget: document.createElement('a') } as any); setIsMobileMenuOpen(false); }}>
                Faire un don
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

