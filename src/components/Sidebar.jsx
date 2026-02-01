import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { patterns, mainSections, getPatternsByCategory } from '../data/patterns';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    'js-fundamentals': true,
    'design-patterns': true,
    'dsa': false,
    'system-design': false
  });
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null);

  // Determine active section based on current route
  React.useEffect(() => {
    // Check if we're on a pattern detail page
    const patternMatch = location.pathname.match(/^\/pattern\/(.+)$/);
    if (patternMatch) {
      const patternId = patternMatch[1];
      const pattern = patterns.find(p => p.id === patternId);
      if (pattern && pattern.section) {
        setActiveSection(pattern.section);
        setExpandedSections(prev => ({
          ...prev,
          [pattern.section]: true
        }));
      }
    }

    // Check if we're on a section page
    const sectionMatch = location.pathname.match(/^\/section\/(.+)$/);
    if (sectionMatch) {
      const sectionId = sectionMatch[1];
      setActiveSection(sectionId);
      setExpandedSections(prev => ({
        ...prev,
        [sectionId]: true
      }));
    }

    // Reset to show all sections on homepage
    if (location.pathname === '/') {
      setActiveSection(null);
    }
  }, [location.pathname]);

  const filteredPatterns = patterns.filter(pattern => {
    const searchLower = searchTerm.toLowerCase();
    return (
      pattern.title.toLowerCase().includes(searchLower) ||
      pattern.file.toLowerCase().includes(searchLower)
    );
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h1>JS Learning Hub</h1>
          <p className="subtitle">Comprehensive Guide</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            id="searchInput"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <nav className="nav-menu">
          <div className="nav-section">
            <Link
              to="/"
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="icon">🏠</span> Home
            </Link>
          </div>

          {/* Filter sections to only show active section */}
          {mainSections
            .filter(section => !activeSection || section.id === activeSection)
            .map(section => {
            const patternsByCategory = getPatternsByCategory(section.id);
            const sectionPatterns = filteredPatterns.filter(p => p.section === section.id);

            if (sectionPatterns.length === 0 && searchTerm) return null;

            const isExpanded = expandedSections[section.id];
            const hasPatterns = Object.keys(patternsByCategory).length > 0;

            return (
              <div className="nav-section" key={section.id}>
                <div
                  className="section-header-item"
                  onClick={() => toggleSection(section.id)}
                >
                  <span className="section-icon">{section.icon}</span>
                  <span className="section-name">{section.title}</span>
                  {hasPatterns && (
                    <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  )}
                </div>

                {isExpanded && hasPatterns && (
                  <div className="section-content">
                    {Object.entries(patternsByCategory).map(([category, categoryPatterns]) => {
                      const visiblePatterns = categoryPatterns.filter(p =>
                        filteredPatterns.some(fp => fp.id === p.id)
                      );

                      if (visiblePatterns.length === 0) return null;

                      return (
                        <div key={category} className="category-group">
                          <div className="category-title">{category}</div>
                          {visiblePatterns.map(pattern => (
                            <Link
                              key={pattern.id}
                              to={`/pattern/${pattern.id}`}
                              className={`nav-item ${location.pathname === `/pattern/${pattern.id}` ? 'active' : ''}`}
                              onClick={onClose}
                            >
                              <span className="icon">{pattern.icon}</span> {pattern.title}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}

                {isExpanded && !hasPatterns && (
                  <div className="section-content">
                    <p className="coming-soon">Coming Soon</p>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p>40+ JS Topics + 23 Design Patterns</p>
          <p className="version">v3.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
