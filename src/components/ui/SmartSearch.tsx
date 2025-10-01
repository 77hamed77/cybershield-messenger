'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, User, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';

interface SearchResult {
  id: string;
  type: 'chat' | 'contact' | 'call';
  title: string;
  subtitle: string;
  avatarUrl?: string;
  time?: string;
  badge?: number;
}

interface SmartSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelect?: (result: SearchResult) => void;
  className?: string;
  results?: SearchResult[];
  showRecent?: boolean;
  recentSearches?: string[];
  onClearRecent?: () => void;
}

export default function SmartSearch({
  placeholder = "Search...",
  onSearch,
  onSelect,
  className = "",
  results = [],
  showRecent = true,
  recentSearches = [],
  onClearRecent
}: SmartSearchProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, isRTL } = useLanguage();

  // Filter results based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = results.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered);
      setShowResults(true);
    } else {
      setFilteredResults([]);
      setShowResults(showRecent && recentSearches.length > 0);
    }
  }, [query, results, showRecent, recentSearches]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleResultSelect = (result: SearchResult) => {
    onSelect?.(result);
    setQuery('');
    setShowResults(false);
  };

  const handleRecentSelect = (recentQuery: string) => {
    setQuery(recentQuery);
    onSearch?.(recentQuery);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery('');
    setShowResults(false);
    onSearch?.('');
    inputRef.current?.focus();
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'chat':
        return <MessageCircle size={16} className="text-blue-500" />;
      case 'contact':
        return <User size={16} className="text-green-500" />;
      case 'call':
        return <Phone size={16} className="text-purple-500" />;
      default:
        return <Search size={16} className="text-gray-500" />;
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
          <Search className="h-5 w-5 text-on-surface-variant" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setShowResults(query.trim() ? true : (showRecent && recentSearches.length > 0));
          }}
          placeholder={placeholder}
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-10'} py-3 professional-input rounded-2xl text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200`}
        />
        {query && (
          <button
            onClick={handleClear}
            className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`}
            aria-label={t('app.clear')}
          >
            <X className="h-5 w-5 text-on-surface-variant hover:text-on-surface transition-colors" />
          </button>
        )}
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {showResults && (filteredResults.length > 0 || (showRecent && recentSearches.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} right-0 mt-2 bg-surface border border-border rounded-xl shadow-professional-lg z-50 max-h-80 overflow-y-auto`}
          >
            {/* Recent Searches */}
            {showRecent && recentSearches.length > 0 && !query.trim() && (
              <div className="p-3 border-b border-border">
                <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-medium text-on-surface-variant">
                    {t('app.recent')}
                  </span>
                  {onClearRecent && (
                    <button
                      onClick={onClearRecent}
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                      aria-label={t('app.clear')}
                    >
                      {t('app.clear')}
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {recentSearches.slice(0, 5).map((recentQuery, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSelect(recentQuery)}
                      className={`w-full flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} p-2 hover:bg-surface-variant/50 rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      <Clock size={16} className="text-on-surface-variant" />
                      <span className="text-sm text-on-surface">{recentQuery}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {filteredResults.length > 0 && (
              <div className="p-2">
                {filteredResults.map((result, index) => (
                  <motion.button
                    key={result.id}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleResultSelect(result)}
                    className={`w-full flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} p-3 hover:bg-surface-variant/50 rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-left'} group`}
                  >
                    <div className="flex-shrink-0">
                      {result.avatarUrl ? (
                        <Image
                          src={result.avatarUrl}
                          alt={result.title}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-surface-variant rounded-full flex items-center justify-center">
                          {getResultIcon(result.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <p className="text-sm font-medium text-on-surface truncate">
                          {result.title}
                        </p>
                        {result.badge && result.badge > 0 && (
                          <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-xs bg-primary text-white px-2 py-1 rounded-full`}>
                            {result.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant truncate">
                        {result.subtitle}
                      </p>
                      {result.time && (
                        <p className="text-xs text-on-surface-variant mt-1">
                          {result.time}
                        </p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query.trim() && filteredResults.length === 0 && (
              <div className="p-6 text-center">
                <Search className="w-8 h-8 text-on-surface-variant mx-auto mb-2" />
                <p className="text-sm text-on-surface-variant">
                  {t('app.noResults')}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  {t('app.tryDifferentKeywords')}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
