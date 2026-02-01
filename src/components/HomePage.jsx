import React from 'react';
import { Link } from 'react-router-dom';
import { mainSections } from '../data/patterns';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero">
        <h1>📚 JavaScript Learning Hub</h1>
        <p>Your comprehensive guide to master JavaScript, from fundamentals to advanced concepts</p>
      </div>

      <div className="homepage-content">
        {/* Main 4 Sections */}
        <section className="main-sections">
          {mainSections.map((section) => (
            <Link
              key={section.id}
              to={`/section/${section.id}`}
              className="section-card"
              style={{ background: section.gradient }}
            >
              <div className="section-icon">{section.icon}</div>
              <h2 className="section-title">{section.title}</h2>
              <p className="section-description">{section.description}</p>
              <div className="section-arrow">→</div>
            </Link>
          ))}
        </section>

        {/* Quick Stats */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-number">40+</div>
            <div className="stat-label">JavaScript Topics</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">23</div>
            <div className="stat-label">Design Patterns</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">Coming Soon</div>
            <div className="stat-label">DSA Topics</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">Coming Soon</div>
            <div className="stat-label">System Design</div>
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <h2>Why Choose This Platform?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <h3>Comprehensive Content</h3>
              <p>From basics to advanced topics with real-world examples</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💻</div>
              <h3>Interactive Code</h3>
              <p>Syntax highlighted examples with copy-to-clipboard</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Interview Ready</h3>
              <p>Practice questions and answers for interview prep</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Learn anywhere on any device</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
