// Types for CyberShield Messenger Web

export interface Contact {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  isOnline: boolean;
  status: string;
  bio?: string;
  mission?: string;
  phone?: string;
}

export interface ChatItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  avatarUrl: string;
  unreadCount: number;
  pinned: boolean;
  isRead: boolean;
  isMuted: boolean;
  isArchived: boolean;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  content: string;
  isSentByMe: boolean;
  time: string;
  isRead: boolean;
  type: MessageType;
  chatId: string;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  AUDIO = 'audio',
  VIDEO = 'video'
}

export interface Call {
  id: string;
  name: string;
  avatarUrl: string;
  type: CallType;
  time: string;
  duration?: string;
}

export enum CallType {
  OUTGOING = 'outgoing',
  INCOMING = 'incoming',
  MISSED = 'missed'
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  status: string;
  bio: string;
  mission: string;
}

export interface SettingsOption {
  id: string;
  icon: string;
  label: string;
  color: string;
  route?: string;
}

export interface Tab {
  id: string;
  label: string;
  active: boolean;
  badge?: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

// <<< بداية الإضافة: هذا هو النوع الجديد الذي يحتاجه المشروع
export interface ThemeSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: string;
}
// <<< نهاية الإضافة