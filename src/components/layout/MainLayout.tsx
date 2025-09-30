'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useRouter, usePathname } from 'next/navigation';

/**
 * MainLayout Component
 * 
 * Global layout component that provides navigation sidebar across all pages
 * and manages the expandable sidebar navigation.
 * 
 * Features:
 * - Persistent sidebar across all pages
 * - Expandable sidebar with toggle functionality
 * - Navigation to different sections via sidebar
 * - Smooth animations between screen transitions
 * - Responsive design with collapsible sidebar
 */

// Navigation configuration for sidebar items
const navigationItems = [
  { id: 'chats', label: 'Chats', icon: MessageCircle, route: '/main', badge: 2 },
  { id: 'calls', label: 'Calls', icon: Phone, route: '/main/calls' },
  { id: 'contacts', label: 'Contacts', icon: Users, route: '/main/contacts' },
  { id: 'settings', label: 'Settings', icon: Settings, route: '/main/settings' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <div className="h-screen bg-background flex" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      {/* Left Sidebar Navigation */}
      <motion.div 
        className="bg-gradient-to-b from-app-bar to-app-bar/95 border-r border-border/30 flex flex-col py-6 space-y-6 relative shadow-xl backdrop-blur-sm"
        animate={{ width: sidebarExpanded ? 256 : 64 }}
        initial={{ width: 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Header with Logo and Toggle */}
        <div className="flex items-center justify-between px-4">
          {/* App Logo */}
          <div className="w-10 h-10 rounded-xl shadow-lg overflow-hidden">
            <Image
             src="/images/logo.png"
              alt="CyberShield"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          
          {/* Toggle Button */}
          <motion.button
            onClick={toggleSidebar}
            className="text-on-surface-variant hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarExpanded ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </motion.button>
        </div>
        
        {/* App Title */}
        <motion.div
          className="px-4"
          animate={{ 
            opacity: sidebarExpanded ? 1 : 0,
            marginBottom: sidebarExpanded ? 16 : 0
          }}
          transition={{ duration: 0.2 }}
          style={{ overflow: "hidden" }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">CyberShield</h2>
          </div>
          <p className="text-sm text-on-surface-variant ml-8">Messenger</p>
        </motion.div>
        
        {/* Navigation Items */}
        <div className="flex flex-col space-y-2 px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname?.startsWith(item.route);
            
            return (
              <motion.button 
                key={item.id}
                onClick={() => handleNavigation(item.route)}
                className={`flex items-center p-3 rounded-xl transition-all duration-200 relative group ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-md border border-primary/20' 
                    : 'text-on-surface-variant hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-6">
                  <Icon size={20} />
                </div>
                
                <motion.div
                  className="ml-3 flex-1 text-left"
                  animate={{ 
                    opacity: sidebarExpanded ? 1 : 0,
                    width: sidebarExpanded ? "auto" : 0
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <span className="font-medium">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
                
                {/* Notification Badge */}
                {isActive && item.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-white font-semibold">
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <ThemeToggle size="sm" showLabel={false} />
        </div>

        {/* Sidebar Status Indicator - إخفاء المؤشر */}
        {false && (
          <motion.div
            className="absolute top-4 right-1 bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xs px-2 py-1 rounded-full border border-primary/20 shadow-sm"
            animate={{ 
              opacity: sidebarExpanded ? 1 : 0,
              width: sidebarExpanded ? "auto" : 0
            }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <span className="font-medium">
              {sidebarExpanded ? "Expanded" : "Collapsed"}
            </span>
          </motion.div>
        )}
      </motion.div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden bg-gradient-to-br from-background to-surface/10">
        <div className="w-full relative">
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'url(/images/pattern2.png)',
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
            }}
          />
          
          {/* Content */}
          <div className="h-full bg-transparent relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}