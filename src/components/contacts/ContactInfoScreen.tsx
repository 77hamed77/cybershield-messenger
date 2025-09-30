'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Share, 
  Lock, 
  Image as ImageIcon,
  Bell,
  Users,
  Ban,
  Video,
  PhoneCall
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Contact } from '@/types';
import ShareContactModal from './ShareContactModal';
import SecretChatModal from './SecretChatModal';
import BlockUserModal from './BlockUserModal';
import SharedMediaModal from './SharedMediaModal';
import NotificationSettingsModal from './NotificationSettingsModal';
import VideoCallScreen from '@/components/calls/VideoCallScreen';
import VoiceCallScreen from '@/components/calls/VoiceCallScreen';

interface ContactInfoScreenProps {
  contact: Contact;
  onBack: () => void;
}

export default function ContactInfoScreen({ contact, onBack }: ContactInfoScreenProps) {
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSecretChatModal, setShowSecretChatModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showSharedMediaModal, setShowSharedMediaModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [showCallOptions, setShowCallOptions] = useState(false);

  const handleCall = (type: 'voice' | 'video') => {
    if (type === 'voice') {
      setShowVoiceCall(true);
    } else {
      setShowVideoCall(true);
    }
    setShowCallOptions(false);
  };

  const handleEndCall = () => {
    setShowVideoCall(false);
    setShowVoiceCall(false);
  };

  const handleMinimizeCall = () => {
    console.log('Call minimized');
  };

  const handleSendMessageFromCall = () => {
    setShowVideoCall(false);
    setShowVoiceCall(false);
    router.push(`/main/chat/${contact.id}`);
  };

  const handleShareViaMessage = () => {
    console.log('Share via message:', contact);
  };

  const handleShareViaEmail = () => {
    const subject = `Check out ${contact.name}'s contact`;
    const body = `Name: ${contact.name}\nUsername: @${contact.username}\nPhone: ${contact.phone || 'N/A'}\nBio: ${contact.bio || 'N/A'}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleShareViaSMS = () => {
    const text = `Check out ${contact.name}'s contact: @${contact.username}`;
    window.open(`sms:?body=${encodeURIComponent(text)}`);
  };

  const handleStartSecretChat = (settings: any) => {
    console.log('Starting secret chat with settings:', settings);
    router.push(`/main/chat/${contact.id}?secret=true`);
  };

  const handleConfirmBlock = (reason: string, options: any) => {
    console.log('Blocking user:', contact, 'Reason:', reason, 'Options:', options);
    // هنا يمكن إضافة منطق حظر المستخدم الفعلي
  };

  const handleSharedMedia = () => {
    setShowSharedMediaModal(true);
  };

  const handleNotificationSettings = () => {
    setShowNotificationModal(true);
  };

  const handleSaveNotificationSettings = (settings: any) => {
    console.log('Saving notification settings:', settings);
    // هنا يمكن إضافة منطق حفظ إعدادات الإشعارات
  };

  // إغلاق القائمة المنسدلة عند النقر خارجها
  const handleClickOutside = (e: React.MouseEvent) => {
    if (showCallOptions) {
      setShowCallOptions(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background" onClick={handleClickOutside}>
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-primary" />
          </button>
          <h1 className="text-lg font-semibold text-primary">Info</h1>
          <button 
            onClick={onBack}
            className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
          >
            Done
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="m-4 p-4 bg-surface border border-border rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <Image
              src={contact.avatarUrl}
              alt={contact.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-primary">{contact.name}</h2>
              <p className="text-sm text-blue-500">{contact.status}</p>
            </div>
            {/* Call Options */}
            <div className="relative">
              <button 
                className="p-2 hover:bg-surface/50 rounded-full transition-colors"
                onClick={() => setShowCallOptions(!showCallOptions)}
                title="Call options"
              >
                <Phone size={20} className="text-primary" />
              </button>
              
              {/* Call Options Dropdown */}
              {showCallOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-10"
                >
                  <button
                    onClick={() => handleCall('voice')}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 transition-colors"
                  >
                    <PhoneCall size={16} className="text-green-600" />
                    <span className="text-on-surface">Voice Call</span>
                  </button>
                  <button
                    onClick={() => handleCall('video')}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 transition-colors"
                  >
                    <Video size={16} className="text-blue-600" />
                    <span className="text-on-surface">Video Call</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Contact Details */}
        <div className="px-4 space-y-1">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-4 hover:bg-surface/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">His mission</p>
                <p className="text-sm text-on-surface-variant">{contact.mission || 'أمن دولة'}</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-4 hover:bg-surface/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Bio</p>
                <p className="text-sm text-on-surface-variant">{contact.bio || 'مدير مهام شعبة التجنيد الاستخباراتي (قائد فصيلة)'}</p>
              </div>
            </div>
          </motion.div>

          {/* Username */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="p-4 hover:bg-surface/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">UserName</p>
                <p className="text-sm text-on-surface-variant">{contact.username}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-4"></div>

        {/* Actions */}
        <div className="px-4 space-y-1">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="w-full p-4 text-left hover:bg-surface/30 transition-colors"
            onClick={() => router.push(`/main/chat/${contact.id}`)}
            title="Send a message to this contact"
          >
            <div className="flex items-center space-x-3">
              <MessageCircle size={20} className="text-primary" />
              <span className="text-primary">Send Message</span>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="w-full p-4 text-left hover:bg-surface/30 transition-colors"
            onClick={() => setShowShareModal(true)}
            title="Share this contact"
          >
            <div className="flex items-center space-x-3">
              <Share size={20} className="text-primary" />
              <span className="text-primary">Share Contact</span>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="w-full p-4 text-left hover:bg-surface/30 transition-colors"
            onClick={() => setShowSecretChatModal(true)}
            title="Start encrypted secret chat"
          >
            <div className="flex items-center space-x-3">
              <Lock size={20} className="text-primary" />
              <span className="text-primary">Start Secret Chat</span>
            </div>
          </motion.button>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-4"></div>

        {/* Additional Options */}
        <div className="px-4 space-y-1">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="w-full p-4 text-left hover:bg-surface/30 transition-colors"
            onClick={handleSharedMedia}
            title="View shared media"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ImageIcon size={20} className="text-primary" />
                <span className="text-primary">Shared Media</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-on-surface-variant">5 items</span>
                <ImageIcon size={16} className="text-on-surface-variant" />
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="w-full p-4 text-left hover:bg-surface/30 transition-colors"
            onClick={handleNotificationSettings}
            title="Manage notification settings"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-primary" />
                <span className="text-primary">Notifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-success">Enabled</span>
                <Bell size={16} className="text-success" />
              </div>
            </div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="w-full p-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users size={20} className="text-on-surface-variant" />
                <span className="text-on-surface-variant">Groups in Common</span>
              </div>
              <span className="text-success">1</span>
            </div>
          </motion.div>
        </div>

        {/* Block User */}
        <div className="px-4 py-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.0 }}
            className="w-full p-4 text-left hover:bg-surface/30 transition-colors"
            onClick={() => setShowBlockModal(true)}
            title="Block this user"
          >
            <div className="flex items-center space-x-3">
              <Ban size={20} className="text-error" />
              <span className="text-error font-semibold">Block User</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Modals and Call Screens */}
      {showShareModal && (
        <ShareContactModal
          contact={contact}
          onClose={() => setShowShareModal(false)}
          onShareViaMessage={handleShareViaMessage}
          onShareViaEmail={handleShareViaEmail}
          onShareViaSMS={handleShareViaSMS}
        />
      )}

      {showSecretChatModal && (
        <SecretChatModal
          contact={contact}
          onClose={() => setShowSecretChatModal(false)}
          onStartSecretChat={handleStartSecretChat}
        />
      )}

      {showBlockModal && (
        <BlockUserModal
          contact={contact}
          onClose={() => setShowBlockModal(false)}
          onConfirmBlock={handleConfirmBlock}
        />
      )}

      {showVideoCall && (
        <VideoCallScreen
          contactName={contact.name}
          contactAvatar={contact.avatarUrl}
          onEndCall={handleEndCall}
          onMinimize={handleMinimizeCall}
          onSendMessage={handleSendMessageFromCall}
        />
      )}

      {showVoiceCall && (
        <VoiceCallScreen
          contactName={contact.name}
          contactAvatar={contact.avatarUrl}
          onEndCall={handleEndCall}
          onMinimize={handleMinimizeCall}
          onSendMessage={handleSendMessageFromCall}
        />
      )}

      {showSharedMediaModal && (
        <SharedMediaModal
          contact={contact}
          onClose={() => setShowSharedMediaModal(false)}
        />
      )}

      {showNotificationModal && (
        <NotificationSettingsModal
          contact={contact}
          onClose={() => setShowNotificationModal(false)}
          onSaveSettings={handleSaveNotificationSettings}
        />
      )}
    </div>
  );
}
