'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FolderPlus, Palette, Hash } from 'lucide-react';

interface AddFolderModalProps {
  onClose: () => void;
  onAdd: (folder: { id: string; name: string; color: string; icon: string }) => void;
}

const FOLDER_COLORS = [
  { name: 'Blue', value: '#3B82F6', bg: '#EFF6FF' },
  { name: 'Green', value: '#10B981', bg: '#ECFDF5' },
  { name: 'Purple', value: '#8B5CF6', bg: '#F3F4F6' },
  { name: 'Orange', value: '#F59E0B', bg: '#FFFBEB' },
  { name: 'Red', value: '#EF4444', bg: '#FEF2F2' },
  { name: 'Teal', value: '#06B6D4', bg: '#ECFEFF' },
  { name: 'Pink', value: '#EC4899', bg: '#FDF2F8' },
  { name: 'Indigo', value: '#6366F1', bg: '#F0F4FF' }
];

const FOLDER_ICONS = [
  '🏢', '👥', '🤖', '💼', '⭐', '🔒', '📊', '🎯',
  '📁', '📋', '💬', '📞', '📷', '🎵', '📚', '⚙️'
];

export default function AddFolderModal({ onClose, onAdd }: AddFolderModalProps) {
  const [folderName, setFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState(FOLDER_COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState('📁');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (folderName.trim()) {
      onAdd({
        id: Date.now().toString(),
        name: folderName.trim(),
        color: selectedColor.value,
        icon: selectedIcon
      });
      
      setFolderName('');
      setSelectedColor(FOLDER_COLORS[0]);
      setSelectedIcon('📁');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                   style={{ backgroundColor: selectedColor.bg }}>
                <span className="text-2xl">{selectedIcon}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-on-surface">New Folder</h2>
                <p className="text-sm text-on-surface-variant">Create a custom folder</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors"
            >
              <X size={20} className="text-on-surface-variant" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
            {/* Folder Name */}
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">
                Folder Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl">
                  {selectedIcon}
                </span>
                <input
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="Enter folder name..."
                  className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  autoFocus
                  maxLength={25}
                />
              </div>
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-on-surface mb-3">
                Icon
              </label>
              <div className="grid grid-cols-8 gap-2">
                {FOLDER_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`p-2 rounded-lg text-2xl transition-all duration-200 ${
                      selectedIcon === icon
                        ? 'bg-primary/20 border-2 border-primary'
                        : 'bg-surface-variant/50 border-2 border-transparent hover:bg-primary/10'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-on-surface mb-3">
                Color
              </label>
              <div className="grid grid-cols-4 gap-3">
                {FOLDER_COLORS.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`p-3 rounded-lg transition-all duration-200 border-2 ${
                      selectedColor.name === color.name
                        ? 'border-primary scale-105'
                        : 'border-transparent hover:border-primary/30'
                    }`}
                    style={{ backgroundColor: color.bg }}
                  >
                    <div
                      className="w-6 h-6 rounded-full mx-auto"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-xs text-on-surface-variant mt-1 block">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-surface-variant/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: selectedColor.bg }}
                >
                  <span className="text-2xl">{selectedIcon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-on-surface">
                    {folderName || 'Folder Name'}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Custom folder • 0 chats
                  </p>
                </div>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedColor.value }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-surface-variant text-on-surface-variant rounded-lg font-medium hover:bg-surface-variant/80 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!folderName.trim()}
                className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: selectedColor.value }}
              >
                Create Folder
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
