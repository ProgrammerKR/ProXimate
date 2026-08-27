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
      
      <h2>Installation via NPM</h2>
      <p>ProXimate is split into modular packages. You can install exactly what you need.</p>
      
      <h3>Core Packages</h3>
      <pre><code>npm install @proximate-css/css @proximate-css/core</code></pre>
      
      <h3>React Integration</h3>
      <pre><code>npm install @proximate-css/react</code></pre>

      <h2>Basic Usage (Bundler)</h2>
      <p>Once installed, import the core CSS into your root layout file (e.g., <code>main.tsx</code> or <code>_app.tsx</code>):</p>
      
      <pre><code>import '@proximate-css/css/dist/proximate.css';</code></pre>
      
      <p>Then apply the animation classes to your elements:</p>
      
      <pre><code>&lt;div class="px-animate px-fade-in-up px-duration-fast"&gt;
  Hello World
&lt;/div&gt;</code></pre>

      <hr />

      <h2 id="cdn-guide">Step-by-Step CDN Installation Guide</h2>
      <p>If you prefer not to use a bundler, you can easily use ProXimate via a CDN like <strong>unpkg</strong> or <strong>jsdelivr</strong>.</p>
      
      <h3>Step 1: Include the CSS</h3>
      <p>Add the ProXimate CSS file to the <code>&lt;head&gt;</code> of your HTML file:</p>
      <pre><code>&lt;link rel="stylesheet" href="https://unpkg.com/@proximate-css/css/dist/proximate.min.css"&gt;</code></pre>

      <h3>Step 2: Include the JavaScript (Optional)</h3>
      <p>If you want to use the JavaScript API for programmatic animations (like staggering or revealing on scroll), add the core script right before your closing <code>&lt;/body&gt;</code> tag:</p>
      <pre><code>&lt;script src="https://unpkg.com/@proximate-css/core/dist/index.global.js"&gt;&lt;/script&gt;</code></pre>

      <h3>Step 3: Start Animating!</h3>
      <p>You can now use ProXimate classes on any element, or access the global <code>ProXimate</code> object in your scripts:</p>
      <pre><code>&lt;div class="px-animate px-fade-in-up"&gt;I am animated!&lt;/div&gt;

&lt;script&gt;
  // Trigger animations programmatically
  ProXimate.animate('.my-element', &#123; animation: 'zoom-in', duration: 500 &#125;);
&lt;/script&gt;</code></pre>
    </div>
  );
}

export function Introduction() {
  return (
    <div className="docs-article px-animate px-fade-in">
      <h1>Introduction</h1>
      <p>ProXimate is a modern, lightweight, and composable animation toolkit for the web.</p>
      <p>Unlike other animation libraries, ProXimate is built on CSS Variables and native DOM events, meaning it achieves buttery-smooth performance without the heavy JavaScript overhead.</p>
    </div>
  );
}

export function QuickStart() {
  return (
    <div className="docs-article px-animate px-fade-in">
      <h1>Quick Start</h1>
      <p>Here are some quick snippets to get you going:</p>
      <pre><code>&lt;!-- Fade In --&gt;
&lt;div class="px-animate px-fade-in"&gt;Content&lt;/div&gt;

&lt;!-- Fade In Up with fast duration --&gt;
&lt;div class="px-animate px-fade-in-up px-duration-fast"&gt;Content&lt;/div&gt;</code></pre>
    </div>
  );
}

export function CssApi() {
  return (
    <div className="docs-article px-animate px-fade-in">
      <h1>CSS API</h1>
      <p>ProXimate provides a simple CSS utility API to animate any HTML element.</p>
      
      <h2>Base Classes</h2>
      <ul>
        <li><code>px-animate</code>: Required on any element you wish to animate. This sets up the CSS variables and base state.</li>
        <li><code>px-[animation-name]</code>: The actual animation (e.g., <code>px-fade-in</code>, <code>px-zoom-in</code>, <code>px-slide-up</code>).</li>
      </ul>

      <h2>Modifiers</h2>
      <p>You can adjust the behavior of the animation using modifier classes or inline style variables.</p>
      <ul>
        <li><code>px-duration-[speed]</code>: Options include <code>fast</code> (200ms), <code>normal</code> (500ms), and <code>slow</code> (1000ms).</li>
        <li><code>--px-delay</code>: Inline CSS variable to delay the animation (e.g., <code>style="--px-delay: 200ms"</code>).</li>
      </ul>
    </div>
  );
}

export function JsApi() {
  return (
    <div className="docs-article px-animate px-fade-in">
      <h1>JavaScript API</h1>
      <p>The <code>@proximate-css/core</code> package gives you programmatic control over your animations.</p>
      
      <h2><code>animate(element, options)</code></h2>
      <p>Triggers an animation on a DOM node and returns an instance you can `pause()`, `play()`, or `cancel()`.</p>
      <pre><code>import &#123; animate &#125; from '@proximate-css/core';

const instance = animate(document.querySelector('.box'), &#123;
  animation: 'fade-in',
  duration: 500
&#125;);</code></pre>

      <h2><code>stagger(elements, options)</code></h2>
      <p>Staggers an animation across multiple elements. Supports directions like <code>forward</code>, <code>reverse</code>, <code>center-out</code>, and <code>edges-in</code>.</p>
      <pre><code>stagger(document.querySelectorAll('.list-item'), &#123;
  animation: 'fade-in-up',
  stagger: 100, // ms between each item
  staggerDirection: 'center-out'
&#125;);</code></pre>

      <h2><code>reveal(element, options)</code></h2>
      <p>Uses IntersectionObserver to trigger the animation only when the element scrolls into view.</p>
    </div>
  );
}

export function ReactApi() {
  return (
    <div className="docs-article px-animate px-fade-in">
      <h1>React Integration</h1>
      <p>The <code>@proximate-css/react</code> package provides a highly optimized <code>&lt;Motion&gt;</code> component.</p>
      
      <h2>The <code>&lt;Motion&gt;</code> Component</h2>
      <p>Use it just like a normal HTML element. By default it renders a <code>div</code>, but you can change it with the <code>as</code> prop.</p>
      <pre><code>import &#123; Motion &#125; from '@proximate-css/react';

function App() &#123;
  return (
    &lt;Motion as="section" animation="fade-in-up" duration=&#123;500&#125;&gt;
      Animated content!
    &lt;/Motion&gt;
  );
&#125;</code></pre>

      <h2>Reveal on Scroll</h2>
      <p>Pass the <code>reveal</code> prop to automatically attach an IntersectionObserver:</p>
      <pre><code>&lt;Motion animation="zoom-in" reveal threshold=&#123;0.5&#125;&gt;
  I appear when 50% visible!
&lt;/Motion&gt;</code></pre>
    </div>
  );
}

export function Configuration() {
  return (
    <div className="docs-article px-animate px-fade-in">
      <h1>Configuration</h1>
      <p>Configure global ProXimate settings using the <code>configure()</code> function.</p>
      <pre><code>import &#123; configure &#125; from '@proximate-css/core';

configure(&#123;
  reducedMotion: 'always' // 'respect' (default), 'always', or 'never'
&#125;);</code></pre>
    </div>
  );
}

export function Accessibility() {
  return (
    <div className="docs-article px-animate px-fade-in">
      <h1>Accessibility</h1>
      <p>ProXimate is designed to be accessible by default. It automatically detects the user's OS preference for reduced motion.</p>
      <p>If <code>prefers-reduced-motion: reduce</code> is set in the operating system, all ProXimate animations will instantly resolve to their final state without playing, ensuring users with vestibular motion disorders are safe.</p>
    </div>
  );
}

export function Performance() {
  return (
    <div className="docs-article px-animate px-fade-in">
      <h1>Performance</h1>
      <p>ProXimate is lightning fast because it leaves the heavy lifting to the browser.</p>
      <p>Unlike JS-driven libraries (like Framer Motion or GSAP) that calculate properties on every frame inside a <code>requestAnimationFrame</code> loop, ProXimate only uses JavaScript to attach CSS classes and variables. The actual animation is hardware-accelerated by the browser's CSS rendering engine.</p>
    </div>
  );
}
