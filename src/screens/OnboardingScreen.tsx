
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { AVATARS, HUB_BACKGROUND_URL } from '@/utils/constants';
import { PlayerAvatar } from '@/types/types';
import { Check, Leaf } from 'lucide-react';
import { i18nService } from '../services/i18nService';

const OnboardingScreen: React.FC = () => {
    const [selectedAvatar, setSelectedAvatar] = useState<PlayerAvatar | null>(null);
    const { setPlayerAvatar } = useGame();
    const navigate = useNavigate();

    const handleSelectAvatar = (avatar: PlayerAvatar) => {
        setSelectedAvatar(avatar);
    };

    const handleConfirm = () => {
        if (selectedAvatar) {
            setPlayerAvatar(selectedAvatar);
            navigate('/home');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{backgroundImage: `url(${HUB_BACKGROUND_URL})`}}
            />
            
            {/* Content */}
            <div className="relative z-10 bg-black/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl text-center border-2 border-emerald-500/30 max-w-4xl w-full mx-4">
                {/* Header */}
                <div className="flex justify-center mb-6">
                    <div className="bg-emerald-500/20 backdrop-blur-sm rounded-full p-4 border border-emerald-400/30">
                        <Leaf className="h-12 w-12 text-emerald-300" />
                    </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {i18nService.t('onboarding.title')}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto">
                    {i18nService.t('onboarding.subtitle')}
                </p>
                
                {/* Avatar Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {AVATARS.map((avatar) => (
                        <div
                            key={avatar.id}
                            onClick={() => handleSelectAvatar(avatar)}
                            className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                selectedAvatar?.id === avatar.id 
                                    ? 'ring-4 ring-emerald-400 shadow-lg' 
                                    : 'ring-2 ring-gray-600 hover:ring-emerald-300'
                            }`}
                        >
                            <div className="relative">
                                <img 
                                    src={avatar.imageUrl} 
                                    alt={avatar.name}
                                    className="w-40 h-40 md:w-48 md:h-48 object-contain bg-gray-700/50 rounded-full border-4 border-gray-600 mx-auto"
                                    onError={(e) => {
                                        e.currentTarget.src = '/images/saci.jpg'; // Fallback
                                    }}
                                />
                                {selectedAvatar?.id === avatar.id && (
                                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 shadow-lg">
                                        <Check size={20} className="text-white" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-4 text-center">
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {avatar.name}
                                </h3>
                                <div className={`w-2 h-2 rounded-full mx-auto ${
                                    selectedAvatar?.id === avatar.id 
                                        ? 'bg-emerald-400' 
                                        : 'bg-gray-500'
                                }`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <div className="bg-emerald-800/20 backdrop-blur-sm rounded-xl p-4 mb-8 border border-emerald-500/30">
                    <p className="text-sm text-emerald-200">
                        {i18nService.t('onboarding.description')}
                    </p>
                </div>

                {/* Confirm Button */}
                <button 
                    onClick={handleConfirm}
                    disabled={!selectedAvatar}
                    className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                        selectedAvatar
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 shadow-lg'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {selectedAvatar 
                        ? i18nService.t('onboarding.confirm.button')
                        : i18nService.t('onboarding.select.avatar')
                    }
                </button>
            </div>
        </div>
    );
};

export default OnboardingScreen;
