'use client';

import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import ChatRow from './ChatRow';
import { ChatItem } from '@/types';

interface DraggableChatRowProps {
  chat: ChatItem;
  onPin: () => void;
  onArchive: () => void;
  onMute: () => void;
  onDelete: () => void;
  onMarkUnread: () => void;
  onClick: () => void;
  onDropOnFolder: (folderId: string) => void;
  folders: Array<{ id: string; name: string; icon: string; color: string }>;
}

export default function DraggableChatRow({
  chat,
  onPin,
  onArchive,
  onMute,
  onDelete,
  onMarkUnread,
  onClick,
  onDropOnFolder,
  folders
}: DraggableChatRowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showFolderDropzone, setShowFolderDropzone] = useState(false);
  const dragControls = useDragControls();

  const handleDragStart = () => {
    setIsDragging(true);
    setShowFolderDropzone(true);
    document.body.style.cursor = 'grabbing';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setShowFolderDropzone(false);
    document.body.style.cursor = 'default';
  };

  const handleDrop = (folderId: string) => {
    onDropOnFolder(folderId);
    setShowFolderDropzone(false);
  };

  return (
    <>
      <motion.div
        drag
        dragControls={dragControls}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
        dragElastic={0}
        whileDrag={{ 
          scale: 1.05, 
          rotate: 5,
          zIndex: 1000
        }}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        className={`${isDragging ? 'shadow-2xl' : ''}`}
      >
        <ChatRow
          chat={chat}
          onPin={onPin}
          onArchive={onArchive}
          onMute={onMute}
          onDelete={onDelete}
          onMarkUnread={onMarkUnread}
          onClick={onClick}
        />
      </motion.div>

      {/* Folder Dropzone */}
      {showFolderDropzone && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-0 left-0 right-0 z-50 bg-surface border border-primary rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-4 text-center">
            <h3 className="text-lg font-medium text-primary mb-2">Drop to Folder</h3>
            <p className="text-sm text-on-surface-variant mb-4">Drag to a folder to organize</p>
            
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              {folders.map((folder) => (
                <motion.button
                  key={folder.id}
                  onTap={() => handleDrop(folder.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                  style={{ borderColor: folder.color }}
                >
                  <div
                    className="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${folder.color}20` }}
                  >
                    {folder.icon}
                  </div>
                  <span className="text-xs font-medium" style={{ color: folder.color }}>
                    {folder.name}
                  </span>
                </motion.button>
              ))}
            </div>
            
            <button
              onClick={() => setShowFolderDropzone(false)}
              className="mt-4 px-4 py-2 bg-surface-variant text-on-surface-variant rounded-lg hover:bg-surface-variant/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
