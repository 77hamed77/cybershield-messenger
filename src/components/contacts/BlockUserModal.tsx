'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Ban, 
  AlertTriangle,
  Shield,
  UserX,
  MessageCircle,
  Phone,
  Video,
  CheckCircle,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import { Contact } from '@/types';

interface BlockUserModalProps {
  contact: Contact;
  onClose: () => void;
  onConfirmBlock: (reason: string, blockOptions: BlockOptions) => void;
}

interface BlockOptions {
  deleteChatHistory: boolean;
  reportUser: boolean;
  blockDuration: 'permanent' | '24hours' | '7days' | '30days';
  notifyUser: boolean;
}

export default function BlockUserModal({
  contact,
  onClose,
  onConfirmBlock
}: BlockUserModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [blockOptions, setBlockOptions] = useState<BlockOptions>({
    deleteChatHistory: true,
    reportUser: false,
    blockDuration: 'permanent',
    notifyUser: false
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);

  const blockReasons = [
    { id: 'spam', label: 'Spam or unwanted messages', icon: MessageCircle },
    { id: 'harassment', label: 'Harassment or bullying', icon: AlertTriangle },
    { id: 'inappropriate', label: 'Inappropriate content', icon: Shield },
    { id: 'scam', label: 'Scam or fraud', icon: Ban },
    { id: 'other', label: 'Other reason', icon: UserX }
  ];

  const blockDurations = [
    { value: '24hours', label: '24 Hours' },
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
    { value: 'permanent', label: 'Permanent' }
  ];

  const handleBlock = async () => {
    if (!selectedReason) return;
    
    setIsBlocking(true);
    
    // محاكاة عملية الحظر
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onConfirmBlock(selectedReason, blockOptions);
    setIsBlocking(false);
    onClose();
  };

  const getReasonIcon = (reasonId: string) => {
    const reason = blockReasons.find(r => r.id === reasonId);
    return reason ? reason.icon : Ban;
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
            <Ban size={20} className="text-red-600" />
            <h2 className="text-lg font-semibold text-primary">Block User</h2>
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
            <div className="flex items-center space-x-1 text-red-600">
              <Ban size={16} />
              <span className="text-xs font-medium">BLOCK</span>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="p-4 bg-red-50 border-l-4 border-red-400">
          <div className="flex items-start space-x-2">
            <AlertTriangle size={16} className="text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Blocking {contact.name}</p>
              <p className="text-xs text-red-700">
                This will prevent them from contacting you and viewing your online status. 
                You can unblock them later if needed.
              </p>
            </div>
          </div>
        </div>

        {/* Block Reason */}
        <div className="p-4 space-y-3">
          <h4 className="text-sm font-medium text-on-surface-variant uppercase tracking-wide">
            Why are you blocking this user?
          </h4>
          
          <div className="space-y-2">
            {blockReasons.map((reason) => {
              const IconComponent = reason.icon;
              return (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReason(reason.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedReason === reason.id
                      ? 'bg-red-100 border border-red-300'
                      : 'bg-surface hover:bg-surface/80'
                  }`}
                >
                  <IconComponent 
                    size={20} 
                    className={selectedReason === reason.id ? 'text-red-600' : 'text-on-surface-variant'} 
                  />
                  <span className={`text-sm ${
                    selectedReason === reason.id ? 'text-red-800 font-medium' : 'text-on-surface'
                  }`}>
                    {reason.label}
                  </span>
                  {selectedReason === reason.id && (
                    <CheckCircle size={16} className="text-red-600 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Block Options */}
        <div className="p-4 border-t border-border space-y-4">
          <h4 className="text-sm font-medium text-on-surface-variant uppercase tracking-wide">
            Block Options
          </h4>

          {/* Delete Chat History */}
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageCircle size={20} className="text-orange-600" />
              <div>
                <p className="font-medium text-on-surface">Delete Chat History</p>
                <p className="text-sm text-on-surface-variant">
                  Remove all messages with this user
                </p>
              </div>
            </div>
            <button
              onClick={() => setBlockOptions(prev => ({ 
                ...prev, 
                deleteChatHistory: !prev.deleteChatHistory 
              }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                blockOptions.deleteChatHistory ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  blockOptions.deleteChatHistory ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Report User */}
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle size={20} className="text-red-600" />
              <div>
                <p className="font-medium text-on-surface">Report User</p>
                <p className="text-sm text-on-surface-variant">
                  Report this user to CyberShield support
                </p>
              </div>
            </div>
            <button
              onClick={() => setBlockOptions(prev => ({ 
                ...prev, 
                reportUser: !prev.reportUser 
              }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                blockOptions.reportUser ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  blockOptions.reportUser ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Block Duration */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-blue-600" />
              <div>
                <p className="font-medium text-on-surface">Block Duration</p>
                <p className="text-sm text-on-surface-variant">
                  How long should this user be blocked?
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 ml-8">
              {blockDurations.map((duration) => (
                <button
                  key={duration.value}
                  onClick={() => setBlockOptions(prev => ({ 
                    ...prev, 
                    blockDuration: duration.value as any 
                  }))}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    blockOptions.blockDuration === duration.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-surface border border-border text-on-surface'
                  }`}
                >
                  {duration.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* What happens when blocked */}
        <div className="p-4 bg-gray-50 border-t border-border">
          <h5 className="text-sm font-medium text-gray-800 mb-2">What happens when blocked:</h5>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Cannot send you messages or make calls</li>
            <li>• Cannot see your online status</li>
            <li>• Cannot view your profile or contact info</li>
            <li>• Will be removed from shared groups</li>
            {blockOptions.deleteChatHistory && (
              <li>• All chat history will be deleted</li>
            )}
            {blockOptions.reportUser && (
              <li>• User will be reported to support</li>
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <button
            onClick={handleBlock}
            disabled={!selectedReason || isBlocking}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isBlocking ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Blocking User...</span>
              </>
            ) : (
              <>
                <Ban size={20} />
                <span>Block {contact.name}</span>
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
