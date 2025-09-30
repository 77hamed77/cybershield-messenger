'use client';

import { motion } from 'framer-motion';
import { Info, PhoneCall, Video } from 'lucide-react';
import Image from 'next/image';
import { Call, CallType } from '@/types';

interface CallRowProps {
  call: Call;
  onInfo: () => void;
  onRowClick?: () => void;
  onVoiceCall?: () => void;
  onVideoCall?: () => void;
}

export default function CallRow({ call, onInfo, onRowClick, onVoiceCall, onVideoCall }: CallRowProps) {
  const getCallTypeLabel = (type: CallType) => {
    switch (type) {
      case CallType.OUTGOING:
        return 'Outgoing';
      case CallType.INCOMING:
        return 'Incoming';
      case CallType.MISSED:
        return 'Missed';
      default:
        return 'Unknown';
    }
  };

  const getCallTypeColor = (type: CallType) => {
    switch (type) {
      case CallType.MISSED:
        return 'text-error';
      case CallType.OUTGOING:
      case CallType.INCOMING:
        return 'text-primary';
      default:
        return 'text-on-surface-variant';
    }
  };

  return (
    <motion.div
      className="group"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className="flex items-center p-4 hover:bg-surface/30 transition-colors cursor-pointer"
        onClick={onRowClick}
      >
        {/* Avatar */}
        <div className="relative mr-3">
          <Image
            src={call.avatarUrl}
            alt={call.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold text-sm truncate ${
              call.type === CallType.MISSED ? 'text-error' : 'text-primary'
            }`}>
              {call.name}
            </h3>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-on-surface-variant">
                {call.time}
              </span>
              {/* Call buttons */}
              {onVoiceCall && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onVoiceCall();
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surface/50 rounded-full"
                  title="Voice call"
                >
                  <PhoneCall size={14} className="text-green-600" />
                </button>
              )}
              {onVideoCall && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideoCall();
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surface/50 rounded-full"
                  title="Video call"
                >
                  <Video size={14} className="text-blue-600" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onInfo();
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surface/50 rounded-full"
                title="View contact info"
              >
                <Info size={14} className="text-primary" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className={`text-sm truncate ${
              call.type === CallType.MISSED ? 'text-error' : 'text-on-surface-variant'
            }`}>
              {getCallTypeLabel(call.type)}
              {call.duration && ` • ${call.duration}`}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
