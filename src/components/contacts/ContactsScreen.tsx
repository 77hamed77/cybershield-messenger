'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search, Plus, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { mockContacts } from '@/data/mockData';
import { Contact } from '@/types';
import ContactRow from './ContactRow';
import AddContactModal from './AddContactModal';

/**
 * ContactsScreen Component
 * 
 * Main contacts screen displaying list of contacts with search and add functionality.
 * 
 * Features:
 * - Display list of contacts with search functionality
 * - Add new contacts via modal
 * - Navigation to contact info screen
 * - Contact management and filtering
 * - Responsive design with animations
 */

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact]);
    setShowAddModal(false);
  };

  const handleContactClick = (contact: Contact) => {
    // Navigate to contact info screen
    router.push(`/main/contact/${contact.id}`);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/logo.png"
                alt="CyberShield"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Contacts</h1>
              <p className="text-xs text-on-surface-variant">Manage your friends</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 p-2 rounded-lg"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" size={20} />
          <input
            type="text"
            placeholder="Search for contacts or users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-2xl text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-1"
        >
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ContactRow
                contact={contact}
                onClick={() => handleContactClick(contact)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center px-8">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
              <Plus className="text-on-surface-variant" size={32} />
            </div>
            <h3 className="text-lg font-medium text-on-surface mb-2">No contacts found</h3>
            <p className="text-on-surface-variant text-sm">
              {searchQuery ? 'Try adjusting your search terms' : 'Add your first contact to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <AddContactModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddContact}
        />
      )}
    </div>
  );
}
