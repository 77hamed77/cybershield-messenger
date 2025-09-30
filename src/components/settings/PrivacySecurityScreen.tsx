'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, Users, Bell, Key } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    lastSeen: 'everybody',
    profilePhoto: 'everybody',
    phoneNumber: 'contacts',
    readReceipts: true,
    onlineStatus: true,
    twoStepVerification: false,
    blockedUsers: 0,
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSelect = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
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
          <h1 className="text-lg font-semibold text-primary">Privacy and Security</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-surface border border-border rounded-lg p-4"
        >
          <h2 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Shield size={20} />
            <span>Privacy</span>
          </h2>
          
          <div className="space-y-4">
            {/* Last Seen */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Last Seen</p>
                <p className="text-sm text-on-surface-variant">Who can see your last seen time</p>
              </div>
              <select
                value={settings.lastSeen}
                onChange={(e) => handleSelect('lastSeen', e.target.value)}
                className="bg-input border border-border rounded-lg px-3 py-2 text-on-surface"
              >
                <option value="everybody">Everybody</option>
                <option value="contacts">Contacts</option>
                <option value="nobody">Nobody</option>
              </select>
            </div>

            {/* Profile Photo */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Profile Photo</p>
                <p className="text-sm text-on-surface-variant">Who can see your profile photo</p>
              </div>
              <select
                value={settings.profilePhoto}
                onChange={(e) => handleSelect('profilePhoto', e.target.value)}
                className="bg-input border border-border rounded-lg px-3 py-2 text-on-surface"
              >
                <option value="everybody">Everybody</option>
                <option value="contacts">Contacts</option>
                <option value="nobody">Nobody</option>
              </select>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Phone Number</p>
                <p className="text-sm text-on-surface-variant">Who can see your phone number</p>
              </div>
              <select
                value={settings.phoneNumber}
                onChange={(e) => handleSelect('phoneNumber', e.target.value)}
                className="bg-input border border-border rounded-lg px-3 py-2 text-on-surface"
              >
                <option value="everybody">Everybody</option>
                <option value="contacts">Contacts</option>
                <option value="nobody">Nobody</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-surface border border-border rounded-lg p-4"
        >
          <h2 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Lock size={20} />
            <span>Security</span>
          </h2>
          
          <div className="space-y-4">
            {/* Two-Step Verification */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Two-Step Verification</p>
                <p className="text-sm text-on-surface-variant">Add an extra layer of security</p>
              </div>
              <button
                onClick={() => handleToggle('twoStepVerification')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.twoStepVerification ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.twoStepVerification ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Blocked Users */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Blocked Users</p>
                <p className="text-sm text-on-surface-variant">{settings.blockedUsers} users blocked</p>
              </div>
              {/* Manage button removed - not needed in privacy settings */}
            </div>
          </div>
        </motion.div>

        {/* Activity Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-surface border border-border rounded-lg p-4"
        >
          <h2 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Eye size={20} />
            <span>Activity</span>
          </h2>
          
          <div className="space-y-4">
            {/* Read Receipts */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Read Receipts</p>
                <p className="text-sm text-on-surface-variant">Show when you read messages</p>
              </div>
              <button
                onClick={() => handleToggle('readReceipts')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.readReceipts ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.readReceipts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Online Status */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface font-medium">Online Status</p>
                <p className="text-sm text-on-surface-variant">Show when you&apos;re online</p>
              </div>
              <button
                onClick={() => handleToggle('onlineStatus')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.onlineStatus ? 'bg-primary' : 'bg-input'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.onlineStatus ? 'translate-x-6' : 'translate-x-1'
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
