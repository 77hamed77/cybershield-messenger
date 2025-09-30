'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Bookmark, 
  Copy, 
  Forward, 
  Reply, 
  Download,
  Edit,
  MoreVertical 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MessageOptionsMenuProps {
  messageId: string;
  messageContent: string;
  isSentByMe: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onDelete: (messageId: string) => void;
  onSave: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
  onForward?: (messageId: string) => void;
  onReply?: (messageId: string) => void;
  onCopy?: (content: string) => void;
}

export default function MessageOptionsMenu({
  messageId,
  messageContent,
  isSentByMe,
  position,
  onClose,
  onDelete,
  onSave,
  onEdit,
  onForward,
  onReply,
  onCopy
}: MessageOptionsMenuProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    onDelete(messageId);
    onClose();
  };

  const handleSave = () => {
    onSave(messageId);
    onClose();
  };

  const handleCopy = () => {
    if (onCopy) {
      onCopy(messageContent);
    }
    onClose();
  };

  const handleSendToSaved = () => {
    onSave(messageId);
    router.push('/main/settings/saved-messages');
    onClose();
  };

  const options = [
    {
      id: 'copy',
      label: 'نسخ النص',
      icon: Copy,
      onClick: handleCopy,
      show: true
    },
    {
      id: 'save',
      label: 'حفظ الرسالة',
      icon: Bookmark,
      onClick: handleSave,
      show: true
    },
    {
      id: 'forward',
      label: 'إعادة توجيه',
      icon: Forward,
      onClick: () => onForward ? onForward(messageId) : null,
      show: !!onForward
    },
    {
      id: 'reply',
      label: 'الرد',
      icon: Reply,
      onClick: () => onReply ? onReply(messageId) : null,
      show: !!onReply
    },
    {
      id: 'edit',
      label: 'تعديل',
      icon: Edit,
      onClick: () => onEdit ? onEdit(messageId) : null,
      show: isSentByMe && !!onEdit
    },
    {
      id: 'download',
      label: 'تحميل',
      icon: Download,
      onClick: () => console.log('Download message'),
      show: messageContent.startsWith('/') && messageContent.match(/\.(jpg|jpeg|png|gif|mp4|mp3|pdf)$/i)
    },
    {
      id: 'delete',
      label: 'حذف الرسالة',
      icon: Trash2,
      onClick: handleDelete,
      show: true,
      className: 'text-error hover:bg-error/10'
    }
  ];

  return (
    <>
      {/* Background Overlay */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          onClick={onClose}
        />

        {/* Menu */}
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bg-surface border border-border rounded-lg shadow-lg py-2 min-w-[200px] z-50"
          style={{
            left: position.x + 16,
            top: position.y - 120,
            transform: 'translateX(-100%)'
          }}
        >
          {options.filter(option => option.show).map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={option.onClick}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium
                hover:bg-surface-variant/50 transition-colors text-left
                ${option.className || 'text-on-surface'}
              `}
            >
              <option.icon size={18} />
              <span>{option.label}</span>
            </motion.button>
          ))}

          {/* Action Buttons for Saved Messages */}
          {messageContent && (
            <>
              <div className="border-t border-border my-1" />
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: options.length * 0.05 }}
                onClick={handleSendToSaved}
                className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-primary hover:bg-primary/10 transition-colors text-left"
              >
                <Bookmark size={18} />
                <span>إرسال للمحفوظات</span>
              </motion.button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Delete Confirmation */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface border border-border rounded-lg shadow-xl p-6 max-w-sm mx-4"
          >
            <h3 className="text-lg font-semibold text-on-surface mb-2">
              تأكيد الحذف
            </h3>
            <p className="text-on-surface-variant mb-6">
              هل أنت متأكد من حذف هذه الرسالة؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex space-x-3 space-x-reverse">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 bg-surface-variant text-on-surface rounded-lg font-medium hover:bg-surface-variant/80 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-error text-on-error rounded-lg font-medium hover:bg-error/90 transition-colors"
              >
                حذف
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
