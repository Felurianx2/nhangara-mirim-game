import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, SkipForward, Leaf, Shield, Users, Globe } from 'lucide-react';
import { authService } from '../services/authService';
import { i18nService } from '../services/i18nService';
import LanguageToggle from '../components/LanguageToggle';

const WelcomeVideoScreen: React.FC = () => {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showSkip, setShowSkip] = useState(false);

    useEffect(() => {
        // Mostrar botão de pular após 3 segundos
        const skipTimer = setTimeout(() => setShowSkip(true), 3000);
        return () => clearTimeout(skipTimer);
    }, []);

    const handleSkip = () => {
        // Marcar que o vídeo foi visto
        authService.markWelcomeVideoAsSeen();
        navigate('/start');
    };

    const handlePlay = () => {
        setIsPlaying(true);
        // Simular progresso do vídeo
        const videoSteps = [
            { title: i18nService.t('welcome.step1.title'), duration: 3000 },
            { title: i18nService.t('welcome.step2.title'), duration: 3000 },
            { title: i18nService.t('welcome.step3.title'), duration: 3000 },
            { title: i18nService.t('welcome.step4.title'), duration: 2000 }
        ];

        let stepIndex = 0;
        const progressVideo = () => {
            if (stepIndex < videoSteps.length) {
                setCurrentStep(stepIndex);
                setTimeout(() => {
                    stepIndex++;
                    progressVideo();
                }, videoSteps[stepIndex].duration);
            } else {
                // Vídeo terminou
                handleSkip();
            }
        };
        progressVideo();
    };

    const videoSteps = [
        {
            title: i18nService.t('welcome.step1.title'),
            description: i18nService.t('welcome.step1.description'),
            icon: <Leaf className="h-16 w-16 text-emerald-400" />,
            color: "emerald"
        },
        {
            title: i18nService.t('welcome.step2.title'),
            description: i18nService.t('welcome.step2.description'),
            icon: <Globe className="h-16 w-16 text-blue-400" />,
            color: "blue"
        },
        {
            title: i18nService.t('welcome.step3.title'),
            description: i18nService.t('welcome.step3.description'),
            icon: <Shield className="h-16 w-16 text-purple-400" />,
            color: "purple"
        },
        {
            title: i18nService.t('welcome.step4.title'),
            description: i18nService.t('welcome.step4.description'),
            icon: <Users className="h-16 w-16 text-green-400" />,
            color: "green"
        }
    ];

    const currentVideoStep = videoSteps[currentStep];

    return (
        <div className="w-full h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 flex items-center justify-center">
            {/* Language Toggle */}
            <div className="absolute top-4 right-4">
                <LanguageToggle />
            </div>

            <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full mx-4 border-2 border-white/20">
                {!isPlaying ? (
                    // Tela inicial
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
                                onClick={handlePlay}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                            >
                                <Play className="h-6 w-6" />
                                {i18nService.t('welcome.watch.video')}
                            </button>
                            
                            {showSkip && (
                                <button
                                    onClick={handleSkip}
                                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <SkipForward className="h-5 w-5" />
                                    {i18nService.t('welcome.skip.video')}
                                </button>
                            )}
                        </div>

                        <div className="text-sm text-gray-400">
                            <p>{i18nService.t('welcome.features.discover')}</p>
                            <p>{i18nService.t('welcome.features.missions')}</p>
                            <p>{i18nService.t('welcome.features.collect')}</p>
                        </div>
                    </div>
                ) : (
                    // Vídeo em progresso
                    <div className="text-center space-y-8">
                        <div className="animate-pulse">
                            {currentVideoStep.icon}
                        </div>
                        
                        <div>
                            <h2 className={`text-3xl md:text-4xl font-bold text-${currentVideoStep.color}-400 mb-4`}>
                                {currentVideoStep.title}
                            </h2>
                            <p className="text-lg text-gray-300">
                                {currentVideoStep.description}
                            </p>
                        </div>

                        {/* Barra de progresso */}
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div 
                                className={`bg-${currentVideoStep.color}-500 h-3 rounded-full transition-all duration-500`}
                                style={{ 
                                    width: `${((currentStep + 1) / videoSteps.length) * 100}%` 
                                }}
                            ></div>
                        </div>

                        <div className="text-sm text-gray-400">
                            <p>Passo {currentStep + 1} de {videoSteps.length}</p>
                        </div>

                        <button
                            onClick={handleSkip}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 mx-auto"
                        >
                            <SkipForward className="h-4 w-4" />
                            {i18nService.t('welcome.skip.video')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomeVideoScreen; 