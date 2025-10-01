'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Pin, 
  Archive, 
  VolumeX, 
  MoreVertical,
  Check,
  CheckCheck,
  X,
  Folder,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import { ChatItem } from '@/types';
// import { formatTime } from '@/lib/utils';
import ChatOptionsMenu from './ChatOptionsMenu';

interface ChatRowProps {
  chat: ChatItem;
  onPin: () => void;
  onArchive: () => void;
  onMute?: () => void;
  onDelete: () => void;
  onMarkUnread: () => void;
  onClick?: () => void;
  onMoveToFolder?: (folderId: string) => void;
  onRemoveFromFolder?: () => void;
  folders?: Array<{ id: string; name: string; icon: string; color: string; chatIds: string[] }>;
  currentFolderId?: string;
  onAddFolder?: () => void;
  onStar?: () => void;
}

export default function ChatRow({ 
  chat, 
  onPin, 
  onArchive, 
  onMute, 
  onDelete, 
  onMarkUnread: _onMarkUnread,
  onClick,
  onMoveToFolder,
  onRemoveFromFolder,
  folders = [],
  currentFolderId,
  onAddFolder,
  onStar
}: ChatRowProps) {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActions]);

  return (
    <>
      <motion.div
        ref={menuRef}
        className="relative group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="flex items-center p-3 md:p-4 hover:bg-surface/30 transition-colors cursor-pointer"
          onClick={onClick}
        >
          {/* Avatar */}
          <div className="relative mr-2 md:mr-3">
            <Image
              src={chat.avatarUrl}
              alt={chat.title}
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            {chat.pinned && (
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full flex items-center justify-center">
                <Pin size={8} className="md:w-2.5 md:h-2.5 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-semibold text-xs md:text-sm truncate ${
                chat.isRead ? 'text-on-surface' : 'text-primary'
              }`}>
                {chat.title}
              </h3>
              <div className="flex items-center space-x-1 md:space-x-2">
                {chat.isMuted && (
                  <VolumeX size={14} className="md:w-4 md:h-4 text-on-surface-variant" />
                )}
                {chat.isArchived && (
                  <Archive size={14} className="md:w-4 md:h-4 text-on-surface-variant" />
                )}
                <span className="text-xs text-on-surface-variant">
                  {chat.time}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs md:text-sm text-on-surface-variant truncate flex-1">
                {chat.subtitle}
              </p>
              <div className="flex items-center space-x-1 md:space-x-2 ml-1 md:ml-2">
                {chat.unreadCount > 0 ? (
                  <div className="bg-primary text-white text-xs rounded-full px-1.5 md:px-2 py-0.5 md:py-1 min-w-[18px] md:min-w-[20px] text-center">
                    {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {chat.isRead ? (
                      <CheckCheck size={14} className="md:w-4 md:h-4 text-blue-500" />
                    ) : (
                      <Check size={14} className="md:w-4 md:h-4 text-on-surface-variant" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // منع انتشار الحدث إلى العنصر الأب
              setShowActions(!showActions);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 md:p-2 hover:bg-surface/50 rounded-full"
          >
            <MoreVertical size={18} className="md:w-5 md:h-5 text-on-surface-variant" />
          </button>
        </div>

        {/* Chat Options Menu */}
        {showActions && (
          <div className="absolute top-0 right-0 z-50">
            <ChatOptionsMenu
              chat={{
                id: chat.id,
                title: chat.title,
                isPinned: chat.pinned || false,
                isArchived: chat.isArchived,
                isMuted: chat.isMuted,
                isStarred: chat.isStarred || false
              }}
              onPin={onPin}
              onArchive={onArchive}
              onMute={onMute || (() => {})}
              onStar={onStar || (() => {})}
              onDelete={handleDelete}
              onClose={() => setShowActions(false)}
              onMoveToFolder={() => {
                setShowActions(false);
                setShowFolderModal(true);
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="bg-black/70 backdrop-blur-lg"
          onClick={() => setShowDeleteConfirm(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            margin: 0
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-surface border border-border rounded-3xl p-6 shadow-2xl backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              zIndex: 9999,
              maxHeight: '75vh',
              maxWidth: '90vw',
              width: '100%',
              overflowY: 'auto'
            }}
          >
            <h3 className="text-lg font-semibold text-on-surface mb-2">
              تأكيد الحذف
            </h3>
            <p className="text-on-surface-variant mb-6">
              هل أنت متأكد أنك تريد حذف هذه الدردشة؟
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg text-on-surface hover:bg-surface/80 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
              >
                حذف
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Folder Selection Modal */}
      {showFolderModal && (
        <div 
          className="bg-black/60 backdrop-blur-md"
          onClick={() => setShowFolderModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9997,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            margin: 0
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-surface border border-border rounded-3xl shadow-2xl backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              zIndex: 9998,
              maxHeight: '75vh',
              maxWidth: '90vw',
              width: '100%',
              overflowY: 'auto'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h2 className="text-lg font-semibold text-on-surface">Move to Folder</h2>
                <p className="text-sm text-on-surface-variant truncate max-w-xs">
                  {chat.title}
                </p>
              </div>
              <button
                onClick={() => setShowFolderModal(false)}
                className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors"
              >
                <X size={20} className="text-on-surface-variant" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Remove from folder option */}
              {currentFolderId && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onRemoveFromFolder?.();
                    setShowFolderModal(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface-variant/50 transition-colors text-left border border-border/50 mb-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-error/20 flex items-center justify-center">
                    <X size={20} className="text-error" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-on-surface">Remove from Folder</div>
                    <div className="text-xs text-on-surface-variant">Move back to All Chats</div>
                  </div>
                </motion.button>
              )}

              {currentFolderId && <div className="my-3 border-t border-border" />}

              {/* Add New Folder */}
              {onAddFolder && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onAddFolder();
                    setShowFolderModal(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left border border-dashed border-primary/50 hover:border-primary mb-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Plus size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-primary">Create New Folder</div>
                    <div className="text-xs text-on-surface-variant">Add a new folder first</div>
                  </div>
                </motion.button>
              )}

              {/* Existing Folders */}
              {folders.length > 0 && (
                <>
                  {onAddFolder && <div className="my-3 border-t border-border" />}
                  <div className="text-sm font-medium text-on-surface-variant mb-2">
                    Move to existing folder:
                  </div>
                  <div className="space-y-2">
                    {folders.map((folder) => (
                      <motion.button
                        key={folder.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (folder.id !== currentFolderId && onMoveToFolder) {
                            onMoveToFolder(folder.id);
                          }
                          setShowFolderModal(false);
                        }}
                        disabled={folder.id === currentFolderId}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left border ${
                          folder.id === currentFolderId 
                            ? 'bg-primary/10 border-primary cursor-not-allowed' 
                            : 'hover:bg-surface-variant/50 border-border/50'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${folder.color}20` }}
                        >
                          <span className="text-lg">{folder.icon}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-sm">{folder.name}</div>
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: folder.color }}
                            />
                          </div>
                          <div className="text-xs text-on-surface-variant">
                            {folder.id === currentFolderId 
                              ? 'Currently in this folder'
                              : `${folder.chatIds.length} chat${folder.chatIds.length !== 1 ? 's' : ''}`
                            }
                          </div>
                        </div>

                        {folder.id === currentFolderId && (
                          <div className="text-xs text-primary font-medium">Current</div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {/* No folders message */}
              {folders.length === 0 && !onAddFolder && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-surface-variant/50 rounded-full flex items-center justify-center">
                    <Folder size={32} className="text-on-surface-variant" />
                  </div>
                  <h3 className="text-lg font-medium text-on-surface mb-2">No Folders Yet</h3>
                  <p className="text-on-surface-variant text-sm">
                    Create your first folder to organize chats
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <button
                onClick={() => setShowFolderModal(false)}
                className="w-full px-4 py-2 bg-surface-variant text-on-surface-variant rounded-lg hover:bg-surface-variant/80 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
