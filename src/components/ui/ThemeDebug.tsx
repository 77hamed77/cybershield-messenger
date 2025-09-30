'use client';

import { useEffect, useState } from 'react';

export default function ThemeDebug() {
  const [theme, setTheme] = useState('dark');
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    const updateThemeInfo = () => {
      const root = document.documentElement;
      const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
      const bgColor = getComputedStyle(root).getPropertyValue('--bg-primary');
      const textColor = getComputedStyle(root).getPropertyValue('--text-primary');
      
      setTheme(currentTheme);
      setBgColor(bgColor);
      setTextColor(textColor);
    };

    updateThemeInfo();
    
    // Update every second to see changes
    const interval = setInterval(updateThemeInfo, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '10px',
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      color: 'var(--text-primary)',
      fontSize: '12px',
      zIndex: 9999,
      minWidth: '200px'
    }}>
      <div><strong>Theme Debug:</strong></div>
      <div>Current Theme: {theme}</div>
      <div>BG Color: {bgColor}</div>
      <div>Text Color: {textColor}</div>
      <div>CSS Variables:</div>
      <div>- Primary: {getComputedStyle(document.documentElement).getPropertyValue('--primary')}</div>
      <div>- Accent: {getComputedStyle(document.documentElement).getPropertyValue('--accent')}</div>
      <div>- Border: {getComputedStyle(document.documentElement).getPropertyValue('--border')}</div>
    </div>
  );
}
