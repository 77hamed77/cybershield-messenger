// Theme Enforcer Script
(function() {
  console.log('🎨 Theme Enforcer Loading...');
  
  // Apply dark theme by default
  function enforceTheme() {
    const html = document.documentElement;
    const body = document.body;
    
    // Force dark theme
    html.classList.remove('light');
    html.classList.add('dark');
    
    // Apply CSS variables
    const darkTheme = {
      '--bg-primary': '#161616',
      '--bg-secondary': '#054239',
      '--text-primary': '#ffffff',
      '--text-secondary': '#edebe0',
      '--primary': '#988561',
      '--accent': '#428177',
      '--border': '#428177',
      '--input': '#054239',
      '--card': '#054239',
      '--app-bar': 'rgba(42, 129, 119, 0.15)',
      '--shadow': 'rgba(0, 0, 0, 0.8)',
      '--overlay': 'rgba(0, 0, 0, 0.6)',
      '--color-error': '#6b1f2a',
      '--color-warning': '#FFA500',
      '--color-success': '#428177',
      '--color-info': '#2196F3'
    };
    
    // Apply variables to root
    Object.entries(darkTheme).forEach(([property, value]) => {
      html.style.setProperty(property, value);
    });
    
    // Apply colors to body
    body.style.backgroundColor = 'var(--bg-primary)';
    body.style.color = 'var(--text-primary)';
    
    // Apply colors to all elements with Tailwind classes
    const style = document.createElement('style');
    style.textContent = `
      .bg-background { background-color: var(--bg-primary) !important; }
      .bg-surface { background-color: var(--bg-secondary) !important; }
      .bg-primary { background-color: var(--primary) !important; }
      .bg-accent { background-color: var(--accent) !important; }
      .text-on-surface { color: var(--text-primary) !important; }
      .text-on-surface-variant { color: var(--text-secondary) !important; }
      .text-primary { color: var(--primary) !important; }
      .text-accent { color: var(--accent) !important; }
      .border-border { border-color: var(--border) !important; }
      .bg-input { background-color: var(--input) !important; }
      .bg-card { background-color: var(--card) !important; }
      .bg-app-bar { background-color: var(--app-bar) !important; }
      
      /* Force all backgrounds */
      div, section, article, main, aside, header, footer {
        background-color: var(--bg-primary) !important;
        color: var(--text-primary) !important;
      }
      
      /* Force all text */
      h1, h2, h3, h4, h5, h6, p, span, a {
        color: var(--text-primary) !important;
      }
      
      /* Force inputs */
      input, textarea, select {
        background-color: var(--input) !important;
        color: var(--text-primary) !important;
        border-color: var(--border) !important;
      }
      
      /* Force buttons */
      button {
        background-color: var(--accent) !important;
        color: var(--text-primary) !important;
        border-color: var(--border) !important;
      }
    `;
    
    document.head.appendChild(style);
    
    console.log('🎨 Dark theme enforced!');
  }
  
  // Apply immediately
  enforceTheme();
  
  // Also apply on DOM content loaded
  if (document.readyState ===<｜tool▁call▁begin｜>n-7 loading) {
    document.addEventListener('DOMContentLoaded', enforceTheme);
  }
  
  // And apply every 2 seconds to ensure it stays
  setInterval(enforceTheme, 2000);
  
  console.log('🎨 Theme Enforcer Active!');
})();
