'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StoragePage() {
  const router = useRouter();
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
          <h1 className="text-lg font-semibold text-primary">Data and Storage</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="text-lg font-medium text-on-surface mb-4">Storage Usage</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-on-surface">Messages</span>
                <span className="text-on-surface-variant">12.5 MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface">Media</span>
                <span className="text-on-surface-variant">45.2 MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface">Cache</span>
                <span className="text-on-surface-variant">8.1 MB</span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface font-medium">Total</span>
                  <span className="text-primary font-medium">65.8 MB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="text-lg font-medium text-on-surface mb-4">Auto-Download</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-on-surface">Photos</span>
                <span className="text-success">Wi-Fi</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface">Videos</span>
                <span className="text-warning">Wi-Fi Only</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface">Documents</span>
                <span className="text-success">Always</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Clear Cache
          </button>
        </div>
      </div>
    </div>
  );
}
