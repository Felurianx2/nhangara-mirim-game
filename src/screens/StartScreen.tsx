
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { HUB_BACKGROUND_URL, LOCAL_IMAGES } from '@/utils/constants';
import { Leaf, Mail, User, LogOut, Wallet, CheckCircle } from 'lucide-react';
import { authService, UserData } from '../services/authService';
import { i18nService } from '../services/i18nService';
import LanguageToggle from '../components/LanguageToggle';
import GoogleLoginModal from './GoogleLoginModal';

const StartScreen: React.FC = () => {
    const { playerState } = useGame();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [walletCreated, setWalletCreated] = useState(false);
    const [useVideo, setUseVideo] = useState(false); // Toggle para vídeo/imagem
    const [showGoogleModal, setShowGoogleModal] = useState(false);

    useEffect(() => {
        console.log('🔄 useEffect executando...');
        // Verificar se há dados do usuário salvos
        const savedUserData = authService.getUserData();
        console.log('💾 Saved user data:', savedUserData); // Debug log
        if (savedUserData) {
            console.log('✅ Usuário encontrado, definindo estado...');
            setUserData(savedUserData);
            authService.updateLastLogin();
            
            // Verificar se precisa ver o vídeo de boas-vindas
            if (savedUserData.isLoggedIn && !savedUserData.welcomeVideoSeen) {
                console.log('🎬 Redirecionando para vídeo de boas-vindas...');
                navigate('/welcome-video');
                return;
            }
        } else {
            console.log('❌ Nenhum usuário salvo encontrado');
        }
        console.log('🏁 Finalizando useEffect, setIsLoading(false)');
        setIsLoading(false);
    }, [navigate]);

    // Debug log para verificar o estado atual
    console.log('🔍 Current userData:', userData);
    console.log('🔐 Is logged in:', userData?.isLoggedIn);
    console.log('🎮 Player state:', playerState);

    const handleGoogleLogin = () => {
        setShowGoogleModal(true);
    };

    const handleGoogleLoginSuccess = async (userData: UserData) => {
        console.log('🚀 Iniciando login com:', userData);
        setLoginLoading(true);
        setError(null);
        setWalletCreated(false);
        
        try {
            console.log('📋 Verificando wallet...');
            // Verificar se usuário já tem wallet
            const hasWallet = await authService.checkUserWallet(userData.userId!);
            userData.hasWallet = hasWallet;
            console.log('💰 Wallet existe?', hasWallet);

            // Se não tem wallet, criar uma
            let walletCreated = false;
            if (!hasWallet) {
                console.log('🆕 Criando wallet para novo usuário...');
                walletCreated = await authService.createUserWallet(userData.userId!, userData.email);
                userData.hasWallet = walletCreated;
                console.log('✅ Wallet criada?', walletCreated);
                
                if (walletCreated) {
                    // Aqui você pode obter os dados da wallet criada
                    setWalletCreated(true);
                    setTimeout(() => setWalletCreated(false), 5000); // Esconder após 5s
                }
            }

            console.log('💾 Salvando dados do usuário...');
            // Salvar dados do usuário
            authService.saveUserData(userData);
            setUserData(userData);
            console.log('✅ Dados salvos, userData atual:', userData);
            
            // Redirecionar para vídeo de boas-vindas se for primeira vez
            if (!userData.welcomeVideoSeen) {
                console.log('🎬 Redirecionando para vídeo de boas-vindas...');
                navigate('/welcome-video');
            } else {
                console.log('🏠 Usuário já viu o vídeo, permanecendo na tela inicial');
            }
        } catch (error) {
            console.error('❌ Erro no login:', error);
            // setError(i18nService.t('login.error')); // Temporariamente comentado
        } finally {
            setLoginLoading(false);
            console.log('🏁 Login finalizado');
        }
    };

    const handleLogout = () => {
        console.log('Logout clicked'); // Debug log
        authService.logout();
        setUserData(null);
        setError(null);
        setWalletCreated(false);
    };

    const isReturningPlayer = playerState.onboardingCompleted && userData?.isLoggedIn;
    console.log('🎯 isReturningPlayer:', isReturningPlayer);
    console.log('📚 onboardingCompleted:', playerState.onboardingCompleted);

    if (isLoading) {
        return (
            <div 
                className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center"
                style={{backgroundImage: `url(${HUB_BACKGROUND_URL})`}}
            >
                <div className="bg-black/60 p-10 rounded-2xl shadow-2xl text-center backdrop-blur-sm border-2 border-emerald-500/30">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
                    <p className="text-white mt-4">{i18nService.t('loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background - Vídeo ou Imagem */}
            {useVideo ? (
                <>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ 
                            zIndex: -1,
                            minWidth: '100vw',
                            minHeight: '100vh',
                            width: '100vw',
                            height: '100vh',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        onLoadStart={() => console.log('🎬 Vídeo iniciando carregamento...')}
                        onCanPlay={() => console.log('✅ Vídeo pronto para reprodução!')}
                        onError={(e) => console.error('❌ Erro no vídeo:', e)}
                    >
                        <source src={LOCAL_IMAGES.WELCOME_VIDEO} type="video/mp4" />
                    </video>
                    {/* Overlay escuro para mascarar marca d'água */}
                    <div className="absolute inset-0 bg-black/60" style={{ zIndex: -1 }}></div>
                </>
            ) : (
                <>
                    {/* Imagem de fundo */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${HUB_BACKGROUND_URL})`,
                            zIndex: -1
                        }}
                    />
                    {/* Overlay mais claro para imagem */}
                    <div className="absolute inset-0 bg-black/40" style={{ zIndex: -1 }}></div>
                </>
            )}

            {/* Language Toggle */}
            <div className="absolute top-4 right-4 z-10">
                <LanguageToggle />
            </div>

            {/* Background Toggle */}
            <div className="absolute top-4 left-4 z-10">
                <button
                    onClick={() => setUseVideo(!useVideo)}
                    className="bg-gray-800/80 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700/80 transition-colors"
                >
                    {useVideo ? '🖼️ Imagem' : '🎬 Vídeo'}
                </button>
            </div>

            <div className="bg-black/60 p-10 rounded-2xl shadow-2xl text-center backdrop-blur-sm border-2 border-emerald-500/30 max-w-md w-full">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Leaf className="h-16 w-16 text-emerald-400" />
                    <h1 className="text-5xl font-bold text-white">{i18nService.t('app.title')}</h1>
                </div>
                <p className="text-lg text-gray-300 mb-8">{i18nService.t('app.subtitle')}</p>



                {error && (
                    <div className="mb-4 p-3 bg-red-600/20 border border-red-500/50 rounded-lg">
                        <p className="text-red-300 text-sm">{error}</p>
                    </div>
                )}

                {walletCreated && (
                    <div className="mb-4 p-3 bg-emerald-600/20 border border-emerald-500/50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-emerald-400" />
                            <p className="text-emerald-300 text-sm">{i18nService.t('wallet.created')}</p>
                        </div>
                    </div>
                )}

                {userData?.isLoggedIn ? (
                    // Usuário logado
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            {userData.picture ? (
                                <img src={userData.picture} alt="Avatar" className="w-10 h-10 rounded-full" />
                            ) : (
                                <User className="w-10 h-10 text-emerald-400" />
                            )}
                            <div className="text-left">
                                <p className="text-white font-semibold">{userData.name}</p>
                                <p className="text-gray-400 text-sm">{userData.email}</p>
                            </div>
                        </div>

                        {/* Informações da Wallet */}
                        {userData.hasWallet && userData.walletAccountId && (
                            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <Wallet className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm text-gray-400">{i18nService.t('wallet.hedera.account')}</span>
                                </div>
                                <p className="text-white font-mono text-xs">{userData.walletAccountId}</p>
                            </div>
                        )}

                        {isReturningPlayer ? (
                            <Link to="/home" className="w-full block bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-emerald-700 transition-transform transform hover:scale-105 shadow-lg">
                                {i18nService.t('nav.continue.journey')}
                            </Link>
                        ) : (
                            <Link to="/onboarding" className="w-full block bg-amber-500 text-gray-900 font-bold py-4 px-8 rounded-lg text-xl hover:bg-amber-600 transition-transform transform hover:scale-105 shadow-lg">
                                {i18nService.t('nav.first.time')}
                            </Link>
                        )}

                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <LogOut size={16} />
                            {i18nService.t('logout')}
                        </button>
                    </div>
                ) : (
                    // Usuário não logado - Apenas Google
                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loginLoading}
                            className="w-full bg-white text-gray-900 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loginLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                    {i18nService.t('login.loading')}
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    {i18nService.t('login.google')}
                                </>
                            )}
                        </button>
                        
                        <div className="text-center">
                            <p className="text-sm text-gray-400">
                                {i18nService.t('login.google.description')}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Google Login Modal */}
            <GoogleLoginModal
                isOpen={showGoogleModal}
                onClose={() => setShowGoogleModal(false)}
                onLogin={handleGoogleLoginSuccess}
            />
        </div>
    );
};

export default StartScreen;
