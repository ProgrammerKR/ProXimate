import { Outlet, NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';
import './Docs.css';

export function DocsLayout() {
  return (
    <div className="docs-layout container">
      <aside className="docs-sidebar">
        <div className="docs-search-btn-wrapper">
          <button className="docs-search-btn text-muted">
            <Search size={16} />
            <span>Search docs...</span>
            <kbd className="mono">⌘K</kbd>
          </button>
        </div>
        
        <nav className="docs-nav">
          <div className="docs-nav-group">
            <h4>Getting Started</h4>
            <NavLink to="/docs/introduction">Introduction</NavLink>
            <NavLink to="/docs/getting-started">Installation</NavLink>
            <NavLink to="/docs/quick-start">Quick Start</NavLink>
          </div>
          
          <div className="docs-nav-group">
            <h4>Core Concepts</h4>
            <NavLink to="/docs/css-api">CSS API</NavLink>
            <NavLink to="/docs/javascript-api">JavaScript API</NavLink>
            <NavLink to="/docs/configuration">Configuration</NavLink>
          </div>

          <div className="docs-nav-group">
            <h4>Advanced</h4>
            <NavLink to="/docs/accessibility">Accessibility</NavLink>
            <NavLink to="/docs/performance">Performance</NavLink>
            <NavLink to="/docs/react">React Integration</NavLink>
          </div>
        </nav>
      </aside>
      
      <main className="docs-content">
        <Outlet />
      </main>
    </div>
  );
}

export function DocsIndex() {
  return (
    <div className="docs-article px-animate px-fade-in px-duration-fast">
      <h1>Getting Started</h1>
      <p className="lead">Install ProXimate and start building beautiful, engineered motion.</p>
      
      <h2>Installation</h2>
      <p>ProXimate is split into modular packages. You can install exactly what you need.</p>
      
      <h3>Core Packages</h3>
      <pre><code>npm install @proximate/css @proximate/core</code></pre>
      
      <h3>React Integration</h3>
      <pre><code>npm install @proximate/react</code></pre>

      <h2>Basic Usage</h2>
      <p>Once installed, import the core CSS into your root layout file (e.g., <code>main.tsx</code> or <code>_app.tsx</code>):</p>
      
      <pre><code>import '@proximate/css/dist/proximate.css';</code></pre>
      
      <p>Then apply the animation classes to your elements:</p>
      
      <pre><code>&lt;div class="px-animate px-fade-in-up px-duration-fast"&gt;
  Hello World
&lt;/div&gt;</code></pre>
    </div>
  );
}
