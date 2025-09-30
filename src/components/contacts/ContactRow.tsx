'use client';

import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { Contact } from '@/types';

interface ContactRowProps {
  contact: Contact;
  onClick: () => void;
}

export default function ContactRow({ contact, onClick }: ContactRowProps) {
  return (
    <motion.div
      className="group"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className="flex items-center p-4 hover:bg-surface/30 transition-colors cursor-pointer"
        onClick={onClick}
      >
        {/* Avatar */}
        <div className="relative mr-3">
          <Image
            src={contact.avatarUrl}
            alt={contact.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          {contact.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm text-primary truncate">
              {contact.name}
            </h3>
            {/* More options button - functionality to be implemented */}
            <button 
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surface/50 rounded-full"
              onClick={(e) => {
                e.stopPropagation(); // منع انتشار الحدث إلى العنصر الأب
                console.log('Contact options clicked');
              }}
              title="Contact options"
            >
              <MoreVertical size={16} className="text-on-surface-variant" />
            </button>
          </div>
          
          <p className={`text-sm truncate ${
            contact.isOnline ? 'text-green-500' : 'text-on-surface-variant'
          }`}>
            {contact.status}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
