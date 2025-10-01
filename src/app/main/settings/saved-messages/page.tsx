'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Trash2, 
  Download, 
  Share,
  Calendar,
  Clock,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Music,
  FileText
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Message, MessageType } from '@/types';

export default function SavedMessagesPage() {
  const router = useRouter();
  const [savedMessages, setSavedMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<MessageType | 'all'>('all');
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());

  // تحميل الرسائل المحفوظة من localStorage
  useEffect(() => {
    const loadSavedMessages = () => {
      try {
        const saved = localStorage.getItem('savedMessages');
        if (saved) {
          const messages = JSON.parse(saved);
          // إزالة التكرارات بناءً على ID
          const uniqueMessages = messages.filter((message: Message, index: number, self: Message[]) => 
            index === self.findIndex(m => m.id === message.id)
          );
          setSavedMessages(uniqueMessages);
          
          // حفظ النسخة المنظفة في localStorage
          if (uniqueMessages.length !== messages.length) {
            localStorage.setItem('savedMessages', JSON.stringify(uniqueMessages));
          }
        }
      } catch (error) {
        console.error('Error loading saved messages:', error);
      }
    };

    loadSavedMessages();
    
    // الاستماع لتحديثات localStorage
    const handleStorageChange = () => {
      loadSavedMessages();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // تصفية الرسائل وإزالة التكرارات
  const filteredMessages = savedMessages
    .filter(message => {
      const matchesSearch = message.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || message.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .filter((message, index, self) => 
      // إزالة التكرارات بناءً على ID
      index === self.findIndex(m => m.id === message.id)
    );

  // حذف رسالة محفوظة
  const handleDeleteMessage = (messageId: string) => {
    const updatedMessages = savedMessages.filter(msg => msg.id !== messageId);
    setSavedMessages(updatedMessages);
    localStorage.setItem('savedMessages', JSON.stringify(updatedMessages));
  };

  // حذف رسائل متعددة
  const handleDeleteSelected = () => {
    const updatedMessages = savedMessages.filter(msg => !selectedMessages.has(msg.id));
    setSavedMessages(updatedMessages);
    localStorage.setItem('savedMessages', JSON.stringify(updatedMessages));
    setSelectedMessages(new Set());
  };

  // تحديد/إلغاء تحديد رسالة
  const toggleMessageSelection = (messageId: string) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(messageId)) {
      newSelected.delete(messageId);
    } else {
      newSelected.add(messageId);
    }
    setSelectedMessages(newSelected);
  };

  // تحديد الكل
  const selectAll = () => {
    setSelectedMessages(new Set(filteredMessages.map(msg => msg.id)));
  };

  // إلغاء تحديد الكل
  const deselectAll = () => {
    setSelectedMessages(new Set());
  };

  // الحصول على أيقونة نوع الرسالة
  const getMessageIcon = (type: MessageType) => {
    switch (type) {
      case MessageType.IMAGE:
        return <ImageIcon size={16} className="text-blue-500" />;
      case MessageType.VIDEO:
        return <Video size={16} className="text-purple-500" />;
      case MessageType.AUDIO:
        return <Music size={16} className="text-green-500" />;
      default:
        return <MessageSquare size={16} className="text-gray-500" />;
    }
  };

  // الحصول على لون نوع الرسالة
  const getMessageColor = (type: MessageType) => {
    switch (type) {
      case MessageType.IMAGE:
        return 'bg-blue-500/20 text-blue-500';
      case MessageType.VIDEO:
        return 'bg-purple-500/20 text-purple-500';
      case MessageType.AUDIO:
        return 'bg-green-500/20 text-green-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-surface/50 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-primary" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-on-surface">الرسائل المحفوظة</h1>
              <p className="text-xs text-on-surface-variant">
                {savedMessages.length} رسالة محفوظة
              </p>
            </div>
          </div>
          
          {selectedMessages.size > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDeleteSelected}
                className="p-2 hover:bg-error/20 rounded-full transition-colors text-error"
                title="حذف المحدد"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث في الرسائل المحفوظة..."
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            onClick={() => setFilterType(filterType === 'all' ? MessageType.TEXT : 'all')}
            className="p-2 hover:bg-surface/50 rounded-lg transition-colors"
            title="تصفية"
          >
            <Filter size={20} className="text-primary" />
          </button>
        </div>

        {/* Filter Options */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterType === 'all' 
                ? 'bg-primary text-on-primary' 
                : 'bg-surface-variant text-on-surface-variant hover:bg-surface'
            }`}
          >
            الكل ({savedMessages.length})
          </button>
          <button
            onClick={() => setFilterType(MessageType.TEXT)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterType === MessageType.TEXT 
                ? 'bg-primary text-on-primary' 
                : 'bg-surface-variant text-on-surface-variant hover:bg-surface'
            }`}
          >
            نص ({savedMessages.filter(m => m.type === MessageType.TEXT).length})
          </button>
          <button
            onClick={() => setFilterType(MessageType.IMAGE)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterType === MessageType.IMAGE 
                ? 'bg-primary text-on-primary' 
                : 'bg-surface-variant text-on-surface-variant hover:bg-surface'
            }`}
          >
            صور ({savedMessages.filter(m => m.type === MessageType.IMAGE).length})
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquare size={64} className="text-on-surface-variant mb-4" />
            <h3 className="text-lg font-medium text-on-surface mb-2">
              {searchQuery ? 'لا توجد نتائج' : 'لا توجد رسائل محفوظة'}
            </h3>
            <p className="text-on-surface-variant">
              {searchQuery 
                ? 'جرب البحث بكلمات مختلفة' 
                : 'احفظ الرسائل المهمة للوصول إليها لاحقاً'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Select All */}
            {filteredMessages.length > 1 && (
              <div className="flex items-center justify-between p-3 bg-surface-variant/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedMessages.size === filteredMessages.length}
                    onChange={selectedMessages.size === filteredMessages.length ? deselectAll : selectAll}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-on-surface">
                    {selectedMessages.size === filteredMessages.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant">
                  {selectedMessages.size} من {filteredMessages.length}
                </span>
              </div>
            )}

            {/* Messages */}
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 bg-surface border border-border rounded-lg hover:bg-surface-variant/50 transition-colors ${
                  selectedMessages.has(message.id) ? 'ring-2 ring-primary/50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedMessages.has(message.id)}
                    onChange={() => toggleMessageSelection(message.id)}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary mt-1"
                  />

                  {/* Message Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`p-1 rounded ${getMessageColor(message.type)}`}>
                        {getMessageIcon(message.type)}
                      </div>
                      <span className="text-xs text-on-surface-variant">
                        {message.type === MessageType.TEXT ? 'نص' : 
                         message.type === MessageType.IMAGE ? 'صورة' :
                         message.type === MessageType.VIDEO ? 'فيديو' :
                         message.type === MessageType.AUDIO ? 'صوت' : 'ملف'}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-on-surface-variant">
                        <Clock size={12} />
                        <span>{message.time}</span>
                      </div>
                    </div>

                    {/* Message Preview */}
                    <div className="mb-3">
                      {message.type === MessageType.TEXT ? (
                        <p className="text-sm text-on-surface line-clamp-3">{message.content}</p>
                      ) : message.type === MessageType.IMAGE ? (
                        <div className="flex items-center space-x-2">
                          <Image
                            src={message.content}
                            alt="Saved image"
                            width={40}
                            height={40}
                            className="rounded object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/logo.png';
                            }}
                          />
                          <span className="text-sm text-on-surface-variant">صورة محفوظة</span>
                        </div>
                      ) : (
                        <span className="text-sm text-on-surface-variant">
                          {message.type === MessageType.VIDEO ? 'فيديو محفوظ' :
                           message.type === MessageType.AUDIO ? 'رسالة صوتية محفوظة' : 'ملف محفوظ'}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="p-1 hover:bg-error/20 rounded text-error transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (message.type === MessageType.TEXT) {
                            navigator.clipboard.writeText(message.content);
                          }
                        }}
                        className="p-1 hover:bg-surface/50 rounded text-on-surface-variant transition-colors"
                        title="نسخ"
                      >
                        <Share size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}