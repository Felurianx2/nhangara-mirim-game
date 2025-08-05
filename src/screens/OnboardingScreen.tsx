
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { AVATARS, HUB_BACKGROUND_URL } from '@/utils/constants';
import { PlayerAvatar } from '@/types/types';
import { Check } from 'lucide-react';

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
        <div 
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{backgroundImage: `url(${HUB_BACKGROUND_URL})`}}
        >
            <div className="bg-black/70 p-8 rounded-2xl shadow-2xl text-center backdrop-blur-md border-2 border-emerald-500/30 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-white mb-2">Create Your Guardian</h1>
                <p className="text-lg text-gray-300 mb-8">Choose an avatar to represent you on this journey.</p>
                
                <div className="flex justify-center gap-8 mb-8">
                    {AVATARS.map((avatar) => (
                        <div
                            key={avatar.id}
                            onClick={() => handleSelectAvatar(avatar)}
                            className={`relative cursor-pointer rounded-full transition-all duration-300 transform hover:scale-105 ${
                                selectedAvatar?.id === avatar.id ? 'ring-4 ring-emerald-400' : 'ring-2 ring-transparent'
                            }`}
                        >
                            <img 
                                src={avatar.imageUrl} 
                                alt={avatar.name}
                                className="w-40 h-40 object-contain bg-gray-700/50 rounded-full border-4 border-gray-600"
                            />
                            {selectedAvatar?.id === avatar.id && (
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2">
                                    <Check size={24} className="text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleConfirm}
                    disabled={!selectedAvatar}
                    className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
                >
                    Confirm and Start Journey
                </button>
            </div>
        </div>
    );
};

export default OnboardingScreen;
