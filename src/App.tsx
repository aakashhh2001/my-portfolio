import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import './App.css';

// Implementing Lazy Loading for optimal performance
// Note: Handling both named exports (Home, About) and default exports (Blog)
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Skills = lazy(() => import('./pages/Skills').then(module => ({ default: module.Skills })));
const Projects = lazy(() => import('./pages/Projects').then(module => ({ default: module.Projects })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));

// These were exported as default in your original imports
const Blog = lazy(() => import('./pages/Blog'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));

// Cyber Terminal Loading Fallback
const PageLoader = () => (
  <div className="flex h-[80vh] w-full items-center justify-center text-[#00FF41] bg-[#000000]">
    <div className="flex items-center space-x-2">
      <span className="text-xl font-mono">Loading system modules</span>
      <span className="terminal-cursor text-xl"></span>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#000000] text-neutral-200 font-sans">
        <Navbar />
        <main className="pt-16">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;