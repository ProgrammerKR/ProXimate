import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '@proximate-css/css/dist/proximate.css';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Animations } from './pages/Animations';
import { DocsLayout, DocsIndex, Introduction, QuickStart, CssApi, JsApi, Configuration, Accessibility, Performance, ReactApi } from './pages/Docs';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="animations" element={<Animations />} />
          
          <Route path="docs" element={<DocsLayout />}>
            <Route index element={<Navigate to="getting-started" replace />} />
            <Route path="introduction" element={<Introduction />} />
            <Route path="getting-started" element={<DocsIndex />} />
            <Route path="quick-start" element={<QuickStart />} />
            <Route path="css-api" element={<CssApi />} />
            <Route path="javascript-api" element={<JsApi />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="accessibility" element={<Accessibility />} />
            <Route path="performance" element={<Performance />} />
            <Route path="react" element={<ReactApi />} />
            <Route path="*" element={<Navigate to="getting-started" replace />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
