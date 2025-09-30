'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  FolderPlus, 
  Edit3, 
  Trash2, 
  MoreVertical, 
  Plus,
  X,
  Check
} from 'lucide-react';
import AddFolderModal from './AddFolderModal';

interface ChatFolder {
  id: string;
  name: string;
  color: string;
  icon: string;
  chatIds: string[];
}

interface ChatItem {
  id: string;
  title: string;
  folderId?: string;
}

interface ChatFolderManagerProps {
  folders: ChatFolder[];
  chats: ChatItem[];
  onAddFolder: (folder: Omit<ChatFolder, 'chatIds'>) => void;
  onEditFolder: (folderId: string, updates: Partial<ChatFolder>) => void;
  onDeleteFolder: (folderId: string) => void;
  onMoveChatToFolder: (chatId: string, folderId: string | null) => void;
  onClose: () => void;
  showAddFolderModal: boolean;
  onShowAddFolderModal: (show: boolean) => void;
}

export default function ChatFolderManager({
  folders,
  chats,
  onAddFolder,
  onEditFolder,
  onDeleteFolder,
  onMoveChatToFolder,
  onClose,
  showAddFolderModal,
  onShowAddFolderModal
}: ChatFolderManagerProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedChats, setSelectedChats] = useState<Set<string>>(new Set());
  const [isSelectMode, setIsSelectMode] = useState(false);

  // Group chats by folder
  const chatsByFolder = chats.reduce((acc, chat) => {
    const folderId = chat.folderId || 'unfolderd';
    if (!acc[folderId]) acc[folderId] = [];
    acc[folderId].push(chat);
    return acc;
  }, {} as Record<string, ChatItem[]>);

  const handleFolderSelect = (folderId: string) => {
    if (isSelectMode) {
      setSelectedChats(new Set());
    } else {
      setSelectedFolder(folderId);
    }
  };

  const handleChatSelect = (chatId: string) => {
    if (!isSelectMode) return;
    
    setSelectedChats(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chatId)) {
        newSet.delete(chatId);
      } else {
        newSet.add(chatId);
      }
      return newSet;
    });
  };

  const handleMoveSelectedChats = (targetFolderId: string | null) => {
    selectedChats.forEach(chatId => {
      onMoveChatToFolder(chatId, targetFolderId);
    });
    setSelectedChats(new Set());
    setIsSelectMode(false);
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedChats(new Set());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-overlay backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Folder className="text-primary" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-on-surface">Manage Folders</h2>
              <p className="text-sm text-on-surface-variant">Organize your chats into folders</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSelectMode}
              className={`p-2 rounded-lg transition-colors ${
                isSelectMode ? 'bg-primary/20 text-primary' : 'hover:bg-surface-variant/50'
              }`}
              title={isSelectMode ? 'Exit Select Mode' : 'Select Chats to Move'}
            >
              {isSelectMode ? <Check size={20} /> : <Edit3 size={20} />}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors"
            >
              <X size={20} className="text-on-surface-variant" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Folders Sidebar */}
          <div className="w-80 border-r border-border bg-surface">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-on-surface">Folders</h3>
                <button
                  onClick={() => onShowAddFolderModal(true)}
                  className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors"
                  title="Add New Folder"
                >
                  <Plus size={16} className="text-on-surface-variant" />
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Unfolderd Chats */}
                <button
                  onClick={() => handleFolderSelect('unfolderd')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                    selectedFolder === 'unfolderd' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-variant/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded bg-surface-variant/50 flex items-center justify-center">
                    <MoreVertical size={16} className="text-on-surface-variant" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">All Chats</div>
                    <div className="text-xs text-on-surface-variant">{chatsByFolder.unfolderd?.length || 0} chats</div>
                  </div>
                </button>

                {/* Custom Folders */}
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className={`relative flex items-center space-x-3 p-3 rounded-lg transition-colors group cursor-pointer ${
                      selectedFolder === folder.id ? 'bg-primary/10 text-primary' : 'hover:bg-surface-variant/50'
                    }`}
                    onClick={() => handleFolderSelect(folder.id)}
                  >
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{ backgroundColor: `${folder.color}20` }}
                    >
                      <span className="text-sm">{folder.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{folder.name}</div>
                      <div className="text-xs text-on-surface-variant">{folder.chatIds.length} chats</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteFolder(folder.id);
                        }}
                        className="p-1 hover:bg-surface-variant/50 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} className="text-error" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chats List */}
          <div className="flex-1 flex flex-col">
            {selectedFolder && (
              <>
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-on-surface">
                      {selectedFolder === 'unfolderd' ? 'All Chats' : folders.find(f => f.id === selectedFolder)?.name}
                    </h3>
                    {isSelectMode && selectedChats.size > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-on-surface-variant">
                          {selectedChats.size} selected
                        </span>
                        <div className="w-px h-4 bg-border mx-2" />
                        {folders.map((folder) => (
                          <button
                            key={folder.id}
                            onClick={() => handleMoveSelectedChats(folder.id)}
                            className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors"
                            title={`Move to ${folder.name}`}
                          >
                            <span className="text-sm">{folder.icon}</span>
                          </button>
                        ))}
                        <button
                          onClick={() => handleMoveSelectedChats(null)}
                          className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors"
                          title="Remove from folder"
                        >
                          <X size={16} className="text-on-surface-variant" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Chats in selected folder */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-2">
                    {(chatsByFolder[selectedFolder] || []).map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => handleChatSelect(chat.id)}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                          selectedChats.has(chat.id) ? 'bg-primary/10' : 'hover:bg-surface-variant/50'
                        }`}
                      >
                        {isSelectMode && (
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedChats.has(chat.id) ? 'bg-primary border-primary' : 'border-on-surface-variant'
                          }`}>
                            {selectedChats.has(chat.id) && <Check size={12} className="text-white" />}
                          </div>
                        )}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <span className="text-lg font-semibold">{chat.title[0]}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{chat.title}</div>
                          <div className="text-xs text-on-surface-variant">Click to {isSelectMode ? 'select' : 'view'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Add Folder Modal */}
      {showAddFolderModal && (
        <AddFolderModal
          onClose={() => onShowAddFolderModal(false)}
          onAdd={onAddFolder}
        />
      )}
    </motion.div>
  );
}
