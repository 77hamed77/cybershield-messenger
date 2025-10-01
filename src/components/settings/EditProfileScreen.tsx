'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Save, LogOut, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';

export default function EditProfileScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [name, setName] = useState('    ابو قحطان ');
  const [username, setUsername] = useState('@abu_qhatan');
  const [bio, setBio] = useState(' (      مدير شعبة التجنيد السيبراني) ');
  const [mission, setMission] = useState('المرشد الأعلى  ');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSave = () => {
    // Handle save logic
    console.log('Saving profile:', { name, username, bio, mission });
    router.back();
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    // Clear all data and redirect to login
    localStorage.clear();
    sessionStorage.clear();
    
    console.log('🚪 تم تسجيل الخروج بنجاح');
    alert('تم تسجيل الخروج بنجاح');
    
    // Redirect to login page
    router.push('/login');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-primary" />
          </button>
          <h1 className="text-lg font-semibold text-primary professional-heading">{t('settings.editProfile')}</h1>
          <button
            onClick={handleSave}
            className="text-primary text-sm font-medium hover:text-primary/80 transition-colors flex items-center space-x-1"
          >
            <Save size={16} />
            <span>{t('app.save')}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-2 shadow-professional">
              <Image
                src="/images/logox.svg"
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            {/* Change photo button - functionality to be implemented */}
            <button 
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              onClick={() => console.log('Change photo clicked')}
              title="Change profile photo"
            >
              <Camera size={20} className="text-white" />
            </button>
          </div>
          <p className="text-sm text-on-surface-variant mt-4 professional-body">{t('additionalSettings.tapToChangePhoto')}</p>
        </motion.div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              placeholder="Enter your name"
            />
          </motion.div>

          {/* Username */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <label htmlFor="username" className="block text-sm font-medium text-primary mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              placeholder="Enter username"
            />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <label htmlFor="bio" className="block text-sm font-medium text-primary mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
              placeholder="Tell us about yourself"
            />
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <label htmlFor="mission" className="block text-sm font-medium text-primary mb-2">
              Mission
            </label>
            <input
              id="mission"
              type="text"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              placeholder="Enter your mission"
            />
          </motion.div>
        </div>

        {/* Logout Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-8 pt-6 border-t border-border"
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-error/10 hover:bg-error/20 border border-error/20 text-error rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogOut size={20} />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
          <p className="text-xs text-on-surface-variant text-center mt-2">
            سيتم حذف جميع البيانات المحلية وإعادة التوجيه لصفحة تسجيل الدخول
          </p>
        </motion.div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-background border border-border rounded-xl p-6 max-w-sm w-full mx-4"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/20 rounded-full flex items-center justify-center">
                <AlertTriangle size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-on-surface">
                  تأكيد تسجيل الخروج
                </h3>
                <p className="text-sm text-on-surface-variant">
                  هل أنت متأكد من تسجيل الخروج؟
                </p>
              </div>
            </div>
            
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              سيتم حذف جميع البيانات المحفوظة محلياً (الإعدادات، المحادثات المؤقتة، إلخ) 
              وإعادة التوجيه لصفحة تسجيل الدخول.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2 border border-border text-on-surface-variant rounded-lg hover:bg-surface transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
              >
                تسجيل الخروج
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
