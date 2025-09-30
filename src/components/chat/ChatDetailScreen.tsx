'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Mic, 
  Paperclip,
  Check,
  CheckCheck,
  AlertCircle,
  Bookmark,
  Trash2,
  Copy,
  Forward,
  Reply,
  Edit
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { mockMessages } from '@/data/mockData';
import { Message, MessageType } from '@/types';
import VideoCallScreen from '@/components/calls/VideoCallScreen';
import VoiceCallScreen from '@/components/calls/VoiceCallScreen';
import ChatOptionsMenu from './ChatOptionsMenu';
import MessageOptionsMenu from './MessageOptionsMenu';

interface ChatDetailScreenProps {
  chatId: string;
  title: string;
  avatarUrl: string;
  onBack: () => void;
}

export default function ChatDetailScreen({ 
  chatId, 
  title, 
  avatarUrl, 
  onBack 
}: ChatDetailScreenProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [backgroundOffset, setBackgroundOffset] = useState({ x: 0, y: 0 });
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [messageMenuPosition, setMessageMenuPosition] = useState({ x: 0, y: 0 });
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const [savedMessages, setSavedMessages] = useState<Set<string>>(new Set());

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        isSentByMe: true,
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        isRead: false,
        type: MessageType.TEXT,
        chatId
      };
      setMessages([message, ...messages]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVideoCall = () => {
    setShowVideoCall(true);
  };

  const handleVoiceCall = () => {
    setShowVoiceCall(true);
  };

  const handleChatOptions = () => {
    setShowChatOptions(true);
  };

  const handleEndCall = () => {
    setShowVideoCall(false);
    setShowVoiceCall(false);
  };

  const handleMinimizeCall = () => {
    // يمكن إضافة وظيفة تصغير المكالمة هنا
    console.log('Call minimized');
  };

  const handleSendMessageFromCall = () => {
    setShowVideoCall(false);
    setShowVoiceCall(false);
    // التركيز على حقل الرسالة
    setTimeout(() => {
      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      input?.focus();
    }, 100);
  };

  const handleChatAction = (action: string) => {
    console.log(`Chat action: ${action}`);
    setShowChatOptions(false);
  };

  const handleMessageClick = (messageId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setSelectedMessageId(messageId);
    setMessageMenuPosition({
      x: event.clientX,
      y: event.clientY
    });
    setShowMessageOptions(true);
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    console.log('Message deleted:', messageId);
  };

  const handleSaveMessage = (messageId: string) => {
    setSavedMessages(prev => new Set([...prev, messageId]));
    console.log('Message saved:', messageId);
    
    // يمكن هنا حفظ الرسالة في قاعدة بيانات أو localStorage
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      const savedMessagesFromStorage = JSON.parse(localStorage.getItem('savedMessages') || '[]');
      savedMessagesFromStorage.push(message);
      localStorage.setItem('savedMessages', JSON.stringify(savedMessagesFromStorage));
    }
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    console.log('Message copied to clipboard');
  };

  const handleReplyToMessage = (messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      setNewMessage(`بالرد على: ${message.content} `);
      // يمكن إضافة تأثير بصري للرد
    }
  };

  const handleForwardMessage = (messageId: string) => {
    console.log('Forward message:', messageId);
    // يمكن فتح قائمة جهات الاتصال لإعادة التوجيه
  };

  const handleEditMessage = (messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      setNewMessage(message.content);
      // حذف الرسالة الأصلية من القائمة
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  // تأثير حركة الخلفية الخفيفة مع التمرير
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setBackgroundOffset({
        x: scrollY * 0.1,
        y: scrollY * 0.05
      });
    };

    const chatContainer = document.querySelector('.overflow-y-auto');
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/pattern2.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          backgroundAttachment: 'fixed',
          opacity: '0.08',
          transform: `translate(${backgroundOffset.x}px, ${backgroundOffset.y}px)`
        }}
        animate={{
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background/40 z-[5]" />
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 py-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-surface/50 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-primary" />
            </button>
            <Image
              src={avatarUrl}
              alt={title}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-on-surface">{title}</h2>
              <p className="text-xs text-on-surface-variant">last seen just now</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Video call button */}
            <button 
              className="p-2 hover:bg-surface/50 rounded-full transition-colors"
              onClick={handleVideoCall}
              title="Start video call"
            >
              <Video size={20} className="text-primary" />
            </button>
            {/* Voice call button */}
            <button 
              className="p-2 hover:bg-surface/50 rounded-full transition-colors"
              onClick={handleVoiceCall}
              title="Start voice call"
            >
              <Phone size={20} className="text-primary" />
            </button>
            {/* User info button - navigate to user profile */}
            <button 
              className="p-2 hover:bg-surface/50 rounded-full transition-colors"
              onClick={() => router.push(`/main/contact/${chatId}`)}
              title="View user profile"
            >
              <AlertCircle size={20} className="text-primary" />
            </button>
            {/* More options button */}
            <button 
              className="p-2 hover:bg-surface/50 rounded-full transition-colors"
              onClick={handleChatOptions}
              title="Chat options"
            >
              <MoreVertical size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex ${message.isSentByMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl relative cursor-pointer transition-all duration-200 group ${
                message.isSentByMe
                  ? 'bg-primary text-white rounded-br-md hover:bg-primary/90'
                  : 'bg-surface text-on-surface rounded-bl-md border hover:bg-surface-variant/50'
              } ${
                savedMessages.has(message.id) 
                  ? 'ring-2 ring-accent/50 bg-accent/10' 
                  : ''
              }`}
              onClick={(e) => handleMessageClick(message.id, e)}
            >
              {message.type === MessageType.TEXT ? (
                <p className="text-sm">{message.content}</p>
              ) : message.type === MessageType.IMAGE ? (
                <Image
                  src={message.content}
                  alt="Message image"
                  width={150}
                  height={150}
                  className="rounded-lg object-cover"
                />
              ) : null}
              
              <div className={`flex items-center justify-between mt-1 ${
                message.isSentByMe ? 'text-white/70' : 'text-on-surface-variant'
              }`}>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">{message.time}</span>
                  {message.isSentByMe && (
                    <div className="flex items-center">
                      {message.isRead ? (
                        <CheckCheck size={12} className="text-blue-400" />
                      ) : (
                        <Check size={12} />
                      )}
                    </div>
                  )}
                </div>
                
                {/* Saved/Liked indicators */}
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {savedMessages.has(message.id) && (
                    <Bookmark 
                      size={12} 
                      className={`${message.isSentByMe ? 'text-accent-foreground' : 'text-accent'}`}
                      fill="currentColor"
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-app-bar backdrop-blur-sm border-t border-border p-4 relative z-10">
        <div className="flex items-center space-x-3">
          {/* Attach file button - functionality to be implemented */}
          <button 
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
            onClick={() => console.log('Attach file clicked')}
            title="Attach file"
          >
            <Paperclip size={20} className="text-primary" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك..."
              className="w-full px-4 py-2 bg-input border border-border rounded-2xl text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
          </div>
          {/* Voice message button - functionality to be implemented */}
          <button 
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
            onClick={() => console.log('Voice message clicked')}
            title="Send voice message"
          >
            <Mic size={20} className="text-primary" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Video Call Screen */}
      {showVideoCall && (
        <VideoCallScreen
          contactName={title}
          contactAvatar={avatarUrl}
          onEndCall={handleEndCall}
          onMinimize={handleMinimizeCall}
          onSendMessage={handleSendMessageFromCall}
        />
      )}

      {/* Voice Call Screen */}
      {showVoiceCall && (
        <VoiceCallScreen
          contactName={title}
          contactAvatar={avatarUrl}
          onEndCall={handleEndCall}
          onMinimize={handleMinimizeCall}
          onSendMessage={handleSendMessageFromCall}
        />
      )}

      {/* Chat Options Menu */}
      {showChatOptions && (
        <ChatOptionsMenu
          chat={{
            id: chatId,
            title,
            isPinned: false,
            isArchived: false,
            isMuted: false,
            isStarred: false
          }}
          onPin={() => handleChatAction('pin')}
          onArchive={() => handleChatAction('archive')}
          onMute={() => handleChatAction('mute')}
          onStar={() => handleChatAction('star')}
          onDelete={() => handleChatAction('delete')}
          onClose={() => setShowChatOptions(false)}
        />
      )}

      {/* Message Options Menu */}
      {showMessageOptions && selectedMessageId && (
        <MessageOptionsMenu
          messageId={selectedMessageId}
          messageContent={messages.find(msg => msg.id === selectedMessageId)?.content || ''}
          isSentByMe={messages.find(msg => msg.id === selectedMessageId)?.isSentByMe || false}
          position={messageMenuPosition}
          onClose={() => setShowMessageOptions(false)}
          onDelete={handleDeleteMessage}
          onSave={handleSaveMessage}
          onEdit={handleEditMessage}
          onForward={handleForwardMessage}
          onReply={handleReplyToMessage}
          onCopy={handleCopyMessage}
        />
      )}
    </div>
  );
}
