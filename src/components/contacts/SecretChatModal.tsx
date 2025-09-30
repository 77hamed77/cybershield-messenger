'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Lock, 
  Shield, 
  Clock, 
  Eye, 
  EyeOff,
  Settings,
  AlertTriangle,
  Check,
  Timer
} from 'lucide-react';
import Image from 'next/image';
import { Contact } from '@/types';

interface SecretChatModalProps {
  contact: Contact;
  onClose: () => void;
  onStartSecretChat: (settings: SecretChatSettings) => void;
}

interface SecretChatSettings {
  selfDestruct: boolean;
  timerMinutes: number;
  screenshotProtection: boolean;
  forwardProtection: boolean;
  readReceipts: boolean;
}

export default function SecretChatModal({
  contact,
  onClose,
  onStartSecretChat
}: SecretChatModalProps) {
  const [settings, setSettings] = useState<SecretChatSettings>({
    selfDestruct: false,
    timerMinutes: 60,
    screenshotProtection: true,
    forwardProtection: true,
    readReceipts: false
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleStartChat = async () => {
    setIsCreating(true);
    
    // محاكاة إنشاء المحادثة السرية
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onStartSecretChat(settings);
    setIsCreating(false);
    onClose();
  };

  const timerOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 240, label: '4 hours' },
    { value: 1440, label: '24 hours' },
    { value: 0, label: 'Never' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background border border-border rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Shield size={20} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-primary">Secret Chat</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Contact Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
            <Image
              src={contact.avatarUrl}
              alt={contact.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-primary">{contact.name}</h3>
              <p className="text-sm text-on-surface-variant">@{contact.username}</p>
            </div>
            <div className="flex items-center space-x-1 text-purple-600">
              <Lock size={16} />
              <span className="text-xs font-medium">SECRET</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-purple-50 border-l-4 border-purple-400">
          <div className="flex items-start space-x-2">
            <AlertTriangle size={16} className="text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-800">End-to-End Encryption</p>
              <p className="text-xs text-purple-700">
                Messages are encrypted and can only be read by you and {contact.name}. 
                Not even CyberShield can access them.
              </p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 space-y-4">
          <h4 className="text-sm font-medium text-on-surface-variant uppercase tracking-wide">
            Security Settings
          </h4>

          {/* Self-Destruct Messages */}
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-3">
              <Timer size={20} className="text-orange-600" />
              <div>
                <p className="font-medium text-on-surface">Self-Destruct Messages</p>
                <p className="text-sm text-on-surface-variant">
                  Messages automatically delete after a set time
                </p>
              </div>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, selfDestruct: !prev.selfDestruct }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.selfDestruct ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.selfDestruct ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Timer Selection */}
          {settings.selfDestruct && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 bg-orange-50 rounded-lg"
            >
              <p className="text-sm font-medium text-orange-800 mb-2">Delete messages after:</p>
              <div className="grid grid-cols-2 gap-2">
                {timerOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSettings(prev => ({ ...prev, timerMinutes: option.value }))}
                    className={`p-2 rounded-lg text-sm transition-colors ${
                      settings.timerMinutes === option.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-white border border-orange-200 text-orange-800'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Screenshot Protection */}
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-3">
              <EyeOff size={20} className="text-red-600" />
              <div>
                <p className="font-medium text-on-surface">Screenshot Protection</p>
                <p className="text-sm text-on-surface-variant">
                  Prevents screenshots of messages
                </p>
              </div>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, screenshotProtection: !prev.screenshotProtection }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.screenshotProtection ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.screenshotProtection ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Forward Protection */}
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield size={20} className="text-blue-600" />
              <div>
                <p className="font-medium text-on-surface">Forward Protection</p>
                <p className="text-sm text-on-surface-variant">
                  Prevents forwarding messages to other chats
                </p>
              </div>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, forwardProtection: !prev.forwardProtection }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.forwardProtection ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.forwardProtection ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Read Receipts */}
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-3">
              <Eye size={20} className="text-green-600" />
              <div>
                <p className="font-medium text-on-surface">Read Receipts</p>
                <p className="text-sm text-on-surface-variant">
                  Show when messages are read (less private)
                </p>
              </div>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, readReceipts: !prev.readReceipts }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.readReceipts ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.readReceipts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Advanced Settings Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface/80 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Settings size={20} className="text-on-surface-variant" />
              <span className="text-on-surface">Advanced Settings</span>
            </div>
            <div className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>
              <Settings size={16} className="text-on-surface-variant" />
            </div>
          </button>

          {/* Advanced Settings */}
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Advanced settings include message verification, 
                  perfect forward secrecy, and additional encryption layers. 
                  These are enabled by default for maximum security.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <button
            onClick={handleStartChat}
            disabled={isCreating}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isCreating ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Creating Secret Chat...</span>
              </>
            ) : (
              <>
                <Lock size={20} />
                <span>Start Secret Chat</span>
              </>
            )}
          </button>
          
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-border rounded-lg text-on-surface hover:bg-surface/50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
