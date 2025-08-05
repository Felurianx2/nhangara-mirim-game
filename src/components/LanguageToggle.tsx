import React from 'react';
import { Globe } from 'lucide-react';
import { i18nService, Language } from '../services/i18nService';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const currentLanguage = i18nService.getCurrentLanguage();

  const handleToggle = () => {
    const newLanguage = i18nService.toggleLanguage();
    // Forçar re-render da página
    window.location.reload();
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-3 py-2 rounded-lg transition-colors ${className}`}
      title={currentLanguage === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {currentLanguage === 'pt-BR' ? 'EN' : 'PT'}
      </span>
    </button>
  );
};

export default LanguageToggle; 