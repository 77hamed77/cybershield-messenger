'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed, 
  Video, 
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  Calendar,
  Filter,
  Search,
  Trash2,
  RefreshCw,
  MoreVertical
} from 'lucide-react';
import Image from 'next/image';

interface Call {
  id: string;
  contactName: string;
  contactAvatar: string;
  type: 'voice' | 'video';
  direction: 'incoming' | 'outgoing' | 'missed';
  duration: number; // in seconds
  timestamp: Date;
  quality: 'excellent' | 'good' | 'poor';
}

interface CallHistoryManagerProps {
  calls: Call[];
  onCallBack: (call: Call) => void;
  onClearHistory: () => void;
  onRefresh: () => void;
}

export default function CallHistoryManager({
  calls,
  onCallBack,
  onClearHistory,
  onRefresh
}: CallHistoryManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'voice' | 'video'>('all');
  const [filterDirection, setFilterDirection] = useState<'all' | 'incoming' | 'outgoing' | 'missed'>('all');
  const [sortBy, setSortBy] = useState<'time' | 'duration' | 'contact'>('time');

  // تصفية وترتيب المكالمات
  const filteredCalls = calls
    .filter(call => {
      const matchesSearch = call.contactName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || call.type === filterType;
      const matchesDirection = filterDirection === 'all' || call.direction === filterDirection;
      return matchesSearch && matchesType && matchesDirection;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'time':
          return b.timestamp.getTime() - a.timestamp.getTime();
        case 'duration':
          return b.duration - a.duration;
        case 'contact':
          return a.contactName.localeCompare(b.contactName);
        default:
          return 0;
      }
    });

  const getCallIcon = (call: Call) => {
    if (call.type === 'video') {
      switch (call.direction) {
        case 'incoming': return ArrowDownLeft;
        case 'outgoing': return ArrowUpRight;
        case 'missed': return Video;
      }
    } else {
      switch (call.direction) {
        case 'incoming': return PhoneIncoming;
        case 'outgoing': return PhoneOutgoing;
        case 'missed': return PhoneMissed;
      }
    }
  };

  const getCallColor = (call: Call) => {
    if (call.direction === 'missed') return 'text-red-500';
    if (call.direction === 'incoming') return 'text-green-500';
    return 'text-blue-500';
  };

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return 'Missed';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-400';
      case 'good': return 'bg-yellow-400';
      case 'poor': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-on-surface">Call History</h2>
            <p className="text-sm text-on-surface-variant">
              {filteredCalls.length} of {calls.length} calls
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onRefresh}
              className="p-2 hover:bg-surface/50 rounded-full transition-colors"
              title="Refresh"
            >
              <RefreshCw size={20} className="text-on-surface-variant" />
            </button>
            <button
              onClick={onClearHistory}
              className="p-2 hover:bg-surface/50 rounded-full transition-colors"
              title="Clear history"
            >
              <Trash2 size={20} className="text-on-surface-variant" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-border">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search calls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="voice">Voice Only</option>
              <option value="video">Video Only</option>
            </select>

            <select
              value={filterDirection}
              onChange={(e) => setFilterDirection(e.target.value as any)}
              className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Calls</option>
              <option value="incoming">Incoming</option>
              <option value="outgoing">Outgoing</option>
              <option value="missed">Missed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="time">Sort by Time</option>
              <option value="duration">Sort by Duration</option>
              <option value="contact">Sort by Contact</option>
            </select>
          </div>
        </div>
      </div>

      {/* Call List */}
      <div className="flex-1 overflow-y-auto">
        {filteredCalls.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Phone size={48} className="text-on-surface-variant mx-auto mb-4" />
              <h3 className="text-lg font-medium text-on-surface mb-2">No calls found</h3>
              <p className="text-on-surface-variant">
                {searchTerm || filterType !== 'all' || filterDirection !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Your call history will appear here'}
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredCalls.map((call) => {
              const CallIcon = getCallIcon(call);
              return (
                <motion.div
                  key={call.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 hover:bg-surface/50 transition-colors cursor-pointer"
                  onClick={() => onCallBack(call)}
                >
                  <div className="flex items-center space-x-4">
                    {/* Contact Avatar */}
                    <Image
                      src={call.contactAvatar}
                      alt={call.contactName}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />

                    {/* Call Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-on-surface truncate">
                          {call.contactName}
                        </h3>
                        {/* Quality Indicator */}
                        <div className={`w-2 h-2 rounded-full ${getQualityColor(call.quality)}`} />
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-on-surface-variant">
                        <CallIcon size={14} className={getCallColor(call)} />
                        <span>{formatDuration(call.duration)}</span>
                        <span>•</span>
                        <span>{formatTime(call.timestamp)}</span>
                        <span>•</span>
                        <span className="capitalize">{call.type}</span>
                      </div>
                    </div>

                    {/* Call Back Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCallBack(call);
                      }}
                      className="p-2 hover:bg-surface/50 rounded-full transition-colors"
                      title="Call back"
                    >
                      <Phone size={20} className="text-primary" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
