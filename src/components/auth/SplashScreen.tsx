'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';

export default function SplashScreen() {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full">
        {/* <Image
          src="/images/pattern2.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-20"
          priority
        /> */}
        {/* Decorative Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'url(/images/pattern2.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '500px 500px',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <Image
            src="/images/name.png"
            alt="CyberShield Messenger"
            width={300}
            height={100}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-md"
        >
          <h1 className="text-2xl font-bold text-on-surface mb-4 professional-heading">
            {t('splash.subtitle')}
          </h1>
        </motion.div>

        {/* Main Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-6 shadow-professional">
            <Image
              src="/images/logox.svg"
              alt="CyberShield Logo"
              width={80}
              height={80}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12"
        >
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-on-surface-variant text-sm mt-4 professional-body">
            {t('splash.loading')}
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <p className="text-on-surface-variant text-sm professional-body">
          {t('splash.copyright')}
        </p>
      </motion.div>
    </div>
  );
}
