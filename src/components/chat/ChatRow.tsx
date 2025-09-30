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
  MoreVertical,
  Check,
  CheckCheck,
  FolderPlus,
  X,
  Folder,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import { ChatItem } from '@/types';
import { formatTime } from '@/lib/utils';

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
}

export default function ChatRow({ 
  chat, 
  onPin, 
  onArchive, 
  onMute, 
  onDelete, 
  onMarkUnread,
  onClick,
  onMoveToFolder,
  onRemoveFromFolder,
  folders = [],
  currentFolderId,
  onAddFolder
}: ChatRowProps) {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="flex items-center p-4 hover:bg-surface/30 transition-colors cursor-pointer"
          onClick={onClick}
        >
          {/* Avatar */}
          <div className="relative mr-3">
            <Image
              src={chat.avatarUrl}
              alt={chat.title}
              width={52}
              height={52}
              className="rounded-full object-cover"
            />
            {chat.pinned && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Pin size={10} className="text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-semibold text-sm truncate ${
                chat.isRead ? 'text-on-surface' : 'text-primary'
              }`}>
                {chat.title}
              </h3>
              <div className="flex items-center space-x-2">
                {chat.isMuted && (
                  <VolumeX size={16} className="text-on-surface-variant" />
                )}
                {chat.isArchived && (
                  <Archive size={16} className="text-on-surface-variant" />
                )}
                <span className="text-xs text-on-surface-variant">
                  {chat.time}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-on-surface-variant truncate flex-1">
                {chat.subtitle}
              </p>
              <div className="flex items-center space-x-2 ml-2">
                {chat.unreadCount > 0 ? (
                  <div className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {chat.isRead ? (
                      <CheckCheck size={16} className="text-blue-500" />
                    ) : (
                      <Check size={16} className="text-on-surface-variant" />
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
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface/50 rounded-full"
          >
            <MoreVertical size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Actions Menu */}
        {showActions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-4 top-16 bg-surface border border-border rounded-lg shadow-lg z-10 min-w-[200px]"
          >
            <div className="py-2">
              <button
                onClick={onPin}
                className="w-full px-4 py-2 text-left text-sm hover:bg-surface/50 flex items-center space-x-3"
              >
                {chat.pinned ? (
                  <>
                    <PinOff size={16} className="text-on-surface-variant" />
                    <span>Unpin</span>
                  </>
                ) : (
                  <>
                    <Pin size={16} className="text-on-surface-variant" />
                    <span>Pin</span>
                  </>
                )}
              </button>
              
              <button
                onClick={onMarkUnread}
                className="w-full px-4 py-2 text-left text-sm hover:bg-surface/50 flex items-center space-x-3"
              >
                <Check size={16} className="text-on-surface-variant" />
                <span>Mark as Unread</span>
              </button>
              
              <button
                onClick={onMute}
                className="w-full px-4 py-2 text-left text-sm hover:bg-surface/50 flex items-center space-x-3"
              >
                {chat.isMuted ? (
                  <>
                    <Volume2 size={16} className="text-on-surface-variant" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <VolumeX size={16} className="text-on-surface-variant" />
                    <span>Mute</span>
                  </>
                )}
              </button>
              
              <button
                onClick={onArchive}
                className="w-full px-4 py-2 text-left text-sm hover:bg-surface/50 flex items-center space-x-3"
              >
                {chat.isArchived ? (
                  <>
                    <ArchiveRestore size={16} className="text-on-surface-variant" />
                    <span>Unarchive</span>
                  </>
                ) : (
                  <>
                    <Archive size={16} className="text-on-surface-variant" />
                    <span>Archive</span>
                  </>
                )}
              </button>
              
              <div className="border-t border-border my-1"></div>
              
              {/* Move to Folder Option */}
              <button
                onClick={() => setShowFolderModal(true)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-surface/50 flex items-center space-x-3"
              >
                <FolderPlus size={16} className="text-on-surface-variant" />
                <span>Move to Folder</span>
              </button>
              
              <div className="border-t border-border my-1"></div>
              
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-sm hover:bg-surface/50 flex items-center space-x-3 text-error"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-border rounded-lg p-6 max-w-sm mx-4"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-md"
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
