'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Settings, 
  Users, 
  MessageCircle,
  X,
  Minimize,
  Maximize,
  Monitor,
  MonitorOff,
  Square,
  Circle,
  Wifi,
  WifiOff,
  AlertTriangle
} from 'lucide-react';
import Image from 'next/image';

interface VideoCallScreenProps {
  contactName: string;
  contactAvatar: string;
  onEndCall: () => void;
  onMinimize: () => void;
  onSendMessage: () => void;
}

export default function VideoCallScreen({ 
  contactName, 
  contactAvatar, 
  onEndCall, 
  onMinimize,
  onSendMessage 
}: VideoCallScreenProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [callQuality, setCallQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'connected' | 'weak' | 'disconnected'>('connected');

  // محاكاة الاتصال
  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  // عداد مدة المكالمة
  useEffect(() => {
    if (isConnected) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
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
                {isConnected ? formatDuration(callDuration) : 'Connecting...'}
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
          {/* Screen Sharing Indicator */}
          {isScreenSharing && (
            <div className="flex items-center space-x-1 bg-blue-500 px-2 py-1 rounded-full">
              <Monitor size={12} className="text-white" />
              <span className="text-white text-xs font-medium">SHARING</span>
            </div>
          )}
          
          <button
            onClick={onMinimize}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            title="Minimize call"
          >
            <Minimize size={20} />
          </button>
          <button
            onClick={onEndCall}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video (Contact) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
          {isVideoOff ? (
            <div className="text-center">
              <Image
                src={contactAvatar}
                alt={contactName}
                width={200}
                height={200}
                className="rounded-full object-cover mx-auto mb-4"
              />
              <p className="text-white text-xl font-semibold">{contactName}</p>
              <p className="text-gray-300">Video is off</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-96 h-96 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <Video size={64} className="text-gray-400" />
              </div>
              <p className="text-white text-xl font-semibold">{contactName}</p>
            </div>
          )}
        </div>

        {/* Local Video (User) */}
        <div className="absolute top-20 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden">
          {!isVideoOff ? (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <Video size={24} className="text-gray-400" />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
              <VideoOff size={24} className="text-gray-400" />
            </div>
          )}
          <div className="absolute bottom-1 left-1 right-1 bg-black/50 rounded text-white text-xs text-center py-1">
            You
          </div>
        </div>

        {/* Connection Status */}
        {!isConnected && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white text-lg">Connecting...</p>
              <p className="text-gray-300 text-sm">Please wait</p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-6 py-4">
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

            {/* Video On/Off */}
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-full transition-colors ${
                isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
              }`}
              title={isVideoOff ? 'Turn on video' : 'Turn off video'}
            >
              {isVideoOff ? <VideoOff size={24} className="text-white" /> : <Video size={24} className="text-white" />}
            </button>

            {/* Participants */}
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              title="Participants"
            >
              <Users size={24} className="text-white" />
            </button>

            {/* Screen Share */}
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-3 rounded-full transition-colors ${
                isScreenSharing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/20 hover:bg-white/30'
              }`}
              title={isScreenSharing ? 'Stop screen sharing' : 'Start screen sharing'}
            >
              {isScreenSharing ? <MonitorOff size={24} className="text-white" /> : <Monitor size={24} className="text-white" />}
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
              onClick={onEndCall}
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
          className="absolute right-4 top-20 bottom-20 w-80 bg-black/80 backdrop-blur-sm rounded-lg p-4"
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
