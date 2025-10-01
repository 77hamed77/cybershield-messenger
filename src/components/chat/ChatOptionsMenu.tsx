//عند الضغط على الثلاث نقط الفوقية خيارات المحادثة


'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Pin, 
  PinOff, 
  Archive, 
  ArchiveRestore, 
  VolumeX, 
  Volume2, 
  Trash2, 
  Star, 
  StarOff,
  FolderPlus,
  X
} from 'lucide-react';

interface ChatOptionsMenuProps {
  chat: {
    id: string;
    title: string;
    isPinned: boolean;
    isArchived: boolean;
    isMuted: boolean;
    isStarred: boolean;
  };
  onPin: () => void;
  onArchive: () => void;
  onMute: () => void;
  onStar: () => void;
  onDelete: () => void;
  onClose: () => void;
  onMoveToFolder?: () => void;
}

export default function ChatOptionsMenu({ 
  chat, 
  onPin, 
  onArchive, 
  onMute, 
  onStar,
  onDelete, 
  onClose,
  onMoveToFolder
}: ChatOptionsMenuProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute top-12 right-0 z-50 w-64 bg-surface border border-border rounded-2xl shadow-2xl backdrop-blur-sm"
        style={{
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-surface-variant/10">
          <h2 className="text-sm font-semibold text-primary">خيارات المحادثة</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface/50 rounded-full transition-colors"
          >
            <X size={16} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Chat Info */}
        <div className="p-3 border-b border-border bg-surface-variant/5">
          <h3 className="font-medium text-on-surface text-sm truncate">{chat.title}</h3>
        </div>

        {/* Options */}
        <div className="p-2">
          {/* Pin/Unpin */}
          <button
            onClick={() => {
              onPin();
              onClose();
            }}
            className="w-full flex items-center space-x-3 p-2.5 hover:bg-surface/50 rounded-lg transition-colors"
          >
            {chat.isPinned ? (
              <PinOff size={16} className="text-on-surface-variant" />
            ) : (
              <Pin size={16} className="text-on-surface-variant" />
            )}
            <span className="text-on-surface text-sm">
              {chat.isPinned ? 'إلغاء التثبيت' : 'تثبيت المحادثة'}
            </span>
          </button>

          {/* Star/Unstar */}
          <button
            onClick={() => {
              onStar();
              onClose();
            }}
            className="w-full flex items-center space-x-3 p-2.5 hover:bg-surface/50 rounded-lg transition-colors"
          >
            {chat.isStarred ? (
              <StarOff size={16} className="text-yellow-500" />
            ) : (
              <Star size={16} className="text-on-surface-variant" />
            )}
            <span className="text-on-surface text-sm">
              {chat.isStarred ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
            </span>
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={() => {
              onMute();
              onClose();
            }}
            className="w-full flex items-center space-x-3 p-2.5 hover:bg-surface/50 rounded-lg transition-colors"
          >
            {chat.isMuted ? (
              <Volume2 size={16} className="text-on-surface-variant" />
            ) : (
              <VolumeX size={16} className="text-on-surface-variant" />
            )}
            <span className="text-on-surface text-sm">
              {chat.isMuted ? 'إلغاء كتم الإشعارات' : 'كتم الإشعارات'}
            </span>
          </button>

          {/* Archive/Unarchive */}
          <button
            onClick={() => {
              onArchive();
              onClose();
            }}
            className="w-full flex items-center space-x-3 p-2.5 hover:bg-surface/50 rounded-lg transition-colors"
          >
            {chat.isArchived ? (
              <ArchiveRestore size={16} className="text-on-surface-variant" />
            ) : (
              <Archive size={16} className="text-on-surface-variant" />
            )}
            <span className="text-on-surface text-sm">
              {chat.isArchived ? 'إلغاء الأرشفة' : 'أرشفة المحادثة'}
            </span>
          </button>

          {/* Divider */}
          <div className="border-t border-border my-1.5"></div>

          {/* Move to Folder */}
          {onMoveToFolder && (
            <button
              onClick={onMoveToFolder}
              className="w-full flex items-center space-x-3 p-2.5 hover:bg-surface/50 rounded-lg transition-colors"
            >
              <FolderPlus size={16} className="text-primary" />
              <span className="text-on-surface text-sm">نقل إلى مجلد</span>
            </button>
          )}

          {/* Delete Chat */}
          <button
            onClick={handleDelete}
            className="w-full flex items-center space-x-3 p-2.5 hover:bg-surface/50 rounded-lg transition-colors"
          >
            <Trash2 size={16} className="text-error" />
            <span className="text-error text-sm">حذف المحادثة</span>
          </button>
        </div>
      </motion.div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div 
          className="bg-black/70 backdrop-blur-lg"
          onClick={() => setShowDeleteConfirm(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            margin: 0
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-surface border border-border rounded-3xl p-6 shadow-2xl backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              zIndex: 10001,
              maxHeight: '75vh',
              maxWidth: '90vw',
              width: '100%',
              overflowY: 'auto'
            }}
          >
            <h3 className="text-base font-semibold text-on-surface mb-2">تأكيد الحذف</h3>
            <p className="text-on-surface-variant text-sm mb-5">
              هل أنت متأكد من حذف هذه المحادثة؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-3 py-2 bg-surface-variant border border-border rounded-lg text-on-surface text-sm hover:bg-surface-variant/80 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-3 py-2 bg-error text-on-error rounded-lg text-sm hover:bg-error/90 transition-colors"
              >
                حذف
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
