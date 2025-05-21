import React, { ReactNode } from 'react';
import { ScanSearch } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { appState } = useAppContext();
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ScanSearch size={28} className="text-blue-400" />
              <h1 className="text-xl font-bold">NFT Scanner</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${
                appState === 'idle' ? 'bg-gray-400' :
                appState === 'running' ? 'bg-green-500 animate-pulse' :
                appState === 'paused' ? 'bg-yellow-500' :
                appState === 'stopped' ? 'bg-red-500' :
                'bg-blue-500'
              }`}></div>
              <span className="text-sm uppercase tracking-wide">
                {appState === 'idle' ? 'Ready' :
                appState === 'running' ? 'Scanning' :
                appState === 'paused' ? 'Paused' :
                appState === 'stopped' ? 'Stopped' :
                'Completed'}
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>NFT Scanner © 2025 | Powered by React</p>
        </div>
      </footer>
    </div>
  );
};