'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { applyTheme, loadThemeSettings, saveThemeSettings, ThemeSettings } from '@/lib/theme-language';
import Slider from '@/components/ui/Slider';
import { motion } from 'framer-motion';

export default function AppearancePage() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [selectedFontSize, setSelectedFontSize] = useState('medium');
  const [fontScale, setFontScale] = useState(50); // 0-100 scale
  const [contrast, setContrast] = useState(75); // 0-100 scale
  const [opacity, setOpacity] = useState(85); // 0-100 scale

  // تحميل الإعدادات المحفوظة
  useEffect(() => {
    const savedSettings = loadThemeSettings();
    setSelectedTheme(savedSettings.theme);
    setSelectedFontSize(savedSettings.fontSize);
  }, []);

  // تطبيق التغييرات على التطبيق
  useEffect(() => {
    const settings: ThemeSettings = {
      theme: selectedTheme as 'dark' | 'light' | 'system',
      fontSize: selectedFontSize as 'small' | 'medium' | 'large'
    };
    
    applyTheme(settings);
    saveThemeSettings(settings);
    
    // تطبيق إعدادات إضافية
    const root = document.documentElement;
    
    // تطبيق مقياس الخط الإضافي
    const fontScaleMultiplier = 0.8 + (fontScale / 100) * 0.4; // 0.8 إلى 1.2
    root.style.setProperty('--font-scale', fontScaleMultiplier.toString());
    
    // تطبيق التباين
    const contrastMultiplier = 0.5 + (contrast / 100) * 0.5; // 0.5 إلى 1.0
    root.style.setProperty('--contrast', contrastMultiplier.toString());
    
    // تطبيق الشفافية
    const opacityValue = 0.7 + (opacity / 100) * 0.3; // 0.7 إلى 1.0
    root.style.setProperty('--opacity', opacityValue.toString());
    
  }, [selectedTheme, selectedFontSize, fontScale, contrast, opacity]);

  // دوال لتطبيق التغييرات
  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    console.log(`🎨 تم تغيير السمة إلى: ${theme}`);
    // إظهار رسالة تأكيد للمستخدم
    alert(`تم تطبيق السمة: ${theme === 'dark' ? 'الوضع المظلم' : theme === 'light' ? 'الوضع المضيء' : 'إعدادات النظام'}`);
  };

  const handleFontSizeChange = (size: string) => {
    setSelectedFontSize(size);
    console.log(`📝 تم تغيير حجم الخط إلى: ${size}`);
    // إظهار رسالة تأكيد للمستخدم
    alert(`تم تطبيق حجم الخط: ${size === 'small' ? 'صغير' : size === 'medium' ? 'متوسط' : 'كبير'}`);
  };
  return (
    <div 
      className="h-full flex flex-col bg-background transition-colors duration-300"
      style={{
        backgroundColor: selectedTheme === 'dark' ? '#1a1a1a' : '#ffffff',
        color: selectedTheme === 'dark' ? '#ffffff' : '#000000'
      }}
    >
      {/* Responsive Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div 
        className="backdrop-blur-sm border-b border-border px-4 py-3 transition-colors duration-300"
        style={{
          backgroundColor: selectedTheme === 'dark' ? '#2d2d2d' : '#f5f5f5',
          borderColor: selectedTheme === 'dark' ? '#404040' : '#e0e0e0'
        }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
            style={{
              color: selectedTheme === 'dark' ? '#ffffff' : '#000000'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 
            className="text-lg font-semibold transition-colors duration-300"
            style={{
              color: selectedTheme === 'dark' ? '#ffffff' : '#000000'
            }}
          >
            Appearance
          </h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          <div 
            className="border rounded-lg p-4 transition-colors duration-300"
            style={{
              backgroundColor: selectedTheme === 'dark' ? '#2d2d2d' : '#f5f5f5',
              borderColor: selectedTheme === 'dark' ? '#404040' : '#e0e0e0'
            }}
          >
            <h3 
              className="text-lg font-medium mb-4 transition-colors duration-300"
              style={{
                color: selectedTheme === 'dark' ? '#ffffff' : '#000000'
              }}
            >
              Theme
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleThemeChange('dark')}
                className="w-full p-3 text-left hover:bg-surface/50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-on-surface">Dark Mode</span>
                  <span className="text-primary">{selectedTheme === 'dark' ? '✓' : ''}</span>
                </div>
              </button>
              <button 
                onClick={() => handleThemeChange('light')}
                className="w-full p-3 text-left hover:bg-surface/50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-on-surface">Light Mode</span>
                  <span className="text-primary">{selectedTheme === 'light' ? '✓' : ''}</span>
                </div>
              </button>
              <button 
                onClick={() => handleThemeChange('system')}
                className="w-full p-3 text-left hover:bg-surface/50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-on-surface">System Default</span>
                  <span className="text-primary">{selectedTheme === 'system' ? '✓' : ''}</span>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="text-lg font-medium text-on-surface mb-4">Font Size</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleFontSizeChange('small')}
                className="w-full p-3 text-left hover:bg-surface/50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-on-surface text-sm">Small</span>
                  <span className="text-primary">{selectedFontSize === 'small' ? '✓' : ''}</span>
                </div>
              </button>
              <button 
                onClick={() => handleFontSizeChange('medium')}
                className="w-full p-3 text-left hover:bg-surface/50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-on-surface">Medium</span>
                  <span className="text-primary">{selectedFontSize === 'medium' ? '✓' : ''}</span>
                </div>
              </button>
              <button 
                onClick={() => handleFontSizeChange('large')}
                className="w-full p-3 text-left hover:bg-surface/50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-on-surface text-lg">Large</span>
                  <span className="text-primary">{selectedFontSize === 'large' ? '✓' : ''}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Advanced Appearance Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-surface border border-border rounded-lg p-6"
            style={{
              backgroundColor: selectedTheme === 'dark' ? '#2d2d2d' : '#f5f5f5',
              borderColor: selectedTheme === 'dark' ? '#404040' : '#e0e0e0'
            }}
          >
            <h3 
              className="text-lg font-medium mb-6 transition-colors duration-300"
              style={{
                color: selectedTheme === 'dark' ? '#ffffff' : '#000000'
              }}
            >
              إعدادات متقدمة
            </h3>
            
            <div className="space-y-6">
              {/* Font Scale Slider */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Slider
                  label="مقياس الخط"
                  value={fontScale}
                  onChange={setFontScale}
                  min={0}
                  max={100}
                  showValue={true}
                  size="lg"
                  variant="primary"
                  colors={{
                    track: selectedTheme === 'dark' ? '#404040' : '#e0e0e0',
                    thumb: selectedTheme === 'dark' ? '#988561' : '#988561',
                    active: selectedTheme === 'dark' ? '#b09570' : '#7d6b4a'
                  }}
                />
              </motion.div>

              {/* Contrast Slider */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <Slider
                  label="التباين"
                  value={contrast}
                  onChange={setContrast}
                  min={0}
                  max={100}
                  showValue={true}
                  size="lg"
                  variant="success"
                  colors={{
                    track: selectedTheme === 'dark' ? '#404040' : '#e0e0e0',
                    thumb: selectedTheme === 'dark' ? '#2E8B57' : '#2E8B57',
                    active: selectedTheme === 'dark' ? '#3cb071' : '#228b49'
                  }}
                />
              </motion.div>

              {/* Opacity/Transparency Slider */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <Slider
                  label="الشفافية"
                  value={opacity}
                  onChange={setOpacity}
                  min={50}
                  max={100}
                  showValue={true}
                  size="lg"
                  variant="warning"
                  colors={{
                    track: selectedTheme === 'dark' ? '#404040' : '#e0e0e0',
                    thumb: selectedTheme === 'dark' ? '#FFA500' : '#FFA500',
                    active: selectedTheme === 'dark' ? '#ffb433' : '#e69500'
                  }}
                />
              </motion.div>
            </div>

            {/* Reset Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              className="mt-6 pt-4 border-t"
              style={{
                borderColor: selectedTheme === 'dark' ? '#404040' : '#e0e0e0'
              }}
            >
              <button
                onClick={() => {
                  setFontScale(50);
                  setContrast(75);
                  setOpacity(85);
                }}
                className="w-full px-4 py-2 bg-surface border border-border text-on-surface-variant rounded-lg hover:bg-surface/50 transition-colors"
                style={{
                  backgroundColor: selectedTheme === 'dark' ? '#404040' : '#e0e0e0',
                  borderColor: selectedTheme === 'dark' ? '#606060' : '#c0c0c0'
                }}
              >
                إعادة تعيين للحالة الافتراضية
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}
