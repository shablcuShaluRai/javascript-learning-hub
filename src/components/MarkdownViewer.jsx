import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';
import { patterns } from '../data/patterns';
import './MarkdownViewer.css';

const MarkdownViewer = ({ file, onBreadcrumbUpdate }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  // Convert markdown file path to React Router path
  const convertFilePathToRoute = useCallback((filePath) => {
    // Split off any hash anchor
    const [pathPart, hashPart] = filePath.split('#');

    // Clean the path - remove ./ and resolve ../
    let cleanPath = pathPart.replace(/^\.\//, '');

    // Handle ../ by resolving relative to current file
    if (cleanPath.startsWith('../')) {
      const currentDir = file.substring(0, file.lastIndexOf('/'));
      cleanPath = cleanPath.replace(/^\.\.\//, '');
    }

    // Find pattern by file path
    const pattern = patterns.find(p => p.file === cleanPath);

    if (pattern) {
      let route = pattern.id === 'overview' ? '/' : `/pattern/${pattern.id}`;

      // Add hash if present
      if (hashPart) {
        route += `#${hashPart}`;
      }

      return route;
    }

    return null;
  }, [file]);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/content/${file}`);

        if (!response.ok) {
          throw new Error(`File not found: /content/${file} (${response.status})`);
        }

        const text = await response.text();
        setContent(text);

        // Update breadcrumb
        if (onBreadcrumbUpdate) {
          updateBreadcrumb(file);
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setLoading(false);
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (file) {
      loadMarkdown();
    }
  }, [file]);

  // Handle anchor link clicks for table of contents AND internal markdown links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target;

      // Check if clicked element is an anchor link
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');

        if (!href) return;

        // Handle internal markdown file links (e.g., ./creational/singleton.md)
        if (href.endsWith('.md') || href.includes('.md#')) {
          e.preventDefault();

          const route = convertFilePathToRoute(href);

          if (route) {
            // Check if route has hash
            if (route.includes('#')) {
              const [path, hash] = route.split('#');
              navigate(path);

              // Scroll to hash after navigation
              setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - 80;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }, 300);
            } else {
              navigate(route);
            }
          }
          return;
        }

        // Handle anchor links for table of contents (e.g., #section-name)
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.slice(1);

          // Small delay to ensure DOM is ready
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              // Get the element's position
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - 80; // 80px offset for header

              // Smooth scroll to the element
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });

              // Update URL hash without scrolling
              history.replaceState(null, null, `#${targetId}`);
            }
          }, 100);
        }
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('click', handleAnchorClick);
      return () => contentElement.removeEventListener('click', handleAnchorClick);
    }
  }, [content, navigate, convertFilePathToRoute]);

  // Scroll to hash on load
  useEffect(() => {
    if (!loading && window.location.hash) {
      const targetId = window.location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200);
    }
  }, [loading, content]);

  const updateBreadcrumb = (file) => {
    let breadcrumbText = 'Home';

    if (file !== 'README.md') {
      const parts = file.split('/');
      if (parts.length === 2) {
        const category = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        const pattern = parts[1]
          .replace('.md', '')
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        breadcrumbText = `${category} / ${pattern}`;
      }
    }

    if (onBreadcrumbUpdate) {
      onBreadcrumbUpdate(breadcrumbText);
    }
  };

  // Copy code functionality
  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Custom code block component with copy button
  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const [copied, setCopied] = useState(false);
    const codeString = String(children).replace(/\n$/, '');

    const handleCopy = async () => {
      await handleCopyCode(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
      return <code className={className} {...props}>{children}</code>;
    }

    return (
      <div className="code-block-wrapper">
        <button className="copy-button" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="loading">
        <h2>Error Loading Content</h2>
        <p>Could not load {file}</p>
        <p style={{ color: 'var(--danger)' }}>{error}</p>
        <p style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
          Check the browser console for more details.
        </p>
      </div>
    );
  }

  if (!content) {
    return <div className="loading">No content available</div>;
  }

  return (
    <div ref={contentRef} className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight, rehypeRaw]}
        components={{
          code: CodeBlock
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
