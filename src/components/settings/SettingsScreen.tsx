'use client'; // <<< هذا هو السطر الوحيد الذي تمت إضافته

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Edit, 
  User, 
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
  Settings,
  MessageSquare,
  Hash,
  Shield,
  Heart
} from 'lucide-react';
import AddGroupModal from '@/components/groups/AddGroupModal';
import AddChannelModal from '@/components/channels/AddChannelModal';
import Image from 'next/image';
import { SETTINGS_OPTIONS } from '@/lib/constants';
import SettingsOption from './SettingsOption';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ThemeDebug from '@/components/ui/ThemeDebug';

export default function SettingsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const router = useRouter();

  const filteredOptions = SETTINGS_OPTIONS.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddGroup = (group: any) => {
    console.log('New group created:', group);
    // Here you would typically save the group to your state or API
  };

  const handleAddChannel = (channel: any) => {
    console.log('New channel created:', channel);
    // Here you would typically save the channel to your state or API
  };

  return (
    <div className="h-full flex flex-col bg-background" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/logo.png"
                  alt="CyberShield"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Settings</h1>
                <p className="text-xs text-on-surface-variant">App preferences</p>
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
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-2xl text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
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
              <h2 className="font-semibold text-primary">الدولة الغميجة أبو قحطان المفدى  </h2>
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
              <span className="text-primary">  ate(' مهندس انظمة ونابغة قد الدنيا، يتخلى عن الدولة والدولة ما تتخلى عنه (صاحب حصانة كاملة حتى الجولاني ما يقدرله) </span>
            </div>
            
            <div className="border-t border-border my-2"></div>
            
            <button 
              onClick={() => setShowAddGroupModal(true)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors cursor-pointer text-left"
            >
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Plus size={16} className="text-green-500" />
              </div>
              <span className="text-primary">Add Group</span>
            </button>
            
            <div className="border-t border-border my-2"></div>
            
            <button 
              onClick={() => setShowAddChannelModal(true)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors cursor-pointer text-left"
            >
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Hash size={16} className="text-purple-500" />
              </div>
              <span className="text-primary">Add Channels</span>
            </button>
          </div>
        </motion.div>

        {/* Settings Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mx-4 space-y-1"
        >
          {filteredOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
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
            <h3 className="text-lg font-medium text-on-surface mb-2">No settings found</h3>
            <p className="text-on-surface-variant text-sm">
              Try adjusting your search terms
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

      {/* Theme Debug Info */}
      <ThemeDebug />
    </div>
  );
}