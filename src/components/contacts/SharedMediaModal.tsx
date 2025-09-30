'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Download, 
  Share2,
  Search,
  Filter,
  Calendar,
  Grid3X3,
  List,
  Eye,
  Trash2,
  MoreVertical,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { Contact } from '@/types';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnail?: string;
  name: string;
  size: string;
  date: Date;
  sender: 'me' | 'other';
}

interface SharedMediaModalProps {
  contact: Contact;
  onClose: () => void;
}

export default function SharedMediaModal({ contact, onClose }: SharedMediaModalProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'images' | 'videos' | 'documents'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showFullImage, setShowFullImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // بيانات وهمية للوسائط المشتركة
  const mockMediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      url: '/images/logo.png',
      name: 'screenshot_2024.png',
      size: '2.3 MB',
      date: new Date('2024-01-15'),
      sender: 'other'
    },
    {
      id: '2',
      type: 'image',
      url: '/images/logo1.png',
      name: 'photo_work.jpg',
      size: '1.8 MB',
      date: new Date('2024-01-14'),
      sender: 'me'
    },
    {
      id: '3',
      type: 'video',
      url: '/videos/demo.mp4',
      thumbnail: '/images/logo2.png',
      name: 'meeting_recording.mp4',
      size: '15.2 MB',
      date: new Date('2024-01-13'),
      sender: 'other'
    },
    {
      id: '4',
      type: 'document',
      url: '/documents/report.pdf',
      name: 'monthly_report.pdf',
      size: '3.1 MB',
      date: new Date('2024-01-12'),
      sender: 'me'
    },
    {
      id: '5',
      type: 'image',
      url: '/images/logo3.png',
      name: 'diagram.png',
      size: '4.2 MB',
      date: new Date('2024-01-11'),
      sender: 'other'
    }
  ];

  // تصفية الوسائط
  const filteredMedia = mockMediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || 
      (filterType === 'images' && item.type === 'image') ||
      (filterType === 'videos' && item.type === 'video') ||
      (filterType === 'documents' && item.type === 'document');
    return matchesSearch && matchesType;
  });

  const handleItemClick = (item: MediaItem) => {
    if (item.type === 'image') {
      const imageIndex = filteredMedia.filter(i => i.type === 'image').findIndex(i => i.id === item.id);
      setCurrentImageIndex(imageIndex);
      setShowFullImage(item.url);
    } else {
      console.log('Opening media item:', item);
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDownload = (item: MediaItem) => {
    console.log('Downloading:', item);
  };

  const handleShare = (item: MediaItem) => {
    console.log('Sharing:', item);
  };

  const handleDelete = (itemId: string) => {
    console.log('Deleting item:', itemId);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'video': return Video;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'image': return 'text-green-600';
      case 'video': return 'text-blue-600';
      case 'document': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Image
              src={contact.avatarUrl}
              alt={contact.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-primary">Shared Media</h2>
              <p className="text-sm text-on-surface-variant">{filteredMedia.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-border space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters and View */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-on-surface-variant" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-1 bg-surface border border-border rounded text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Media</option>
                <option value="images">Images</option>
                <option value="videos">Videos</option>
                <option value="documents">Documents</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-surface/50'
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-surface/50'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid/List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredMedia.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ImageIcon size={48} className="text-on-surface-variant mx-auto mb-4" />
                <h3 className="text-lg font-medium text-on-surface mb-2">No media found</h3>
                <p className="text-on-surface-variant">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'No media shared with this contact yet'}
                </p>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((item) => {
                const IconComponent = getFileIcon(item.type);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="aspect-square bg-surface rounded-lg overflow-hidden border border-border">
                      {item.type === 'image' ? (
                        <Image
                          src={item.url}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <IconComponent size={32} className={getFileColor(item.type)} />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(item);
                            }}
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Download size={16} className="text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(item);
                            }}
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Share2 size={16} className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-xs text-on-surface truncate">{item.name}</p>
                      <p className="text-xs text-on-surface-variant">{item.size}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map((item) => {
                const IconComponent = getFileIcon(item.type);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-4 p-3 hover:bg-surface/50 rounded-lg transition-colors cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center">
                      <IconComponent size={20} className={getFileColor(item.type)} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-on-surface truncate">{item.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-on-surface-variant">
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>{formatDate(item.date)}</span>
                        <span>•</span>
                        <span className="capitalize">{item.sender}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(item);
                        }}
                        className="p-2 hover:bg-surface/50 rounded-full transition-colors"
                      >
                        <Download size={16} className="text-on-surface-variant" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(item);
                        }}
                        className="p-2 hover:bg-surface/50 rounded-full transition-colors"
                      >
                        <Share2 size={16} className="text-on-surface-variant" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Full Image Viewer */}
        {showFullImage && (
          <div className="fixed inset-0 bg-black z-60 flex items-center justify-center">
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={showFullImage}
                alt="Full size"
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
              
              <button
                onClick={() => setShowFullImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <button
                  onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                  className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <span className="text-white text-sm">
                  {currentImageIndex + 1} / {filteredMedia.filter(i => i.type === 'image').length}
                </span>
                <button
                  onClick={() => setCurrentImageIndex(prev => Math.min(
                    filteredMedia.filter(i => i.type === 'image').length - 1, 
                    prev + 1
                  ))}
                  className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
