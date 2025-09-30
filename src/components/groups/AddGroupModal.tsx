'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Users, Camera, UserPlus, Settings } from 'lucide-react';
import { generateId } from '@/lib/utils';

interface AddGroupModalProps {
  onClose: () => void;
  onAdd: (group: any) => void;
}

export default function AddGroupModal({ onClose, onAdd }: AddGroupModalProps) {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupAvatar, setGroupAvatar] = useState('/images/logo.png');
  const [isPrivate, setIsPrivate] = useState(false);
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (groupName.trim()) {
      const newGroup = {
        id: generateId(),
        name: groupName.trim(),
        description: groupDescription.trim(),
        avatarUrl: groupAvatar,
        isPrivate,
        members: invitedMembers,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user',
        memberCount: invitedMembers.length + 1, // +1 for creator
        isAdmin: true,
        unreadCount: 0,
        lastMessage: null,
        lastMessageTime: null
      };
      onAdd(newGroup);
      onClose();
    }
  };

  const handleAddMember = () => {
    if (newMember.trim() && !invitedMembers.includes(newMember.trim())) {
      setInvitedMembers([...invitedMembers, newMember.trim()]);
      setNewMember('');
    }
  };

  const handleRemoveMember = (member: string) => {
    setInvitedMembers(invitedMembers.filter(m => m !== member));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-primary">Create New Group</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Group Avatar */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <img
                src={groupAvatar}
                alt="Group Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-border"
              />
              <button
                type="button"
                onClick={() => console.log('Change group avatar clicked')}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                title="Change group avatar"
              >
                <Camera size={16} className="text-white" />
              </button>
            </div>
            <p className="text-sm text-on-surface-variant">Group Photo</p>
          </div>

          {/* Group Name */}
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium text-primary mb-2">
              Group Name *
            </label>
            <input
              id="groupName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              placeholder="Enter group name"
              required
            />
          </div>

          {/* Group Description */}
          <div>
            <label htmlFor="groupDescription" className="block text-sm font-medium text-primary mb-2">
              Description
            </label>
            <textarea
              id="groupDescription"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
              placeholder="Describe your group..."
            />
          </div>

          {/* Group Type */}
          <div>
            <label className="block text-sm font-medium text-primary mb-3">
              Group Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="groupType"
                  checked={!isPrivate}
                  onChange={() => setIsPrivate(false)}
                  className="w-4 h-4 text-primary focus:ring-primary/50"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface">Public Group</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Anyone can join</p>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="groupType"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(true)}
                  className="w-4 h-4 text-primary focus:ring-primary/50"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <Settings size={16} className="text-on-surface-variant" />
                    <span className="text-on-surface">Private Group</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Invite only</p>
                </div>
              </label>
            </div>
          </div>

          {/* Add Members */}
          <div>
            <label htmlFor="newMember" className="block text-sm font-medium text-primary mb-2">
              Add Members
            </label>
            <div className="flex space-x-2">
              <input
                id="newMember"
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                placeholder="Enter username or phone number"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMember())}
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
              >
                <UserPlus size={16} />
                <span>Add</span>
              </button>
            </div>
            
            {/* Members List */}
            {invitedMembers.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-on-surface-variant">Invited Members:</p>
                <div className="space-y-1">
                  {invitedMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between bg-surface/50 rounded-lg p-2">
                      <span className="text-sm text-on-surface">{member}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member)}
                        className="text-error hover:text-error/80 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg text-on-surface hover:bg-surface/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Group
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
