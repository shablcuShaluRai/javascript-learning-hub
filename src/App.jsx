import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MarkdownViewer from './components/MarkdownViewer';
import HomePage from './components/HomePage';
import SectionPage from './components/SectionPage';
import { patterns } from './data/patterns';
import './App.css';

const ContentArea = ({ onBreadcrumbUpdate }) => {
  const { id } = useParams();

  // Update breadcrumb to "Home" when on homepage
  useEffect(() => {
    if (!id) {
      onBreadcrumbUpdate('Home');
    }
  }, [id, onBreadcrumbUpdate]);

  // Determine which file to load
  const file = id
    ? patterns.find(p => p.id === id)?.file
    : null;

  if (id && !file) {
    return (
      <article>
        <div className="loading">
          <h2>Pattern Not Found</h2>
          <p>The pattern "{id}" could not be found.</p>
        </div>
      </article>
    );
  }

  // Show HomePage component when no id
  if (!id) {
    return <HomePage />;
  }

  return (
    <article>
      <MarkdownViewer file={file} onBreadcrumbUpdate={onBreadcrumbUpdate} />
    </article>
  );
};

function App() {
  // Sidebar open by default on desktop, closed on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [breadcrumb, setBreadcrumb] = useState('Home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleBreadcrumbUpdate = useCallback((newBreadcrumb) => {
    setBreadcrumb(newBreadcrumb);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <AppContent
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        breadcrumb={breadcrumb}
        handleBreadcrumbUpdate={handleBreadcrumbUpdate}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />
    </Router>
  );
}

function AppContent({ isSidebarOpen, setIsSidebarOpen, breadcrumb, handleBreadcrumbUpdate, showScrollTop, scrollToTop }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Handle breadcrumb click to open sidebar
  const handleBreadcrumbClick = () => {
    setIsSidebarOpen(true);
  };

  // Render breadcrumb with clickable parts
  const renderBreadcrumb = () => {
    if (breadcrumb.includes(' / ')) {
      const parts = breadcrumb.split(' / ');
      return (
        <div className="breadcrumb">
          <span
            className="breadcrumb-category"
            onClick={handleBreadcrumbClick}
          >
            {parts[0]}
          </span>
          <span> / </span>
          <span className="breadcrumb-current">{parts[1]}</span>
        </div>
      );
    }
    return <div className="breadcrumb">{breadcrumb}</div>;
  };

  return (
    <div className="container">
      {!isHomePage && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}

      <main className={`main-content ${isHomePage ? 'full-width' : ''} ${!isSidebarOpen && !isHomePage ? 'sidebar-collapsed' : ''}`}>
        {!isHomePage && (
          <div className="content-header">
            <button
              className="menu-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>
            {renderBreadcrumb()}
          </div>
        )}

        <Routes>
          <Route path="/" element={<ContentArea onBreadcrumbUpdate={handleBreadcrumbUpdate} />} />
          <Route path="/section/:sectionId" element={<SectionPage onBreadcrumbUpdate={handleBreadcrumbUpdate} />} />
          <Route path="/pattern/:id" element={<ContentArea onBreadcrumbUpdate={handleBreadcrumbUpdate} />} />
        </Routes>

        <div
          className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
          onClick={scrollToTop}
        >
          ↑
        </div>
      </main>
    </div>
  );
}

export default App;
