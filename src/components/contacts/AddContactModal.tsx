'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, AtSign, Camera } from 'lucide-react';
import { Contact } from '@/types';
import { generateId } from '@/lib/utils';

interface AddContactModalProps {
  onClose: () => void;
  onAdd: (contact: Contact) => void;
}

export default function AddContactModal({ onClose, onAdd }: AddContactModalProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [mission, setMission] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() && username.trim()) {
      const newContact: Contact = {
        id: generateId(),
        name: name.trim(),
        username: username.trim(),
        avatarUrl: '/images/logo.png', // Default avatar
        isOnline: false,
        status: 'offline',
        bio: bio.trim() || undefined,
        mission: mission.trim() || undefined,
      };
      
      onAdd(newContact);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-surface border border-border rounded-lg w-full max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-on-surface">Add Contact</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-input rounded-full flex items-center justify-center">
                <User size={32} className="text-on-surface-variant" />
              </div>
              <button
                type="button"
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Camera size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              placeholder="Enter contact name"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-primary mb-2">
              Username
            </label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" size={16} />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-primary mb-2">
              Bio (Optional)
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
              placeholder="Enter bio"
            />
          </div>

          {/* Mission */}
          <div>
            <label htmlFor="mission" className="block text-sm font-medium text-primary mb-2">
              Mission (Optional)
            </label>
            <input
              id="mission"
              type="text"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              placeholder="Enter mission"
            />
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
              Add Contact
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
