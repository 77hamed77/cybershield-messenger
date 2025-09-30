'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit, Phone, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { mockCalls } from '@/data/mockData';
import { Call, CallType } from '@/types';
import CallRow from './CallRow';
import TabButton from './TabButton';
import VoiceCallScreen from '@/components/calls/VoiceCallScreen';
import VideoCallScreen from '@/components/calls/VideoCallScreen';

export default function CallsScreen() {
  const router = useRouter();
  const [calls, setCalls] = useState<Call[]>(mockCalls);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [currentCall, setCurrentCall] = useState<Call | null>(null);

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'missed' && call.type === CallType.MISSED);
    return matchesSearch && matchesTab;
  });

  const handleCall = (callId: string) => {
    // Navigate to chat with the contact
    const call = calls.find(c => c.id === callId);
    if (call) {
      // Use call ID as contact ID for consistency
      router.push(`/main/chat/${callId}`);
    }
  };

  const handleInfo = (callId: string) => {
    // Navigate to contact info
    const call = calls.find(c => c.id === callId);
    if (call) {
      // Use call ID as contact ID for consistency
      router.push(`/main/contact/${callId}`);
    }
  };

  const handleCallRowClick = (callId: string) => {
    // Navigate to chat when clicking on the call row
    handleCall(callId);
  };

  const handleVoiceCall = (callId: string) => {
    const call = calls.find(c => c.id === callId);
    if (call) {
      setCurrentCall(call);
      setShowVoiceCall(true);
    }
  };

  const handleVideoCall = (callId: string) => {
    const call = calls.find(c => c.id === callId);
    if (call) {
      setCurrentCall(call);
      setShowVideoCall(true);
    }
  };

  const handleEndCall = () => {
    setShowVoiceCall(false);
    setShowVideoCall(false);
    setCurrentCall(null);
  };

  const handleMinimizeCall = () => {
    console.log('Call minimized');
  };

  const handleSendMessageFromCall = () => {
    setShowVoiceCall(false);
    setShowVideoCall(false);
    setCurrentCall(null);
    if (currentCall) {
      router.push(`/main/chat/${currentCall.id}`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border">
        <div className="px-4 sm:px-6 py-3">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Title */}
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
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Calls</h1>
                <p className="text-xs text-on-surface-variant">Recent conversations</p>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex items-center space-x-2">
              <TabButton
                label="All"
                active={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
              />
              <TabButton
                label="Missed"
                active={activeTab === 'missed'}
                onClick={() => setActiveTab('missed')}
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" size={20} />
            <input
              type="text"
              placeholder="Search for calls or users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-2xl text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Calls List */}
      <div className="flex-1 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-1"
        >
          {filteredCalls.map((call, index) => (
            <motion.div
              key={call.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CallRow
                call={call}
                onInfo={() => handleInfo(call.id)}
                onRowClick={() => handleCallRowClick(call.id)}
                onVoiceCall={() => handleVoiceCall(call.id)}
                onVideoCall={() => handleVideoCall(call.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCalls.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center px-8">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
              <Phone className="text-on-surface-variant" size={32} />
            </div>
            <h3 className="text-lg font-medium text-on-surface mb-2">No calls found</h3>
            <p className="text-on-surface-variant text-sm">
              {searchQuery ? 'Try adjusting your search terms' : 'Your call history will appear here'}
            </p>
          </div>
        )}
      </div>

      {/* Voice Call Screen */}
      {showVoiceCall && currentCall && (
        <VoiceCallScreen
          contactName={currentCall?.name || 'Unknown'}
          contactAvatar={currentCall?.avatarUrl || '/images/logo.png'}
          onEndCall={handleEndCall}
          onMinimize={handleMinimizeCall}
          onSendMessage={handleSendMessageFromCall}
        />
      )}

      {/* Video Call Screen */}
      {showVideoCall && currentCall && (
        <VideoCallScreen
          contactName={currentCall?.name || 'Unknown'}
          contactAvatar={currentCall?.avatarUrl || '/images/logo.png'}
          onEndCall={handleEndCall}
          onMinimize={handleMinimizeCall}
          onSendMessage={handleSendMessageFromCall}
        />
      )}
    </div>
  );
}
