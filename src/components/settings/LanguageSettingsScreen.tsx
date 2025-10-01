'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Check, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { getLanguageList, SupportedLanguage } from '@/lib/languages';

interface LanguageSettingsScreenProps {
  onBack: () => void;
}

export default function LanguageSettingsScreen({ onBack }: LanguageSettingsScreenProps) {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);
  const [showRestartDialog, setShowRestartDialog] = useState(false);
  const router = useRouter();

  const languageList = getLanguageList();

  const handleLanguageChange = async (newLanguage: SupportedLanguage) => {
    if (newLanguage === language) return;

    setIsChanging(true);
    
    try {
      // تغيير اللغة
      setLanguage(newLanguage);
      
      // إظهار حوار إعادة التشغيل
      setShowRestartDialog(true);
      
      // إعادة تحميل الصفحة بعد تأخير قصير
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  const handleRestartNow = () => {
    window.location.reload();
  };

  const handleRestartLater = () => {
    setShowRestartDialog(false);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-primary" />
          </button>
          <h1 className="text-lg font-semibold text-primary professional-heading">
            {t('language.title')}
          </h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Current Language Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="professional-card"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary">
                  {t('language.currentLanguage')}
                </h3>
                <p className="text-on-surface-variant">
                  {languageList.find(lang => lang.code === language)?.nativeName}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-on-surface-variant">
                  {t('language.direction')}
                </div>
                <div className="text-sm font-medium text-primary">
                  {isRTL ? t('language.rtl') : t('language.ltr')}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Language Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="professional-card"
          >
            <h3 className="text-lg font-semibold text-primary mb-4 professional-heading">
              {t('language.selectLanguage')}
            </h3>
            
            <div className="space-y-3">
              {languageList.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  onClick={() => handleLanguageChange(lang.code)}
                  disabled={isChanging}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                    language === lang.code
                      ? 'border-primary bg-primary/5 shadow-professional'
                      : 'border-border hover:border-primary/50 hover:bg-surface/50'
                  } ${isChanging ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center">
                        <span className="text-lg">
                          {lang.code === 'ar' ? '🇸🇦' : '🇺🇸'}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-primary">
                          {lang.nativeName}
                        </div>
                        <div className="text-sm text-on-surface-variant">
                          {lang.name}
                        </div>
                      </div>
                    </div>
                    
                    {language === lang.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                      >
                        <Check size={16} className="text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Language Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="professional-card"
          >
            <h3 className="text-lg font-semibold text-primary mb-4 professional-heading">
              ميزات اللغة
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-primary">دعم كامل للغة العربية</h4>
                  <p className="text-sm text-on-surface-variant">
                    خط Cairo المحسن للعربية مع دعم RTL كامل
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-primary">واجهة متعددة اللغات</h4>
                  <p className="text-sm text-on-surface-variant">
                    جميع النصوص والواجهات مترجمة بالكامل
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-primary">تطبيق فوري</h4>
                  <p className="text-sm text-on-surface-variant">
                    التغييرات تطبق فوراً على جميع أجزاء التطبيق
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Restart Dialog */}
          {showRestartDialog && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-overlay flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface rounded-xl p-6 max-w-md w-full shadow-professional-xl"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCw size={32} className="text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-primary mb-2 professional-heading">
                    {t('language.restartRequired')}
                  </h3>
                  
                  <p className="text-on-surface-variant mb-6">
                    تم تغيير اللغة بنجاح. يرجى إعادة تشغيل التطبيق لتطبيق التغييرات بالكامل.
                  </p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleRestartLater}
                      className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg text-primary hover:bg-surface/50 transition-colors"
                    >
                      لاحقاً
                    </button>
                    <button
                      onClick={handleRestartNow}
                      className="flex-1 px-4 py-2 professional-button"
                    >
                      إعادة التشغيل الآن
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
