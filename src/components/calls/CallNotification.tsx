'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, X, Mic, MicOff, VolumeX } from 'lucide-react';
import Image from 'next/image';

interface CallNotificationProps {
  contactName: string;
  contactAvatar: string;
  callType: 'voice' | 'video';
  isIncoming: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onDismiss?: () => void;
}

export default function CallNotification({
  contactName,
  contactAvatar,
  callType,
  isIncoming,
  onAccept,
  onDecline,
  onDismiss
}: CallNotificationProps) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // عداد مدة المكالمة الواردة
  useEffect(() => {
    if (isIncoming) {
      const timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isIncoming]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -100, scale: 0.9 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm"
      >
        <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={contactAvatar}
                  alt={contactName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <h3 className="text-white font-semibold">{contactName}</h3>
                  <p className="text-white/80 text-sm">
                    {callType === 'video' ? 'Video Call' : 'Voice Call'}
                    {isIncoming && ` • ${formatDuration(duration)}`}
                  </p>
                </div>
              </div>
              
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {isIncoming ? (
              // مكالمة واردة
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {/* Decline Button */}
                  <button
                    onClick={onDecline}
                    className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg"
                  >
                    <X size={24} className="text-white" />
                  </button>

                  {/* Accept Button */}
                  <button
                    onClick={onAccept}
                    className={`p-4 rounded-full transition-colors shadow-lg ${
                      callType === 'video' 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {callType === 'video' ? (
                      <Video size={24} className="text-white" />
                    ) : (
                      <Phone size={24} className="text-white" />
                    )}
                  </button>

                  {/* Mute Button */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-4 bg-gray-500 hover:bg-gray-600 rounded-full transition-colors shadow-lg"
                  >
                    {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
                  </button>
                </div>

                <p className="text-on-surface-variant text-sm">
                  Swipe up to answer or swipe down to decline
                </p>
              </div>
            ) : (
              // مكالمة صادرة
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {/* Cancel Button */}
                  <button
                    onClick={onDecline}
                    className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg"
                  >
                    <X size={24} className="text-white" />
                  </button>

                  {/* Mute Button */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full transition-colors shadow-lg ${
                      isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                  >
                    {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
                  </button>

                  {/* Speaker Button */}
                  <button
                    onClick={() => console.log('Toggle speaker clicked')}
                    className="p-4 bg-gray-500 hover:bg-gray-600 rounded-full transition-colors shadow-lg"
                  >
                    <VolumeX size={24} className="text-white" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-on-surface text-sm font-medium">Calling...</p>
                  </div>
                  <p className="text-on-surface-variant text-sm">
                    Waiting for {contactName} to answer
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Call Quality Indicator */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-2 bg-green-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
