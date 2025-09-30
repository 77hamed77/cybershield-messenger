'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search, Edit, Plus, MoreVertical, MessageCircle, FolderPlus, Settings } from 'lucide-react';
import Image from 'next/image';
import { mockChats } from '@/data/mockData';
import { ChatItem } from '@/types';
import ChatRow from './ChatRow';
import TabButton from './TabButton';
import AddFolderModal from './AddFolderModal';
import ChatFolderManager from './ChatFolderManager';

/**
 * ChatsScreen Component
 * 
 * Main chats screen displaying list of conversations with search and filtering.
 * 
 * Features:
 * - Display list of chats with search functionality
 * - Tab-based filtering (All, Work, Bots)
 * - Chat management actions (pin, archive, mute, delete)
 * - Navigation to chat detail screen
 * - Responsive design with animations
 */

interface ChatFolder {
  id: string;
  name: string;
  color: string;
  icon: string;
  chatIds: string[];
}

export default function ChatsScreen() {
  const [chats, setChats] = useState<ChatItem[]>(mockChats);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [folders, setFolders] = useState<ChatFolder[]>([
    { id: 'work', name: 'Work', color: '#3B82F6', icon: '💼', chatIds: [] },
    { id: 'bots', name: 'Bots', color: '#8B5CF6', icon: '🤖', chatIds: [] }
  ]);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [showFolderManager, setShowFolderManager] = useState(false);
  const router = useRouter();

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else {
      // Filter by folder
      const folder = folders.find(f => f.id === activeTab);
      return matchesSearch && folder && folder.chatIds.includes(chat.id);
    }
  });

  const handlePin = (chatId: string) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
    ));
  };

  const handleArchive = (chatId: string) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, isArchived: !chat.isArchived } : chat
    ));
  };

  const handleMute = (chatId: string) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, isMuted: !chat.isMuted } : chat
    ));
  };

  const handleDelete = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
  };

  const handleMarkUnread = (chatId: string) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, isRead: false } : chat
    ));
  };

  const handleChatClick = (chat: ChatItem) => {
    // Navigate to chat detail screen
    router.push(`/main/chat/${chat.id}`);
  };

  // Folder management functions
  const handleAddFolder = (folderData: Omit<ChatFolder, 'chatIds'>) => {
    const newFolder: ChatFolder = {
      ...folderData,
      chatIds: []
    };
    setFolders([...folders, newFolder]);
    
    // Save to localStorage
    localStorage.setItem('chat-folders', JSON.stringify([...folders, newFolder]));
  };

  const handleEditFolder = (folderId: string, updates: Partial<ChatFolder>) => {
    setFolders(folders.map(f => f.id === folderId ? { ...f, ...updates } : f));
    
    // Update localStorage
    const updatedFolders = folders.map(f => f.id === folderId ? { ...f, ...updates } : f);
    localStorage.setItem('chat-folders', JSON.stringify(updatedFolders));
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolders(folders.filter(f => f.id !== folderId));
    
    // Update localStorage
    const updatedFolders = folders.filter(f => f.id !== folderId);
    localStorage.setItem('chat-folders', JSON.stringify(updatedFolders));
  };

  const handleMoveChatToFolder = (chatId: string, folderId: string | null) => {
    setFolders(prev => prev.map(folder => ({
      ...folder,
      chatIds: folderId === folder.id 
        ? [...folder.chatIds, chatId]
        : folder.chatIds.filter(id => id !== chatId)
    })));
    
    // Update localStorage
    const updatedFolders = folders.map(folder => ({
      ...folder,
      chatIds: folderId === folder.id 
        ? [...folder.chatIds, chatId]
        : folder.chatIds.filter(id => id !== chatId)
    }));
    localStorage.setItem('chat-folders', JSON.stringify(updatedFolders));
  };

  const handleRemoveChatFromFolder = (chatId: string) => {
    setFolders(prev => prev.map(folder => ({
      ...folder,
      chatIds: folder.chatIds.filter(id => id !== chatId)
    })));
    
    // Update localStorage
    const updatedFolders = folders.map(folder => ({
      ...folder,
      chatIds: folder.chatIds.filter(id => id !== chatId)
    }));
    localStorage.setItem('chat-folders', JSON.stringify(updatedFolders));
  };

  const getCurrentFolderId = (chatId: string) => {
    const folder = folders.find(f => f.chatIds.includes(chatId));
    return folder ? folder.id : undefined;
  };

  const getFoldersForChat = () => {
    return folders.map(folder => ({
      id: folder.id,
      name: folder.name,
      icon: folder.icon,
      color: folder.color,
      chatIds: folder.chatIds
    }));
  };

  // Load folders from localStorage on mount
  useEffect(() => {
    const savedFolders = localStorage.getItem('chat-folders');
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border">
        <div className="px-4 sm:px-6 py-3">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Edit button removed - not needed in chats */}
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
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">CyberShield</h1>
                <p className="text-xs text-on-surface-variant">Messenger</p>
              </div>
            </div>
            
            {/* Folder Management Button */}
            <button
              onClick={() => setShowFolderManager(true)}
              className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors group"
              title="Manage Folders"
            >
              <Edit size={20} className="text-on-surface-variant group-hover:text-primary transition-colors" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" size={20} />
            <input
              type="text"
              placeholder="Search for messages or users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-2xl text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
          </div>

          {/* Tabs */}
          <motion.div 
            className="flex items-center space-x-2"
            layout
          >
            <TabButton
              label="All Chats"
              active={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
            />
            {folders
              .sort((a, b) => b.chatIds.length - a.chatIds.length) // Sort by chat count
              .map((folder) => (
                <TabButton
                  key={folder.id}
                  label={folder.name}
                  badge={folder.chatIds.length}
                  active={activeTab === folder.id}
                  onClick={() => setActiveTab(folder.id)}
                  icon={folder.icon}
                  color={folder.color}
                />
              ))}
            
            {/* Add New Folder Button */}
            <button
              onClick={() => setShowAddFolderModal(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-surface-variant/50 hover:bg-primary/20 rounded-lg transition-all duration-200 group"
              title="Add New Folder"
            >
              <FolderPlus size={16} className="text-on-surface-variant group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">
                Add Folder
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-1"
        >
          {filteredChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ChatRow
                chat={chat}
                onPin={() => handlePin(chat.id)}
                onArchive={() => handleArchive(chat.id)}
                onMute={() => handleMute(chat.id)}
                onDelete={() => handleDelete(chat.id)}
                onMarkUnread={() => handleMarkUnread(chat.id)}
                onClick={() => handleChatClick(chat)}
                onMoveToFolder={(folderId) => handleMoveChatToFolder(chat.id, folderId)}
                onRemoveFromFolder={() => handleRemoveChatFromFolder(chat.id)}
                folders={getFoldersForChat()}
                currentFolderId={getCurrentFolderId(chat.id)}
                onAddFolder={() => setShowAddFolderModal(true)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center px-8">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="text-on-surface-variant" size={32} />
            </div>
            <h3 className="text-lg font-medium text-on-surface mb-2">No chats found</h3>
            <p className="text-on-surface-variant text-sm">
              {searchQuery ? 'Try adjusting your search terms' : 'Start a new conversation'}
            </p>
          </div>
        )}
      </div>

      {/* Add Folder Modal */}
      {showAddFolderModal && (
        <AddFolderModal
          onClose={() => setShowAddFolderModal(false)}
          onAdd={handleAddFolder}
        />
      )}

      {/* Folder Manager Modal */}
      {showFolderManager && (
        <ChatFolderManager
          folders={folders}
          chats={chats}
          onAddFolder={handleAddFolder}
          onEditFolder={handleEditFolder}
          onDeleteFolder={handleDeleteFolder}
          onMoveChatToFolder={handleMoveChatToFolder}
          onClose={() => setShowFolderManager(false)}
          showAddFolderModal={showAddFolderModal}
          onShowAddFolderModal={setShowAddFolderModal}
        />
      )}
    </div>
  );
}
