
//لانشاء قناة معينة
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Hash, Camera, Settings, Globe, Lock, Users } from 'lucide-react';
import { generateId } from '@/lib/utils';

interface AddChannelModalProps {
  onClose: () => void;
  onAdd: (channel: any) => void;
}

export default function AddChannelModal({ onClose, onAdd }: AddChannelModalProps) {
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [channelAvatar, setChannelAvatar] = useState('/images/logo.png');
  const [channelType, setChannelType] = useState<'public' | 'private'>('public');
  const [channelLink, setChannelLink] = useState('');
  const [autoGenerateLink, setAutoGenerateLink] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (channelName.trim()) {
      const finalLink = autoGenerateLink 
        ? `t.me/${channelName.toLowerCase().replace(/\s+/g, '_')}`
        : channelLink.trim();
      
      const newChannel = {
        id: generateId(),
        name: channelName.trim(),
        description: channelDescription.trim(),
        avatarUrl: channelAvatar,
        type: channelType,
        link: finalLink,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user',
        subscriberCount: 0,
        isAdmin: true,
        unreadCount: 0,
        lastMessage: null,
        lastMessageTime: null,
        isVerified: false
      };
      onAdd(newChannel);
      onClose();
    }
  };

  const generateChannelLink = () => {
    if (channelName.trim()) {
      const link = `t.me/${channelName.toLowerCase().replace(/\s+/g, '_')}`;
      setChannelLink(link);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-primary">Create New Channel</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Channel Avatar */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <img
                src={channelAvatar}
                alt="Channel Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-border"
              />
              <button
                type="button"
                onClick={() => console.log('Change channel avatar clicked')}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                title="Change channel avatar"
              >
                <Camera size={16} className="text-white" />
              </button>
            </div>
            <p className="text-sm text-on-surface-variant">Channel Photo</p>
          </div>

          {/* Channel Name */}
          <div>
            <label htmlFor="channelName" className="block text-sm font-medium text-primary mb-2">
              Channel Name *
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" size={16} />
              <input
                id="channelName"
                type="text"
                value={channelName}
                onChange={(e) => {
                  setChannelName(e.target.value);
                  if (autoGenerateLink) {
                    generateChannelLink();
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                placeholder="Enter channel name"
                required
              />
            </div>
          </div>

          {/* Channel Description */}
          <div>
            <label htmlFor="channelDescription" className="block text-sm font-medium text-primary mb-2">
              Description
            </label>
            <textarea
              id="channelDescription"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
              placeholder="Describe your channel..."
            />
          </div>

          {/* Channel Type */}
          <div>
            <label className="block text-sm font-medium text-primary mb-3">
              Channel Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="channelType"
                  checked={channelType === 'public'}
                  onChange={() => setChannelType('public')}
                  className="w-4 h-4 text-primary focus:ring-primary/50"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <Globe size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface">Public Channel</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Anyone can find and join</p>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="channelType"
                  checked={channelType === 'private'}
                  onChange={() => setChannelType('private')}
                  className="w-4 h-4 text-primary focus:ring-primary/50"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <Lock size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface">Private Channel</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Invite link only</p>
                </div>
              </label>
            </div>
          </div>

          {/* Channel Link */}
          <div>
            <label htmlFor="channelLink" className="block text-sm font-medium text-primary mb-2">
              Channel Link
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoGenerate"
                  checked={autoGenerateLink}
                  onChange={(e) => {
                    setAutoGenerateLink(e.target.checked);
                    if (e.target.checked) {
                      generateChannelLink();
                    }
                  }}
                  className="w-4 h-4 text-primary focus:ring-primary/50"
                />
                <label htmlFor="autoGenerate" className="text-sm text-on-surface-variant">
                  Auto-generate from name
                </label>
              </div>
              
              <input
                id="channelLink"
                type="text"
                value={channelLink}
                onChange={(e) => setChannelLink(e.target.value)}
                disabled={autoGenerateLink}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="CSmessenger/channel_name"
              />
            </div>
          </div>

          {/* Channel Settings */}
          <div>
            <label className="block text-sm font-medium text-primary mb-3">
              Channel Settings
            </label>
            <div className="space-y-3 bg-surface/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings size={16} className="text-on-surface-variant" />
                  <div>
                    <p className="text-sm text-on-surface">Admin Rights</p>
                    <p className="text-xs text-on-surface-variant">Full control over channel</p>
                  </div>
                </div>
                <span className="text-xs text-success">Enabled</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users size={16} className="text-on-surface-variant" />
                  <div>
                    <p className="text-sm text-on-surface">Subscriber Count</p>
                    <p className="text-xs text-on-surface-variant">Show member count</p>
                  </div>
                </div>
                <span className="text-xs text-success">Enabled</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg text-on-surface hover:bg-surface/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Channel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
