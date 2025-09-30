// Constants for CyberShield Messenger Web

// Color palette from the provided color file
export const COLOR_PALETTE = {
  // Forest colors (Dark theme primary)
  forest: {
    primary: '#428177',
    secondary: '#054239',
    tertiary: '#002623'
  },
  // Golden Wheat colors (Light theme primary)
  golden: {
    primary: '#988561',
    secondary: '#b9a779',
    tertiary: '#edebe0'
  },
  // Deep Umber colors (Dark theme accents)
  umber: {
    primary: '#6b1f2a',
    secondary: '#4a151e',
    tertiary: '#260f14'
  },
  // Charcoal colors (Neutral tones)
  charcoal: {
    white: '#ffffff',
    light: '#3d3a3b',
    dark: '#161616'
  }
} as const;

export const THEMES = {
  dark: {
    name: 'dark',
    displayName: 'Dark Mode',
    colors: {
      // Primary colors
      primary: COLOR_PALETTE.golden.primary,
      primaryVariant: COLOR_PALETTE.golden.secondary,
      
      // Background colors
      background: COLOR_PALETTE.charcoal.dark,
      surface: COLOR_PALETTE.forest.secondary,
      surfaceVariant: COLOR_PALETTE.forest.primary,
      
      // Text colors
      onBackground: COLOR_PALETTE.charcoal.white,
      onSurface: COLOR_PALETTE.charcoal.white,
      onSurfaceVariant: COLOR_PALETTE.golden.tertiary,
      onPrimary: COLOR_PALETTE.charcoal.dark,
      
      // Accent colors
      accent: COLOR_PALETTE.forest.primary,
      error: COLOR_PALETTE.umber.primary,
      warning: '#FFA500',
      success: COLOR_PALETTE.forest.primary,
      info: '#2196F3',
      
      // UI elements
      border: COLOR_PALETTE.forest.primary,
      input: COLOR_PALETTE.forest.secondary,
      card: COLOR_PALETTE.forest.secondary,
      appBar: `rgba(42, 129, 119, 0.15)`,
      bottomNav: `rgba(152, 133, 97, 0.15)`,
      
      // Shadows and overlays
      shadow: 'rgba(0, 0, 0, 0.8)',
      overlay: 'rgba(0, 0, 0, 0.6)',
      
      // Status colors
      online: COLOR_PALETTE.forest.primary,
      offline: COLOR_PALETTE.charcoal.light,
      away: '#FFA500',
      busy: COLOR_PALETTE.umber.primary
    }
  },
  light: {
    name: 'light',
    displayName: 'Light Mode',
    colors: {
      // Primary colors
      primary: COLOR_PALETTE.forest.primary,
      primaryVariant: COLOR_PALETTE.forest.secondary,
      
      // Background colors
      background: COLOR_PALETTE.golden.tertiary,
      surface: COLOR_PALETTE.charcoal.white,
      surfaceVariant: COLOR_PALETTE.golden.secondary,
      
      // Text colors
      onBackground: COLOR_PALETTE.charcoal.dark,
      onSurface: COLOR_PALETTE.charcoal.dark,
      onSurfaceVariant: COLOR_PALETTE.forest.secondary,
      onPrimary: COLOR_PALETTE.charcoal.white,
      
      // Accent colors
      accent: COLOR_PALETTE.golden.primary,
      error: COLOR_PALETTE.umber.primary,
      warning: '#FFA500',
      success: COLOR_PALETTE.forest.primary,
      info: '#2196F3',
      
      // UI elements
      border: COLOR_PALETTE.golden.secondary,
      input: COLOR_PALETTE.charcoal.white,
      card: COLOR_PALETTE.charcoal.white,
      appBar: `rgba(237, 235, 224, 0.8)`,
      bottomNav: `rgba(185, 167, 121, 0.15)`,
      
      // Shadows and overlays
      shadow: 'rgba(0, 0, 0, 0.1)',
      overlay: 'rgba(0, 0, 0, 0.3)',
      
      // Status colors
      online: COLOR_PALETTE.forest.primary,
      offline: COLOR_PALETTE.charcoal.light,
      away: '#FFA500',
      busy: COLOR_PALETTE.umber.primary
    }
  }
} as const;

// Legacy colors for backward compatibility
export const COLORS = THEMES.dark.colors;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

export const NAVIGATION_ITEMS = [
  {
    id: 'chats',
    label: 'Chats',
    icon: 'MessageCircle',
    route: '/chats'
  },
  {
    id: 'calls',
    label: 'Calls',
    icon: 'Phone',
    route: '/calls'
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: 'Users',
    route: '/contacts'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    route: '/settings'
  }
] as const;

export const SETTINGS_OPTIONS = [
  {
    id: 'saved-messages',
    icon: 'Bookmark',
    label: 'Saved Messages',
    description: 'View and manage your saved messages',
    color: '#2196F3',
    route: '/saved-messages'
  },
  {
    id: 'recent-calls',
    icon: 'Phone',
    label: 'Recent Calls',
    description: 'View call history and manage calls',
    color: '#4CAF50',
    route: '/recent-calls'
  },
  {
    id: 'language',
    icon: 'Globe',
    label: 'Language',
    description: 'Change app language and region',
    color: '#FF9800',
    route: '/language'
  },
  {
    id: 'notifications',
    icon: 'Bell',
    label: 'Notifications and Sounds',
    description: 'Configure notification preferences',
    color: '#F44336',
    route: '/notifications'
  },
  {
    id: 'privacy',
    icon: 'Lock',
    label: 'Privacy and Security',
    description: 'Manage privacy settings and security',
    color: '#9E9E9E',
    route: '/privacy'
  },
  {
    id: 'storage',
    icon: 'HardDrive',
    label: 'Data and Storage',
    description: 'Manage app data and storage usage',
    color: '#607D8B',
    route: '/storage'
  },
  {
    id: 'appearance',
    icon: 'Palette',
    label: 'Appearance',
    description: 'Customize theme and visual settings',
    color: '#9C27B0',
    route: '/appearance'
  }
] as const;

export const CHAT_TABS = [
  { id: 'all', label: 'All Chats', active: true },
  { id: 'work', label: 'Work', badge: 2, active: false },
  { id: 'bots', label: 'Bots', badge: 2, active: false }
] as const;

export const CALL_TABS = [
  { id: 'all', label: 'All', active: true },
  { id: 'missed', label: 'Missed', active: false }
] as const;

export const APP_INFO = {
  name: 'CyberShield Messenger',
  description: 'منصة الاتصالات الآمنة لفريق الأمن السيبراني الذكي',
  version: '1.0.0'
} as const;
