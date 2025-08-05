import React from 'react';
import { Clock, GitBranch, Hash } from 'lucide-react';

const Footer: React.FC = () => {
  const currentTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';
  const buildTime = import.meta.env.VITE_BUILD_TIME || new Date().toISOString();

  return (
    <footer className="bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{currentTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch size={14} />
              <span>v{version}</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash size={14} />
              <span className="font-mono text-xs">
                {buildTime.substring(0, 10)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Nhangara Mirim Game</span>
            <span>•</span>
            <span>Powered by Hedera</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 