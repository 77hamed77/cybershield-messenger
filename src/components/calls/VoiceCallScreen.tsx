'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mic, 
  MicOff, 
  Speaker, 
  VolumeX,
  Settings, 
  Users, 
  MessageCircle,
  X,
  Minimize,
  Volume2,
  Wifi,
  WifiOff,
  AlertTriangle,
  Circle,
  Square
} from 'lucide-react';
import Image from 'next/image';

interface VoiceCallScreenProps {
  contactName: string;
  contactAvatar: string;
  onEndCall: () => void;
  onMinimize: () => void;
  onSendMessage: () => void;
}

export default function VoiceCallScreen({ 
  contactName, 
  contactAvatar, 
  onEndCall, 
  onMinimize,
  onSendMessage 
}: VoiceCallScreenProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [callQuality, setCallQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [isRecording, setIsRecording] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'connected' | 'weak' | 'disconnected'>('connected');

  // محاكاة الاتصال
  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
      setCallStatus('connected');
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, []);

  // عداد مدة المكالمة
  useEffect(() => {
    if (isConnected && callStatus === 'connected') {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConnected, callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onEndCall();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src={contactAvatar}
            alt={contactName}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="text-white font-semibold">{contactName}</h3>
            <div className="flex items-center space-x-2">
              <p className="text-gray-300 text-sm">
                {callStatus === 'connecting' ? 'Connecting...' : 
                 callStatus === 'connected' ? formatDuration(callDuration) : 
                 'Call ended'}
              </p>
              {/* Network Status */}
              {networkStatus === 'connected' && (
                <Wifi size={14} className="text-green-400" />
              )}
              {networkStatus === 'weak' && (
                <AlertTriangle size={14} className="text-yellow-400" />
              )}
              {networkStatus === 'disconnected' && (
                <WifiOff size={14} className="text-red-400" />
              )}
              {/* Call Quality Indicator */}
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-3 rounded ${
                      i < (callQuality === 'excellent' ? 3 : callQuality === 'good' ? 2 : 1)
                        ? 'bg-green-400'
                        : 'bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Recording Indicator */}
          {isRecording && (
            <div className="flex items-center space-x-1 bg-red-500 px-2 py-1 rounded-full">
              <Circle size={12} className="text-white fill-white animate-pulse" />
              <span className="text-white text-xs font-medium">REC</span>
            </div>
          )}
          
          <button
            onClick={onMinimize}
            className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
            title="Minimize call"
          >
            <Minimize size={20} />
          </button>
          <button
            onClick={handleEndCall}
            className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="relative">
            <Image
              src={contactAvatar}
              alt={contactName}
              width={200}
              height={200}
              className="rounded-full object-cover border-4 border-white/20"
            />
            
            {/* Pulse Animation for Connected Call */}
            {callStatus === 'connected' && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-green-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            {/* Connection Status Indicator */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
              {callStatus === 'connecting' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Phone size={20} className="text-white" />
                </motion.div>
              ) : callStatus === 'connected' ? (
                <Volume2 size={20} className="text-white" />
              ) : (
                <Phone size={20} className="text-white" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Contact Name and Status */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">{contactName}</h2>
          <p className="text-gray-300 text-lg">
            {callStatus === 'connecting' ? 'Connecting...' : 
             callStatus === 'connected' ? 'Connected' : 
             'Call ended'}
          </p>
          {callStatus === 'connected' && (
            <p className="text-gray-400 text-sm mt-1">
              Duration: {formatDuration(callDuration)}
            </p>
          )}
        </motion.div>

        {/* Audio Visualization */}
        {callStatus === 'connected' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-1 mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-white/60 rounded-full"
                animate={{
                  height: [20, 40, 20],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Connection Status Overlay */}
        {callStatus === 'connecting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-white text-lg">Connecting to {contactName}...</p>
              <p className="text-gray-300 text-sm mt-2">Please wait</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Mute/Unmute */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-colors ${
                isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
            </button>

            {/* Speaker On/Off */}
            <button
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              className={`p-3 rounded-full transition-colors ${
                isSpeakerOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
              }`}
              title={isSpeakerOn ? 'Turn off speaker' : 'Turn on speaker'}
            >
              {isSpeakerOn ? <Speaker size={24} className="text-white" /> : <VolumeX size={24} className="text-white" />}
            </button>

            {/* Participants */}
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              title="Participants"
            >
              <Users size={24} className="text-white" />
            </button>

            {/* Recording */}
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-3 rounded-full transition-colors ${
                isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
              }`}
              title={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? <Square size={24} className="text-white" /> : <Circle size={24} className="text-white" />}
            </button>

            {/* Send Message */}
            <button
              onClick={onSendMessage}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              title="Send message"
            >
              <MessageCircle size={24} className="text-white" />
            </button>

            {/* Settings */}
            <button
              onClick={() => console.log('Call settings clicked')}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              title="Call settings"
            >
              <Settings size={24} className="text-white" />
            </button>

            {/* End Call */}
            <button
              onClick={handleEndCall}
              className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
              title="End call"
            >
              <Phone size={24} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Participants Panel */}
      {showParticipants && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-4 top-20 bottom-20 w-80 bg-black/50 backdrop-blur-sm rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Participants</h3>
            <button
              onClick={() => setShowParticipants(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg">
              <Image
                src={contactAvatar}
                alt={contactName}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-white text-sm font-medium">{contactName}</p>
                <p className="text-gray-300 text-xs">Connected</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">You</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">You</p>
                <p className="text-gray-300 text-xs">Connected</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
