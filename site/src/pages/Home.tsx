import { Motion } from '@proximate-css/react';
import { ArrowRight, Box, Layout as LayoutIcon, Settings2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const CODE_EXAMPLES = {
  react: {
    language: 'tsx',
    code: `import { Motion } from "@proximate-css/react";

export function Card() {
  return (
    <Motion 
      as="section"
      animation="fade-in-up" 
      duration={600}
      reveal={true}
      threshold={0.5}
    >
      <h1>Hello World</h1>
    </Motion>
  );
}`
  },
  vanilla: {
    language: 'javascript',
    code: `import { animate, reveal } from "@proximate-css/core";
import "@proximate-css/css/dist/proximate.css";

const element = document.querySelector('.card');

// Animate immediately
animate(element, {
  animation: 'fade-in-up',
  duration: 600
});

// Or animate on scroll
reveal(element, {
  animation: 'fade-in-up',
  threshold: 0.5
});`
  },
  html: {
    language: 'html',
    code: `<!-- 1. Include the stylesheet -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@proximate-css/css/dist/proximate.min.css" />

<!-- 2. Apply classes to your elements -->
<section class="card px-animate px-fade-in-up px-duration-normal">
  <h1>Hello World</h1>
</section>

<!-- No JavaScript required! -->`
  }
};

export function Home() {
  const [demoKey, setDemoKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'react' | 'vanilla' | 'html'>('react');
  
  const currentExample = CODE_EXAMPLES[activeTab];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <Motion animation="fade-in-up" duration={800} className="hero-content">
            <h1 className="hero-title">
              Motion, <span className="hero-accent">engineered.</span>
            </h1>
            <p className="hero-subtitle">
              A lightweight, composable animation toolkit for building polished web experiences without sacrificing performance.
            </p>
            <div className="hero-actions">
              <Link to="/docs/getting-started" className="btn btn-primary btn-lg">
                Get Started <ArrowRight size={16} />
              </Link>
              <Link to="/animations" className="btn btn-secondary btn-lg">
                Explore Animations
              </Link>
            </div>
          </Motion>

          <Motion animation="zoom-in" delay={200} duration={1000} className="hero-demo-wrapper">
            <div className="hero-demo-card card">
              <div className="hero-demo-header">
                <span className="mono text-muted text-sm">Interactive Preview</span>
                <button className="btn btn-ghost btn-sm" onClick={() => setDemoKey(k => k + 1)}>Replay</button>
              </div>
              <div className="hero-demo-stage">
                <Motion key={demoKey} animation="fade-in-up" duration={600} className="demo-element">
                  ProXimate
                </Motion>
              </div>
              <div className="hero-demo-footer mono text-muted text-sm text-center">
                px-fade-in-up • 600ms • ease-out
              </div>
            </div>
          </Motion>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="trust-section">
        <div className="container trust-grid">
          <div className="trust-item px-animate px-fade-in px-delay-400">
            <strong>Lightweight</strong>
            <span className="text-muted">Zero bloat</span>
          </div>
          <div className="trust-item px-animate px-fade-in px-delay-500">
            <strong>CSS-first</strong>
            <span className="text-muted">GPU accelerated</span>
          </div>
          <div className="trust-item px-animate px-fade-in px-delay-600">
            <strong>Tree-shakable</strong>
            <span className="text-muted">Ship only what you use</span>
          </div>
          <div className="trust-item px-animate px-fade-in px-delay-700">
            <strong>Accessible</strong>
            <span className="text-muted">Respects user preferences</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Built for real products</h2>
            <p className="text-muted">Everything you need to build premium interfaces, without the complexity of physics-based engines.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card card">
              <Zap className="feature-icon" />
              <h3>Lightweight by design</h3>
              <p className="text-muted">Ship motion without shipping unnecessary runtime complexity. No heavy JavaScript physics engine required.</p>
            </div>
            
            <div className="feature-card card">
              <Settings2 className="feature-icon" />
              <h3>Composable</h3>
              <p className="text-muted">Combine animations, timing, easing, delays, and orchestration with a unified API.</p>
            </div>

            <div className="feature-card card">
              <LayoutIcon className="feature-icon" />
              <h3>Accessible</h3>
              <p className="text-muted">Respects user motion preferences automatically with built-in prefers-reduced-motion handling.</p>
            </div>

            <div className="feature-card card">
              <Box className="feature-icon" />
              <h3>Tree-shakable</h3>
              <p className="text-muted">The procedural generation outputs 320+ animations, but you only bundle exactly what your app uses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Showcase */}
      <section className="code-showcase-section">
        <div className="container code-showcase-grid">
          <div className="code-showcase-text">
            <h2>Write less.<br/>Animate better.</h2>
            <p className="text-muted">A developer-first API that feels natural whether you're using Vanilla JS, React, or just writing HTML.</p>
          </div>
          <div className="code-showcase-editor card">
            <div className="editor-header">
              <div className="editor-tabs">
                <button 
                  className={`editor-tab ${activeTab === 'react' ? 'active' : ''}`}
                  onClick={() => setActiveTab('react')}
                >React</button>
                <button 
                  className={`editor-tab ${activeTab === 'vanilla' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vanilla')}
                >Vanilla JS</button>
                <button 
                  className={`editor-tab ${activeTab === 'html' ? 'active' : ''}`}
                  onClick={() => setActiveTab('html')}
                >HTML</button>
              </div>
            </div>
            <div className="editor-content">
              <Highlight 
                theme={themes.nightOwl} 
                code={currentExample.code} 
                language={currentExample.language as any}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={className} style={{ ...style, backgroundColor: 'transparent', margin: 0, padding: '1.5rem', fontFamily: 'var(--px-font-mono)' }}>
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
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content card">
            <h2>Add motion without adding complexity.</h2>
            <p className="text-muted">Start building with ProXimate in minutes.</p>
            <div className="hero-actions justify-center" style={{marginTop: '2rem'}}>
              <Link to="/docs/getting-started" className="btn btn-primary btn-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
