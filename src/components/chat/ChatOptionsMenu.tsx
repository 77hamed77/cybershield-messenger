'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Pin, 
  PinOff, 
  Archive, 
  ArchiveRestore, 
  VolumeX, 
  Volume2, 
  Trash2, 
  Share2, 
  Copy, 
  Star, 
  StarOff,
  Download,
  Ban,
  AlertTriangle,
  Search,
  Edit,
  MoreHorizontal,
  Clock,
  Shield,
  Eye,
  EyeOff,
  MessageSquare,
  Phone,
  Video
} from 'lucide-react';

interface ChatOptionsMenuProps {
  chat: {
    id: string;
    title: string;
    isPinned: boolean;
    isArchived: boolean;
    isMuted: boolean;
    isStarred: boolean;
  };
  onPin: () => void;
  onArchive: () => void;
  onMute: () => void;
  onStar: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function ChatOptionsMenu({ 
  chat, 
  onPin, 
  onArchive, 
  onMute, 
  onStar,
  onDelete, 
  onClose 
}: ChatOptionsMenuProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background border border-border rounded-lg w-full max-w-sm max-h-[80vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-primary">Chat Options</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <MoreHorizontal size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Chat Info */}
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-on-surface mb-1">{chat.title}</h3>
          <p className="text-sm text-on-surface-variant">Chat options and settings</p>
        </div>

        {/* Options */}
        <div className="p-2">
          {/* Pin/Unpin */}
          <button
            onClick={onPin}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            {chat.isPinned ? (
              <PinOff size={20} className="text-on-surface-variant" />
            ) : (
              <Pin size={20} className="text-on-surface-variant" />
            )}
            <span className="text-on-surface">
              {chat.isPinned ? 'Unpin Chat' : 'Pin Chat'}
            </span>
          </button>

          {/* Star/Unstar */}
          <button
            onClick={onStar}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            {chat.isStarred ? (
              <StarOff size={20} className="text-yellow-500" />
            ) : (
              <Star size={20} className="text-on-surface-variant" />
            )}
            <span className="text-on-surface">
              {chat.isStarred ? 'Remove from Starred' : 'Star Chat'}
            </span>
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={onMute}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            {chat.isMuted ? (
              <Volume2 size={20} className="text-on-surface-variant" />
            ) : (
              <VolumeX size={20} className="text-on-surface-variant" />
            )}
            <span className="text-on-surface">
              {chat.isMuted ? 'Unmute Notifications' : 'Mute Notifications'}
            </span>
          </button>

          {/* Archive/Unarchive */}
          <button
            onClick={onArchive}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            {chat.isArchived ? (
              <ArchiveRestore size={20} className="text-on-surface-variant" />
            ) : (
              <Archive size={20} className="text-on-surface-variant" />
            )}
            <span className="text-on-surface">
              {chat.isArchived ? 'Unarchive Chat' : 'Archive Chat'}
            </span>
          </button>

          {/* Divider */}
          <div className="border-t border-border my-2"></div>

          {/* Share Chat */}
          <button
            onClick={() => console.log('Share chat clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Share2 size={20} className="text-on-surface-variant" />
            <span className="text-on-surface">Share Chat</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={() => console.log('Copy link clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Copy size={20} className="text-on-surface-variant" />
            <span className="text-on-surface">Copy Chat Link</span>
          </button>

          {/* Search Messages */}
          <button
            onClick={() => console.log('Search messages clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Search size={20} className="text-on-surface-variant" />
            <span className="text-on-surface">Search Messages</span>
          </button>

          {/* Edit Chat */}
          <button
            onClick={() => console.log('Edit chat clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Edit size={20} className="text-on-surface-variant" />
            <span className="text-on-surface">Edit Chat Info</span>
          </button>

          {/* Download Chat */}
          <button
            onClick={() => console.log('Download chat clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Download size={20} className="text-on-surface-variant" />
            <span className="text-on-surface">Download Chat History</span>
          </button>

          {/* Divider */}
          <div className="border-t border-border my-2"></div>

          {/* Quick Actions */}
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-3">Quick Actions</p>
          </div>

          {/* Call Actions */}
          <button
            onClick={() => console.log('Voice call clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Phone size={20} className="text-green-600" />
            <span className="text-on-surface">Voice Call</span>
          </button>

          <button
            onClick={() => console.log('Video call clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Video size={20} className="text-blue-600" />
            <span className="text-on-surface">Video Call</span>
          </button>

          <button
            onClick={() => console.log('Secret chat clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Shield size={20} className="text-purple-600" />
            <span className="text-on-surface">Start Secret Chat</span>
          </button>

          {/* Divider */}
          <div className="border-t border-border my-2"></div>

          {/* Privacy Settings */}
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-3">Privacy</p>
          </div>

          {/* Read Receipts */}
          <button
            onClick={() => console.log('Toggle read receipts clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Eye size={20} className="text-on-surface-variant" />
            <span className="text-on-surface">Read Receipts: On</span>
          </button>

          {/* Last Seen */}
          <button
            onClick={() => console.log('Toggle last seen clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Clock size={20} className="text-on-surface-variant" />
            <span className="text-on-surface">Last Seen: Everyone</span>
          </button>

          {/* Message Timer */}
          <button
            onClick={() => console.log('Set message timer clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <MessageSquare size={20} className="text-on-surface-variant" />
            <span className="text-on-surface">Set Message Timer</span>
          </button>

          {/* Divider */}
          <div className="border-t border-border my-2"></div>

          {/* Block User */}
          <button
            onClick={() => console.log('Block user clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Ban size={20} className="text-error" />
            <span className="text-error">Block User</span>
          </button>

          {/* Report */}
          <button
            onClick={() => console.log('Report clicked')}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <AlertTriangle size={20} className="text-error" />
            <span className="text-error">Report</span>
          </button>

          {/* Delete Chat */}
          <button
            onClick={handleDelete}
            className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Trash2 size={20} className="text-error" />
            <span className="text-error">Delete Chat</span>
          </button>
        </div>
      </motion.div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-60">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-border rounded-lg w-full max-w-sm p-6"
          >
            <h3 className="text-lg font-semibold text-on-surface mb-2">Delete Chat</h3>
            <p className="text-on-surface-variant mb-6">
              Are you sure you want to delete this chat? This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg text-on-surface hover:bg-surface/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
