'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Volume2, Vibrate, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotificationsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    messages: true,
    calls: true,
    groups: true,
    channels: false,
    sound: true,
    vibration: true,
    preview: true,
    doNotDisturb: false,
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-primary" />
          </button>
          <h1 className="text-lg font-semibold text-primary">Notifications and Sounds</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        {/* Notification Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-surface border border-border rounded-lg p-4"
        >
          <h2 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Bell size={20} />
            <span>Notifications</span>
          </h2>
          
          <div className="space-y-4">
            {/* Messages */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Messages</p>
                <p className="text-sm text-on-surface-variant">Get notified about new messages</p>
              </div>
              <button
                onClick={() => handleToggle('messages')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.messages ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.messages ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Calls */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Calls</p>
                <p className="text-sm text-on-surface-variant">Get notified about incoming calls</p>
              </div>
              <button
                onClick={() => handleToggle('calls')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.calls ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.calls ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Groups */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Groups</p>
                <p className="text-sm text-on-surface-variant">Get notified about group messages</p>
              </div>
              <button
                onClick={() => handleToggle('groups')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.groups ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.groups ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Channels */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Channels</p>
                <p className="text-sm text-on-surface-variant">Get notified about channel updates</p>
              </div>
              <button
                onClick={() => handleToggle('channels')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.channels ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.channels ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sound Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-surface border border-border rounded-lg p-4"
        >
          <h2 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Volume2 size={20} />
            <span>Sounds</span>
          </h2>
          
          <div className="space-y-4">
            {/* Sound */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Sound</p>
                <p className="text-sm text-on-surface-variant">Play sound for notifications</p>
              </div>
              <button
                onClick={() => handleToggle('sound')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.sound ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.sound ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Vibration */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Vibration</p>
                <p className="text-sm text-on-surface-variant">Vibrate for notifications</p>
              </div>
              <button
                onClick={() => handleToggle('vibration')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.vibration ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.vibration ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Preview */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Preview</p>
                <p className="text-sm text-on-surface-variant">Show message preview in notifications</p>
              </div>
              <button
                onClick={() => handleToggle('preview')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.preview ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.preview ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Do Not Disturb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-surface border border-border rounded-lg p-4"
        >
          <h2 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Moon size={20} />
            <span>Do Not Disturb</span>
          </h2>
          
          <div className="space-y-4">
            {/* Do Not Disturb */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Do Not Disturb</p>
                <p className="text-sm text-on-surface-variant">Silence all notifications</p>
              </div>
              <button
                onClick={() => handleToggle('doNotDisturb')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.doNotDisturb ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.doNotDisturb ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
