'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Bell, 
  BellOff, 
  Volume2, 
  VolumeX, 
  Vibrate,
  MessageCircle,
  Phone,
  Video,
  Clock,
  Settings,
  Check,
  AlertCircle,
  Moon,
  Sun
} from 'lucide-react';
import Image from 'next/image';
import { Contact } from '@/types';

interface NotificationSettingsModalProps {
  contact: Contact;
  onClose: () => void;
  onSaveSettings: (settings: NotificationSettings) => void;
}

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibrate: boolean;
  showPreview: boolean;
  silentHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  messageNotifications: boolean;
  callNotifications: boolean;
  videoCallNotifications: boolean;
  customSound: string;
}

export default function NotificationSettingsModal({
  contact,
  onClose,
  onSaveSettings
}: NotificationSettingsModalProps) {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    sound: true,
    vibrate: true,
    showPreview: true,
    silentHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    messageNotifications: true,
    callNotifications: true,
    videoCallNotifications: true,
    customSound: 'default'
  });

  const [activeTab, setActiveTab] = useState<'general' | 'advanced' | 'sounds'>('general');
  const [isSaving, setIsSaving] = useState(false);

  const soundOptions = [
    { value: 'default', label: 'Default' },
    { value: 'gentle', label: 'Gentle' },
    { value: 'classic', label: 'Classic' },
    { value: 'modern', label: 'Modern' },
    { value: 'none', label: 'None' }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    
    // محاكاة حفظ الإعدادات
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSaveSettings(settings);
    setIsSaving(false);
    onClose();
  };

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSilentHours = () => {
    setSettings(prev => ({
      ...prev,
      silentHours: { ...prev.silentHours, enabled: !prev.silentHours.enabled }
    }));
  };

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
            <Bell size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-primary">Notification Settings</h2>
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
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
              settings.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {settings.enabled ? <Bell size={12} /> : <BellOff size={12} />}
              <span className="text-xs font-medium">
                {settings.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {[
            { id: 'general', label: 'General', icon: Bell },
            { id: 'advanced', label: 'Advanced', icon: Settings },
            { id: 'sounds', label: 'Sounds', icon: Volume2 }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <IconComponent size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 space-y-4">
          {activeTab === 'general' && (
            <>
              {/* Main Toggle */}
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  {settings.enabled ? (
                    <Bell size={20} className="text-green-600" />
                  ) : (
                    <BellOff size={20} className="text-gray-600" />
                  )}
                  <div>
                    <p className="font-medium text-on-surface">Enable Notifications</p>
                    <p className="text-sm text-on-surface-variant">
                      Receive notifications from {contact.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('enabled')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.enabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sound */}
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  {settings.sound ? (
                    <Volume2 size={20} className="text-blue-600" />
                  ) : (
                    <VolumeX size={20} className="text-gray-600" />
                  )}
                  <div>
                    <p className="font-medium text-on-surface">Sound</p>
                    <p className="text-sm text-on-surface-variant">
                      Play sound for notifications
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('sound')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.sound ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.sound ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Vibrate */}
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <Vibrate size={20} className="text-purple-600" />
                  <div>
                    <p className="font-medium text-on-surface">Vibrate</p>
                    <p className="text-sm text-on-surface-variant">
                      Vibrate device for notifications
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('vibrate')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.vibrate ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.vibrate ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Show Preview */}
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageCircle size={20} className="text-orange-600" />
                  <div>
                    <p className="font-medium text-on-surface">Show Preview</p>
                    <p className="text-sm text-on-surface-variant">
                      Show message content in notifications
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('showPreview')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.showPreview ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.showPreview ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </>
          )}

          {activeTab === 'advanced' && (
            <>
              {/* Silent Hours */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Moon size={20} className="text-indigo-600" />
                    <div>
                      <p className="font-medium text-on-surface">Silent Hours</p>
                      <p className="text-sm text-on-surface-variant">
                        Disable notifications during specified hours
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleSilentHours}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.silentHours.enabled ? 'bg-indigo-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.silentHours.enabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {settings.silentHours.enabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 bg-indigo-50 rounded-lg space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <Clock size={16} className="text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-800">From:</span>
                      <input
                        type="time"
                        value={settings.silentHours.start}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          silentHours: { ...prev.silentHours, start: e.target.value }
                        }))}
                        className="px-2 py-1 border border-indigo-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock size={16} className="text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-800">To:</span>
                      <input
                        type="time"
                        value={settings.silentHours.end}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          silentHours: { ...prev.silentHours, end: e.target.value }
                        }))}
                        className="px-2 py-1 border border-indigo-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Notification Types */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-on-surface-variant uppercase tracking-wide">
                  Notification Types
                </h4>

                <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MessageCircle size={20} className="text-green-600" />
                    <span className="font-medium text-on-surface">Messages</span>
                  </div>
                  <button
                    onClick={() => toggleSetting('messageNotifications')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.messageNotifications ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.messageNotifications ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-blue-600" />
                    <span className="font-medium text-on-surface">Voice Calls</span>
                  </div>
                  <button
                    onClick={() => toggleSetting('callNotifications')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.callNotifications ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.callNotifications ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Video size={20} className="text-purple-600" />
                    <span className="font-medium text-on-surface">Video Calls</span>
                  </div>
                  <button
                    onClick={() => toggleSetting('videoCallNotifications')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.videoCallNotifications ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.videoCallNotifications ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'sounds' && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-on-surface-variant uppercase tracking-wide">
                Sound Settings
              </h4>

              <div className="space-y-3">
                {soundOptions.map((sound) => (
                  <button
                    key={sound.value}
                    onClick={() => setSettings(prev => ({ ...prev, customSound: sound.value }))}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      settings.customSound === sound.value
                        ? 'bg-primary/10 border border-primary'
                        : 'bg-surface hover:bg-surface/80'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Volume2 size={16} className="text-on-surface-variant" />
                      <span className="text-on-surface">{sound.label}</span>
                    </div>
                    {settings.customSound === sound.value && (
                      <Check size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>

              {/* Sound Preview */}
              <div className="p-3 bg-surface rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-on-surface">Preview Sound</span>
                  <button
                    onClick={() => console.log('Playing sound preview')}
                    className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90 transition-colors"
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check size={20} />
                <span>Save Settings</span>
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
