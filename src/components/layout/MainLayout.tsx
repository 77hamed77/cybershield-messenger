'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';

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
const getNavigationItems = (t: (key: string) => string) => [
  { id: 'chats', label: t('chats.title'), icon: MessageCircle, route: '/main', badge: 2 },
  { id: 'calls', label: t('calls.title'), icon: Phone, route: '/main/calls' },
  { id: 'contacts', label: t('contacts.title'), icon: Users, route: '/main/contacts' },
  { id: 'settings', label: t('settings.title'), icon: Settings, route: '/main/settings' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  
  const navigationItems = getNavigationItems(t);

  // كشف الأجهزة المحمولة والتابلت
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 1024); // تغيير من 768 إلى 1024 ليشمل التابلت
      }
    };
    
    // تأخير قصير لضمان اكتمال hydration
    const timer = setTimeout(checkMobile, 100);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleNavigation = (route: string) => {
    router.push(route);
    // على الهاتف، إغلاق القائمة بعد التنقل
    if (isMobile) {
      setSidebarExpanded(false);
    } else {
      // على سطح المكتب، إبقاء القائمة مفتوحة بعد التنقل
      if (!sidebarExpanded) {
        setSidebarExpanded(true);
      }
    }
  };

  const handleMouseEnter = () => {
    // فقط على سطح المكتب
    if (!isMobile && !sidebarExpanded) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    // فقط على سطح المكتب
    if (!isMobile && !sidebarExpanded) {
      setIsHovered(false);
    }
  };

  const handleSidebarClick = () => {
    // على الهاتف، تبديل القائمة
    if (isMobile) {
      setSidebarExpanded(!sidebarExpanded);
    } else {
      // على سطح المكتب، إبقاء القائمة مفتوحة عند النقر عليها
      if (!sidebarExpanded) {
        setSidebarExpanded(true);
      }
    }
  };

  return (
    <div className="h-screen bg-background flex" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
    {/* Mobile Menu Button */}
    {isMobile && (
      <button
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
        className="fixed top-4 left-4 z-50 p-2 bg-app-bar/80 backdrop-blur-sm rounded-lg shadow-lg border border-border/30"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    )}
    
    {/* Left Sidebar Navigation */}
    <motion.div 
      className={`bg-gradient-to-b from-app-bar to-app-bar/95 border-r border-border/30 flex flex-col py-4 md:py-6 space-y-4 md:space-y-6 relative shadow-xl backdrop-blur-sm ${
        isMobile ? 'fixed left-0 top-0 h-full z-50' : ''
      }`}
      animate={{ 
        width: sidebarExpanded || (!isMobile && isHovered) ? (isMobile ? 280 : 256) : 64,
        x: isMobile && !sidebarExpanded ? -320 : 0
      }}
      initial={{ width: 64, x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSidebarClick}
    >
        {/* Header with Logo and Toggle */}
        <div className="flex items-center justify-between px-3 md:px-4">
        {/* App Logo */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-1">
          <Image
            src="/images/logox.svg"
            alt="CyberShield"
            width={32}
            height={32}
            className="object-contain w-full h-full"
          />
        </div>
          
          {/* Toggle Button */}
          <motion.button
            onClick={toggleSidebar}
            className="text-on-surface-variant hover:text-primary hover:bg-primary/10 p-1.5 md:p-2 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarExpanded ? (
              <ChevronLeft size={18} className="md:w-5 md:h-5" />
            ) : (
              <ChevronRight size={18} className="md:w-5 md:h-5" />
            )}
          </motion.button>
        </div>
        
        {/* App Title */}
        <motion.div
          className="px-3 md:px-4"
          animate={{ 
            opacity: sidebarExpanded || (!isMobile && isHovered) ? 1 : 0,
            marginBottom: sidebarExpanded || (!isMobile && isHovered) ? 12 : 0
          }}
          transition={{ duration: 0.2 }}
          style={{ overflow: "hidden" }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-0.5">
              <Image
                src="/images/logox.svg"
                alt="Logo"
                width={20}
                height={20}
                className="object-contain w-full h-full"
              />
            </div>
                   <h2 className="text-base md:text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent professional-heading">CyberShield</h2>
                 </div>
                 <p className="text-xs md:text-sm text-on-surface-variant ml-6 md:ml-8 professional-subheading">Messenger</p>
        </motion.div>
        
        {/* Navigation Items */}
        <div className="flex flex-col space-y-1 md:space-y-2 px-1 md:px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname?.startsWith(item.route);
            
            return (
                     <motion.button 
                       key={item.id}
                       onClick={() => handleNavigation(item.route)}
                       className={`flex items-center p-2.5 md:p-3 rounded-xl transition-all duration-200 relative group professional-nav-item ${
                         isActive 
                           ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-md border border-primary/20' 
                           : 'text-on-surface-variant hover:text-primary hover:bg-primary/5 hover:shadow-sm'
                       }`}
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                     >
                <div className="flex items-center justify-center w-5 md:w-6">
                  <Icon size={18} className="md:w-5 md:h-5" />
                </div>
                
                <motion.div
                  className="ml-2 md:ml-3 flex-1 text-left"
                  animate={{ 
                    opacity: sidebarExpanded || (!isMobile && isHovered) ? 1 : 0,
                    width: sidebarExpanded || (!isMobile && isHovered) ? "auto" : 0
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                         <span className="text-sm md:text-base font-medium professional-body">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="ml-1 md:ml-2 text-xs bg-primary text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
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
        <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2">
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
      
      {/* Overlay for mobile */}
      {isMobile && sidebarExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarExpanded(false)}
        />
      )}
      
            {/* Main Content Area */}
            <div className={`flex-1 flex overflow-hidden bg-gradient-to-br from-background to-surface/10 ${
              isMobile ? 'ml-0' : ''
            }`}>
              <div className="w-full relative">
                {/* Top Decorative Pattern */}
                <div
                  className="absolute top-0 left-0 right-0 h-24 md:h-32 opacity-[0.08] z-0"
                  style={{
                    backgroundImage: 'url(/images/pattern2.png)',
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: isMobile ? '200px 200px' : '300px 300px',
                    backgroundPosition: 'top center',
                  }}
                />

                {/* Background Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: 'url(/images/pattern2.png)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: isMobile ? '150px 150px' : '200px 200px',
                  }}
                />

                {/* Content */}
                <div className="h-full bg-transparent relative z-10 overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
    </div>
  );
}