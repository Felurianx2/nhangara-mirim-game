import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Shield, Users, Globe } from 'lucide-react';
import { authService } from '../services/authService';
import { i18nService } from '../services/i18nService';
import LanguageToggle from '../components/LanguageToggle';

const WelcomeVideoScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleEnter = () => {
        // Marcar que o usuário passou pela tela de boas-vindas
        authService.markWelcomeVideoAsSeen();
        navigate('/start');
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 flex items-center justify-center">
            {/* Language Toggle */}
            <div className="absolute top-4 right-4">
                <LanguageToggle />
            </div>

            <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full mx-4 border-2 border-white/20">
                <div className="text-center space-y-8">
                    <div className="animate-bounce">
                        <Leaf className="h-24 w-24 text-emerald-400 mx-auto" />
                    </div>
                    
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {i18nService.t('app.title')}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            {i18nService.t('welcome.title')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleEnter}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                        >
                            <Leaf className="h-6 w-6" />
                            {i18nService.t('welcome.enter.adventures')}
                        </button>
                    </div>

                    <div className="text-sm text-gray-400 space-y-1">
                        <p>• {i18nService.t('welcome.features.discover')}</p>
                        <p>• {i18nService.t('welcome.features.missions')}</p>
                        <p>• {i18nService.t('welcome.features.collect')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeVideoScreen; 