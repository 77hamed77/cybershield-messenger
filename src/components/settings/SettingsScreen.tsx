'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Edit, 
  Users, 
  Plus, 
  Bookmark, 
  Phone, 
  Globe, 
  Bell, 
  Lock, 
  HardDrive, 
  Palette,
  ChevronRight,
  Hash
} from 'lucide-react';
import AddGroupModal from '@/components/groups/AddGroupModal';
import AddChannelModal from '@/components/channels/AddChannelModal';
import Image from 'next/image';
import SettingsOption from './SettingsOption';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ThemeDebug from '@/components/ui/ThemeDebug';
import { useLanguage } from '@/components/LanguageProvider';

export default function SettingsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // إنشاء قائمة الإعدادات مع الترجمة
  const getSettingsOptions = () => [
    {
      id: 'saved-messages',
      icon: Bookmark,
      label: t('settings.savedMessages'),
      description: t('settings.savedMessagesDescription'),
      color: '#2196F3',
      route: '/saved-messages'
    },
    {
      id: 'recent-calls',
      icon: Phone,
      label: t('settings.recentCalls'),
      description: t('settings.recentCallsDescription'),
      color: '#4CAF50',
      route: '/recent-calls'
    },
    {
      id: 'language',
      icon: Globe,
      label: t('settings.language'),
      description: t('settings.languageDescription'),
      color: '#FF9800',
      route: '/language'
    },
    {
      id: 'notifications',
      icon: Bell,
      label: t('settings.notifications'),
      description: t('settings.notificationsDescription'),
      color: '#9C27B0',
      route: '/notifications'
    },
    {
      id: 'privacy',
      icon: Lock,
      label: t('settings.privacy'),
      description: t('settings.privacyDescription'),
      color: '#F44336',
      route: '/privacy'
    },
    {
      id: 'storage',
      icon: HardDrive,
      label: t('settings.storage'),
      description: t('settings.storageDescription'),
      color: '#607D8B',
      route: '/storage'
    },
    {
      id: 'appearance',
      icon: Palette,
      label: t('settings.appearance'),
      description: t('settings.appearanceDescription'),
      color: '#E91E63',
      route: '/appearance'
    },
    {
      id: 'edit-profile',
      icon: Edit,
      label: t('settings.editProfile'),
      description: t('settings.editProfile'),
      color: '#795548',
      route: '/edit-profile'
    },
  ];

  const settingsOptions = getSettingsOptions();
  const filteredOptions = settingsOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddGroup = (_group: { name: string; description: string; avatar?: string }) => {
    // Handle new group creation
    // Here you would typically save the group to your state or API
  };

  const handleAddChannel = (_channel: { name: string; description: string; avatar?: string }) => {
    // Handle new channel creation
    // Here you would typically save the channel to your state or API
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="h-full flex flex-col bg-background relative" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      {/* Top Decorative Pattern */}
      <div
        className="absolute top-0 left-0 right-0 h-24 opacity-[0.06] z-0"
        style={{
          backgroundImage: 'url(/images/pattern2.png)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: '250px 250px',
          backgroundPosition: 'top center',
        }}
      />
      
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 sm:px-6 py-3 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                <Image
                  src="/images/logox.svg"
                  alt="CyberShield"
                  width={24}
                  height={24}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent professional-heading">
                  {t('settings.title')}
                </h1>
                <p className="text-xs text-on-surface-variant professional-subheading">
                  {t('settings.subtitle')}
                </p>
              </div>
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle size="md" showLabel={false} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" size={20} />
            <input
              type="text"
              placeholder={t('app.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 professional-input rounded-2xl text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          {/* Profile Section */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="m-4 p-4 bg-surface border border-border rounded-lg"
        >
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:bg-surface/50 rounded-lg p-3 transition-colors"
            onClick={() => router.push('/main/settings/edit-profile')}
          >
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Edit size={10} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-primary">  أبو قحطان   </h2>
              <p className="text-sm text-on-surface-variant">@abo_qahtan</p>
            </div>
            <ChevronRight size={20} className="text-on-surface-variant" />
          </div>
        </motion.div>

        {/* Groups Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mx-4 mb-4 p-4 bg-surface border border-border rounded-lg"
        >
          <div className="space-y-1">
            <div className="flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users size={16} className="text-blue-500" />
              </div>
              <span className="text-primary professional-body">{t('settings.groups')}</span>
            </div>
            
            <div className="border-t border-border my-2"></div>
            
            <button 
              onClick={() => setShowAddGroupModal(true)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors cursor-pointer text-left"
            >
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Plus size={16} className="text-green-500" />
              </div>
              <span className="text-primary professional-body">{t('settings.addGroup')}</span>
            </button>
            
            <div className="border-t border-border my-2"></div>
            
            <button 
              onClick={() => setShowAddChannelModal(true)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors cursor-pointer text-left"
            >
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Hash size={16} className="text-purple-500" />
              </div>
              <span className="text-primary professional-body">{t('settings.addChannel')}</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Access Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mx-4 mb-4 professional-card"
        >
          <h3 className="text-sm font-medium text-on-surface-variant mb-3 professional-subheading">
            {t('settings.quickAccess')}
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/main/settings/saved-messages')}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors text-left professional-nav-item"
            >
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Bookmark size={16} className="text-yellow-500" />
              </div>
              <div className="flex-1">
                <span className="text-on-surface font-medium">{t('settings.savedMessages')}</span>
                <p className="text-xs text-on-surface-variant professional-body">{t('settings.savedMessagesDescription')}</p>
              </div>
              <ChevronRight size={16} className="text-on-surface-variant" />
            </button>
            
            <button
              onClick={() => router.push('/main/settings/language')}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors text-left professional-nav-item"
            >
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Globe size={16} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <span className="text-on-surface font-medium">{t('settings.language')}</span>
                <p className="text-xs text-on-surface-variant professional-body">{t('settings.languageDescription')}</p>
              </div>
              <ChevronRight size={16} className="text-on-surface-variant" />
            </button>
          </div>
        </motion.div>

        {/* Settings Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mx-4 space-y-1"
        >
          {filteredOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            >
              <SettingsOption option={option} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredOptions.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center px-8">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
              <Search className="text-on-surface-variant" size={32} />
            </div>
            <h3 className="text-lg font-medium text-on-surface mb-2 professional-heading">{t('loading.noResults')}</h3>
            <p className="text-on-surface-variant text-sm professional-body">
              {t('loading.tryDifferentKeywords')}
            </p>
          </div>
        )}
        </div>
      </div>

      {/* Modals */}
      {showAddGroupModal && (
        <AddGroupModal
          onClose={() => setShowAddGroupModal(false)}
          onAdd={handleAddGroup}
        />
      )}

      {showAddChannelModal && (
        <AddChannelModal
          onClose={() => setShowAddChannelModal(false)}
          onAdd={handleAddChannel}
        />
      )}

      {/* Theme Debug Info - Only in development and when enabled */}
      {process.env.NODE_ENV === 'development' && (
        <ThemeDebug />
      )}
    </div>
  );
}
