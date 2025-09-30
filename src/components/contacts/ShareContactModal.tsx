'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Copy, 
  Share2, 
  MessageCircle, 
  Mail, 
  Smartphone,
  Check,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import { Contact } from '@/types';

interface ShareContactModalProps {
  contact: Contact;
  onClose: () => void;
  onShareViaMessage: () => void;
  onShareViaEmail: () => void;
  onShareViaSMS: () => void;
}

export default function ShareContactModal({
  contact,
  onClose,
  onShareViaMessage,
  onShareViaEmail,
  onShareViaSMS
}: ShareContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState<string>('');

  const contactInfo = {
    name: contact.name,
    username: contact.username,
    phone: contact.phone,
    bio: contact.bio,
    mission: contact.mission
  };

  const shareText = `Check out ${contact.name}'s contact:
Name: ${contact.name}
Username: @${contact.username}
${contact.phone ? `Phone: ${contact.phone}` : ''}
${contact.bio ? `Bio: ${contact.bio}` : ''}
${contact.mission ? `Mission: ${contact.mission}` : ''}

Shared via CyberShield Messenger`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareMethod = (method: string, action: () => void) => {
    setShareMethod(method);
    setTimeout(() => {
      action();
      onClose();
    }, 500);
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
          <h2 className="text-lg font-semibold text-primary">Share Contact</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Contact Preview */}
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
              {contact.phone && (
                <p className="text-sm text-on-surface-variant">{contact.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-on-surface-variant uppercase tracking-wide">
              Share via
            </h4>
            
            {/* Share via Message */}
            <button
              onClick={() => handleShareMethod('message', onShareViaMessage)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
            >
              <div className="p-2 bg-blue-100 rounded-full">
                <MessageCircle size={20} className="text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-on-surface">CyberShield Message</p>
                <p className="text-sm text-on-surface-variant">Send via internal messenger</p>
              </div>
              {shareMethod === 'message' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-blue-600"
                >
                  <Check size={20} />
                </motion.div>
              )}
            </button>

            {/* Share via Email */}
            <button
              onClick={() => handleShareMethod('email', onShareViaEmail)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
            >
              <div className="p-2 bg-red-100 rounded-full">
                <Mail size={20} className="text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-on-surface">Email</p>
                <p className="text-sm text-on-surface-variant">Share via email client</p>
              </div>
              {shareMethod === 'email' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-red-600"
                >
                  <Check size={20} />
                </motion.div>
              )}
            </button>

            {/* Share via SMS */}
            <button
              onClick={() => handleShareMethod('sms', onShareViaSMS)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <Smartphone size={20} className="text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-on-surface">SMS</p>
                <p className="text-sm text-on-surface-variant">Send via text message</p>
              </div>
              {shareMethod === 'sms' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-600"
                >
                  <Check size={20} />
                </motion.div>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-4"></div>

          {/* Copy Contact Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-on-surface-variant uppercase tracking-wide">
              Copy Information
            </h4>
            
            <button
              onClick={handleCopy}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface/50 rounded-lg transition-colors"
            >
              <div className="p-2 bg-gray-100 rounded-full">
                {copied ? (
                  <Check size={20} className="text-green-600" />
                ) : (
                  <Copy size={20} className="text-gray-600" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-on-surface">
                  {copied ? 'Copied to clipboard!' : 'Copy Contact Info'}
                </p>
                <p className="text-sm text-on-surface-variant">
                  {copied ? 'Contact information copied' : 'Copy all contact details'}
                </p>
              </div>
              {copied && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-600"
                >
                  <Check size={20} />
                </motion.div>
              )}
            </button>
          </div>

          {/* Contact Details Preview */}
          <div className="mt-4 p-3 bg-surface rounded-lg">
            <h5 className="text-sm font-medium text-on-surface mb-2">Preview:</h5>
            <div className="text-xs text-on-surface-variant space-y-1">
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Username:</strong> @{contact.username}</p>
              {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
              {contact.bio && <p><strong>Bio:</strong> {contact.bio}</p>}
              {contact.mission && <p><strong>Mission:</strong> {contact.mission}</p>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
