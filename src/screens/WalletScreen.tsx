import React, { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import { NFT } from '@/types/types';
import { ExternalLink, ShieldCheck, Coins, Wallet as WalletIcon, User } from 'lucide-react';
import { HederaAccountInfo } from '../services/hederaService';
import { authService } from '../services/authService';
import { i18nService } from '../services/i18nService';
import LanguageToggle from '../components/LanguageToggle';
import LogoutButton from '../components/LogoutButton';

const WalletScreen: React.FC = () => {
    const { playerState } = useGame();
    const [hederaInfo, setHederaInfo] = useState<HederaAccountInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadHederaInfo = async () => {
            try {
                console.log('🔍 Iniciando carregamento das informações da Hedera...');
                
                // Obter dados do usuário logado
                const currentUser = authService.getUserData();
                setUserData(currentUser);
                console.log('👤 Dados do usuário:', currentUser);

                // Chamar a API do Cloudflare Workers para obter informações da Hedera
                console.log('🌐 Chamando API /api/hedera/account...');
                const response = await fetch('/api/hedera/account');
                console.log('📡 Status da resposta:', response.status);
                console.log('📡 Headers da resposta:', Object.fromEntries(response.headers.entries()));
                
                const data = await response.json();
                console.log('📦 Dados recebidos:', data);

                if (data.success && data.account) {
                    console.log('✅ Informações da Hedera carregadas com sucesso');
                    setHederaInfo(data.account);
                    setError(null);
                } else {
                    console.error('❌ Erro na resposta da API:', data.error);
                    setError(data.error || 'Erro desconhecido');
                }
            } catch (error) {
                console.error('❌ Erro ao carregar informações da Hedera:', error);
                setError(error instanceof Error ? error.message : 'Erro de conexão');
            } finally {
                setLoading(false);
            }
        };

        loadHederaInfo();
    }, []);

    return (
        <div className="animate-fadeIn">
            {/* Language Toggle */}
            <div className="absolute top-4 right-4 z-10">
                <LanguageToggle />
            </div>

            {/* Logout Button */}
            <div className="absolute top-4 left-4 z-10">
                <LogoutButton />
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">{i18nService.t('wallet.title')}</h1>
                <p className="text-lg text-gray-400 mt-2">{i18nService.t('wallet.subtitle')}</p>
            </div>

            {/* User Info */}
            {userData && (
                <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <User className="h-6 w-6 text-emerald-400" />
                        <h2 className="text-2xl font-bold text-white">{i18nService.t('profile.title')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <User className="h-5 w-5 text-emerald-400" />
                                <span className="text-sm text-gray-400">{i18nService.t('profile.name')}</span>
                            </div>
                            <p className="text-white font-semibold">{userData.name}</p>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Coins className="h-5 w-5 text-yellow-400" />
                                <span className="text-sm text-gray-400">{i18nService.t('profile.email')}</span>
                            </div>
                            <p className="text-white font-mono text-sm">{userData.email}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hedera Account Info */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <WalletIcon className="h-6 w-6 text-emerald-400" />
                    <h2 className="text-2xl font-bold text-white">{i18nService.t('wallet.hedera.account')}</h2>
                </div>
                
                {loading ? (
                    <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto"></div>
                        <p className="text-gray-400 mt-2">{i18nService.t('loading.account')}</p>
                    </div>
                ) : hederaInfo ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Coins className="h-5 w-5 text-yellow-400" />
                                <span className="text-sm text-gray-400">{i18nService.t('wallet.hedera.account.id')}</span>
                            </div>
                            <p className="text-white font-mono text-lg">{hederaInfo.accountId}</p>
                        </div>
                        
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Coins className="h-5 w-5 text-yellow-400" />
                                <span className="text-sm text-gray-400">{i18nService.t('wallet.hedera.balance')}</span>
                            </div>
                            <p className="text-white font-mono text-lg">{hederaInfo.balance} HBAR</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-red-400">Erro ao carregar informações da conta Hedera</p>
                        <p className="text-gray-400 text-sm mt-2">Verifique se as secrets estão configuradas no Cloudflare</p>
                        {error && (
                            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                                <p className="text-red-300 text-xs font-mono">{error}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* NFTs Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">{i18nService.t('wallet.nfts.title')}</h2>
                
                {playerState.nfts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {playerState.nfts.map((nft) => (
                            <NftCard key={nft.id} nft={nft} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-gray-800/50 p-12 rounded-xl border-2 border-dashed border-gray-700">
                        <h2 className="text-2xl font-bold text-white">{i18nService.t('wallet.empty.title')}</h2>
                        <p className="text-gray-400 mt-2">{i18nService.t('wallet.empty.subtitle')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const NftCard: React.FC<{ nft: NFT }> = ({ nft }) => {
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 group transition-all duration-300 hover:shadow-emerald-900/50 hover:border-emerald-500/50 transform hover:-translate-y-1">
            <div className="aspect-square bg-gray-700 overflow-hidden">
                <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-white truncate">{nft.name}</h3>
                <p className="text-sm text-gray-400 mt-1 h-10">{nft.description}</p>
                <a 
                    href="https://hashscan.io/testnet" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-emerald-600/20 text-emerald-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600/40 hover:text-white transition-colors"
                >
                    <ShieldCheck size={16} />
                    <span>View on HashScan</span>
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );
};

export default WalletScreen;