import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '@proximate/css/dist/proximate.css';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Animations } from './pages/Animations';
import { DocsLayout, DocsIndex } from './pages/Docs';
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
            <Route path="getting-started" element={<DocsIndex />} />
            {/* Catch-all for other docs pages mapped to the same index for now */}
            <Route path="*" element={<DocsIndex />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
