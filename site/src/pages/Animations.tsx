import { useState, useMemo } from 'react';
import { Motion } from '@proximate-css/react';
import { Search, Play, Code, Copy, Check } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import ANIMATIONS from '../manifest.json';
import './Animations.css';

export function Animations() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(null);

  const categories = ['All', 'entrances', 'exits', 'attention', 'transforms', 'blur', 'depth'];

  const filteredAnimations = useMemo(() => {
    return ANIMATIONS.filter(anim => {
      const matchesSearch = anim.toLowerCase().includes(search.toLowerCase());
      
      if (category === 'All') return matchesSearch;
      
      // Basic heuristic to group based on prefix
      if (category === 'entrances' && anim.includes('-in')) return matchesSearch;
      if (category === 'exits' && anim.includes('-out')) return matchesSearch;
      if (category === 'attention' && (anim.includes('pulse') || anim.includes('shake') || anim.includes('flash') || anim.includes('heartbeat'))) return matchesSearch;
      if (category === 'transforms' && (anim.includes('skew') || anim.includes('flip') || anim.includes('rotate'))) return matchesSearch;
      if (category === 'blur' && anim.includes('blur')) return matchesSearch;
      
      return false;
    });
  }, [search, category]);

  return (
    <div className="explorer-page">
      <div className="explorer-header-section">
        <div className="container">
          <Motion animation="fade-in-down" duration={500}>
            <h1>Explore Motion</h1>
            <p className="text-muted">Browse the complete ProXimate catalogue of {ANIMATIONS.length} compositor-optimized animations.</p>
          </Motion>
          
          <div className="explorer-filters">
            <div className="search-bar">
              <Search size={18} className="text-muted" />
              <input 
                type="text" 
                placeholder="Search animations (e.g., fade, slide, bounce)..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
            <div className="category-tabs">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`category-tab ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {selectedAnimation ? (
          <Playground animation={selectedAnimation} onClose={() => setSelectedAnimation(null)} />
        ) : (
          <div className="animations-grid">
            {filteredAnimations.slice(0, 100).map(anim => (
              <AnimationCard key={anim} animation={anim} onClick={() => setSelectedAnimation(anim)} />
            ))}
            {filteredAnimations.length > 100 && (
              <div className="load-more-indicator text-muted">
                Showing first 100 results. Use search to find more.
              </div>
            )}
            {filteredAnimations.length === 0 && (
              <div className="empty-state text-muted">
                No animations found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AnimationCard({ animation, onClick }: { animation: string, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <div 
      className="animation-card card" 
      onClick={onClick}
      onMouseEnter={() => { setIsHovered(true); setKey(k => k + 1); }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="animation-card-preview">
        <Motion key={key} animation={isHovered ? animation : ''} duration={600} className="preview-dot">
          <span className="sr-only">Preview</span>
        </Motion>
      </div>
      <div className="animation-card-footer">
        <span className="mono text-sm">{animation}</span>
      </div>
    </div>
  );
}

function Playground({ animation, onClose }: { animation: string, onClose: () => void }) {
  const [key, setKey] = useState(0);
  const [duration, setDuration] = useState('normal');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(`<div class="px-animate px-${animation} px-duration-${duration}"></div>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="playground-view px-animate px-fade-in px-duration-fast">
      <button className="btn btn-ghost mb-4" onClick={onClose}>← Back to Explorer</button>
      
      <div className="playground-grid">
        <div className="playground-stage card">
          <Motion key={key} animation={animation} className={`px-duration-${duration} playground-element`}>
            ProXimate
          </Motion>
        </div>
        
        <div className="playground-controls card">
          <h3>{animation}</h3>
          
          <div className="control-group">
            <label>Duration</label>
            <select value={duration} onChange={e => { setDuration(e.target.value); setKey(k => k + 1); }}>
              <option value="instant">Instant (150ms)</option>
              <option value="fast">Fast (300ms)</option>
              <option value="normal">Normal (600ms)</option>
              <option value="slow">Slow (1200ms)</option>
            </select>
          </div>
          
          <button className="btn btn-primary w-full" onClick={() => setKey(k => k + 1)}>
            <Play size={16} /> Replay Animation
          </button>
          
          <div className="playground-code mt-8">
            <div className="code-header">
              <Code size={16} /> <span>HTML</span>
            </div>
            <div className="code-block" style={{ padding: 0, overflow: 'hidden' }}>
              <Highlight 
                theme={themes.nightOwl} 
                code={`<div class="px-animate px-${animation} px-duration-${duration}"></div>`} 
                language="html"
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={className} style={{ ...style, margin: 0, padding: '1rem', fontFamily: 'var(--px-font-mono)', fontSize: '0.875rem', overflowX: 'auto' }}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
            <button className="btn btn-secondary w-full" onClick={copyCode}>
              {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />} 
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
