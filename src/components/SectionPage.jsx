import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mainSections, getPatternsByCategory } from '../data/patterns';
import './SectionPage.css';

const SectionPage = ({ onBreadcrumbUpdate }) => {
  const { sectionId } = useParams();

  const section = mainSections.find(s => s.id === sectionId);
  const patternsByCategory = getPatternsByCategory(sectionId);

  useEffect(() => {
    if (section) {
      onBreadcrumbUpdate(section.title);
    }
  }, [section, onBreadcrumbUpdate]);

  if (!section) {
    return (
      <div className="section-page">
        <div className="loading">
          <h2>Section Not Found</h2>
          <p>The section "{sectionId}" could not be found.</p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-page">
      <div className="section-header" style={{ background: section.gradient }}>
        <div className="section-header-icon">{section.icon}</div>
        <h1 className="section-header-title">{section.title}</h1>
        <p className="section-header-description">{section.description}</p>
        <Link to="/" className="back-home-link">← Back to Home</Link>
      </div>

      <div className="section-content">
        {Object.keys(patternsByCategory).length === 0 ? (
          <div className="empty-state">
            <h2>Coming Soon</h2>
            <p>Topics for this section are currently being prepared.</p>
          </div>
        ) : (
          Object.entries(patternsByCategory).map(([category, patterns]) => (
            <div key={category} className="category-group">
              <h2 className="category-title">{category}</h2>
              <div className="topics-grid">
                {patterns.map((pattern) => (
                  <Link
                    key={pattern.id}
                    to={`/pattern/${pattern.id}`}
                    className="topic-card"
                  >
                    <div className="topic-icon">{pattern.icon}</div>
                    <h3 className="topic-title">{pattern.title}</h3>
                    <div className="topic-arrow">→</div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SectionPage;
