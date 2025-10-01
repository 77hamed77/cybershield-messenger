// Theme Enforcer Script - Hydration Safe
(function() {
  // Wait for DOM to be ready to avoid hydration mismatch
  function initTheme() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTheme);
      return;
    }
    
    // Only apply theme changes if different from current
    const savedTheme = localStorage.getItem('app-theme-current') || 'dark';
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    
    // Only change if theme is different
    if (savedTheme !== currentTheme) {
      html.classList.remove('light', 'dark');
      html.classList.add(savedTheme);
      console.log('🎨 Theme changed to:', savedTheme);
    }
  }
  
  // Initialize theme after hydration
  setTimeout(initTheme, 100);
  
  // Apply theme changes when storage changes
  window.addEventListener('storage', (e) => {
    if (e.key === 'app-theme-current') {
      initTheme();
    }
  });
  
  console.log('🎨 Theme Enforcer Ready!');
})();