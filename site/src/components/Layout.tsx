import { NavLink, Outlet } from 'react-router-dom';
import { Layers, PlaySquare, Book, GitBranch, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Layout.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        <NavLink to="/" className="navbar-brand">
          <Layers className="navbar-logo-icon" />
          <span>ProXimate</span>
        </NavLink>
        
        <nav className="navbar-desktop">
          <NavLink to="/animations" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <PlaySquare size={16} /> Animations
          </NavLink>
          <NavLink to="/docs" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Book size={16} /> Docs
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <a href="https://github.com/programmerkr/proximate" target="_blank" rel="noreferrer" className="btn btn-ghost nav-icon-link">
            <GitBranch size={20} />
          </a>
          <NavLink to="/docs/getting-started" className="btn btn-primary nav-cta">
            Get Started
          </NavLink>
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="mobile-drawer px-animate px-fade-in-down-sm px-duration-fast">
          <NavLink to="/animations" onClick={() => setIsOpen(false)} className="mobile-link">Animations</NavLink>
          <NavLink to="/docs" onClick={() => setIsOpen(false)} className="mobile-link">Documentation</NavLink>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        <div className="footer-brand">
          <Layers size={24} color="var(--px-accent)" />
          <h3>ProXimate</h3>
          <p className="text-muted">Motion, engineered.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <NavLink to="/animations">Animations</NavLink>
            <NavLink to="/docs">Documentation</NavLink>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#">GitHub</a>
            <a href="#">NPM</a>
          </div>
          <div className="footer-col">
            <h4>Community</h4>
            <a href="#">Issues</a>
            <a href="#">Discussions</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p className="text-muted">© {new Date().getFullYear()} ProXimate. Built for the modern web.</p>
      </div>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
