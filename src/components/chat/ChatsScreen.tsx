'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Edit, MessageCircle, FolderPlus } from 'lucide-react';
import Image from 'next/image';
import { mockChats } from '@/data/mockData';
import { ChatItem } from '@/types';
import ChatRow from './ChatRow';
import TabButton from './TabButton';
import AddFolderModal from './AddFolderModal';
import ChatFolderManager from './ChatFolderManager';
import NoSSR from '@/components/ui/NoSSR';
import { useLanguage } from '@/components/LanguageProvider';
import SmartSearch from '@/components/ui/SmartSearch';
import { LoadingSpinner, EmptyState } from '@/components/ui/LoadingStates';
import KeyboardShortcuts from '@/components/ui/KeyboardShortcuts';

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
  const [isLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const { t } = useLanguage();

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch && !chat.isArchived;
    } else if (activeTab === 'archived') {
      return matchesSearch && chat.isArchived;
    } else {
      // Filter by folder
      const folder = folders.find(f => f.id === activeTab);
      return matchesSearch && folder && folder.chatIds.includes(chat.id) && !chat.isArchived;
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

  const handleStar = (chatId: string) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, isStarred: !chat.isStarred } : chat
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

    // Load recent searches
    const savedSearches = localStorage.getItem('recent-searches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Add to recent searches
    if (query.trim() && !recentSearches.includes(query.trim())) {
      const newSearches = [query.trim(), ...recentSearches].slice(0, 10);
      setRecentSearches(newSearches);
      localStorage.setItem('recent-searches', JSON.stringify(newSearches));
    }
  };

  // Clear recent searches
  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent-searches');
  };

  // Handle search result selection
  const handleSearchSelect = (result: { type: string; id: string }) => {
    if (result.type === 'chat') {
      router.push(`/main/chat/${result.id}`);
    }
  };

  return (
    <NoSSR>
      <div className="h-full flex flex-col bg-background relative">
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
      <div className="bg-app-bar backdrop-blur-sm border-b border-border relative z-10">
        <div className="px-3 md:px-4 lg:px-6 py-2 md:py-3">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-3 md:mb-4">
            {/* Edit button removed - not needed in chats */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                <Image
                  src="/images/logox.svg"
                  alt="CyberShield"
                  width={24}
                  height={24}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                     <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent professional-heading">CyberShield</h1>
                     <p className="text-xs text-on-surface-variant professional-subheading">Messenger</p>
              </div>
            </div>
            
            {/* Folder Management Button */}
            <button
              onClick={() => setShowFolderManager(true)}
              className="p-1.5 md:p-2 hover:bg-surface-variant/50 rounded-lg transition-colors group"
              title="Manage Folders"
            >
              <Edit size={18} className="md:w-5 md:h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
            </button>
          </div>

        {/* Smart Search Bar */}
        <div className="mb-3 md:mb-4">
          <SmartSearch
            placeholder={t('chats.searchPlaceholder')}
            onSearch={handleSearch}
            onSelect={handleSearchSelect}
            showRecent={true}
            recentSearches={recentSearches}
            onClearRecent={handleClearRecent}
            results={chats.map(chat => ({
              id: chat.id,
              type: 'chat' as const,
              title: chat.title,
              subtitle: chat.subtitle,
              avatarUrl: chat.avatarUrl,
              time: chat.time,
              badge: chat.unreadCount > 0 ? chat.unreadCount : undefined
            }))}
          />
        </div>

          {/* Tabs */}
          <motion.div 
            className="flex items-center space-x-1 md:space-x-2 overflow-x-auto"
            layout
          >
                   <TabButton
                     label={t('chats.allChats')}
                     active={activeTab === 'all'}
                     onClick={() => setActiveTab('all')}
                   />
                   <TabButton
                     label={t('chats.archived')}
                     active={activeTab === 'archived'}
                     onClick={() => setActiveTab('archived')}
                     badge={chats.filter(chat => chat.isArchived).length}
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
              className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1.5 md:py-2 bg-surface-variant/50 hover:bg-primary/20 rounded-lg transition-all duration-200 group whitespace-nowrap"
              title="Add New Folder"
            >
              <FolderPlus size={14} className="md:w-4 md:h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                     <span className="text-xs md:text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">
                       {t('folders.createFolder')}
                     </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto relative z-10 px-1 md:px-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-0.5 md:space-y-1"
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
                onStar={() => handleStar(chat.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredChats.length === 0 && (
          <EmptyState
            icon={<MessageCircle size={32} />}
            title={searchQuery ? t('loading.noResults') : t('chats.noChats')}
            description={searchQuery ? t('loading.tryDifferentKeywords') : t('chats.startConversation')}
            action={!searchQuery && (
              <button
                onClick={() => {
                  // Add new chat logic
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t('chats.newChat')}
              </button>
            )}
          />
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

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts />
    </div>
  </NoSSR>
);
}
