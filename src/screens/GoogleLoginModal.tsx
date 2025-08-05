import React, { useState } from 'react';
import { UserData } from '../services/authService';
import { i18nService } from '../services/i18nService';
import { X, User, Mail } from 'lucide-react';

interface GoogleLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (userData: UserData) => void;
}

const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Contas do folclore brasileiro
    const mockAccounts = [
        {
            id: 'curupira',
            email: 'curupira@mataatlantica.com',
            name: 'Curupira',
            picture: 'https://via.placeholder.com/40/8B4513/FFFFFF?text=C',
            description: 'Protetor das florestas'
        },
        {
            id: 'saci',
            email: 'saci@sertao.com',
            name: 'Saci-Pererê',
            picture: 'https://via.placeholder.com/40/000000/FFFFFF?text=S',
            description: 'Travesso das matas'
        },
        {
            id: 'iara',
            email: 'iara@amazonas.com',
            name: 'Iara',
            picture: 'https://via.placeholder.com/40/0066CC/FFFFFF?text=I',
            description: 'Sereia dos rios'
        },
        {
            id: 'boitata',
            email: 'boitata@cerrado.com',
            name: 'Boitatá',
            picture: 'https://via.placeholder.com/40/FF6600/FFFFFF?text=B',
            description: 'Serpente de fogo'
        },
        {
            id: 'caipora',
            email: 'caipora@pantanal.com',
            name: 'Caipora',
            picture: 'https://via.placeholder.com/40/228B22/FFFFFF?text=C',
            description: 'Guardião dos animais'
        },
        {
            id: 'boto',
            email: 'boto@amazonas.com',
            name: 'Boto Cor-de-Rosa',
            picture: 'https://via.placeholder.com/40/FF69B4/FFFFFF?text=B',
            description: 'Encantador dos rios'
        },
        {
            id: 'mapinguari',
            email: 'mapinguari@amazonia.com',
            name: 'Mapinguari',
            picture: 'https://via.placeholder.com/40/654321/FFFFFF?text=M',
            description: 'Gigante da selva'
        },
        {
            id: 'cuca',
            email: 'cuca@caatinga.com',
            name: 'Cuca',
            picture: 'https://via.placeholder.com/40/8B0000/FFFFFF?text=C',
            description: 'Bruxa das histórias'
        }
    ];

    const handleAccountSelect = (accountId: string) => {
        setSelectedAccount(accountId);
    };

    const handleLogin = async () => {
        if (!selectedAccount) return;

        setIsLoading(true);
        
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1500));

        const account = mockAccounts.find(acc => acc.id === selectedAccount);
        if (!account) return;

        const userData: UserData = {
            email: account.email,
            name: account.name,
            picture: account.picture,
            isLoggedIn: true,
            userId: `user_${account.id}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            welcomeVideoSeen: false
        };

        onLogin(userData);
        setIsLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Escolher conta</h2>
                            <p className="text-sm text-gray-500">Selecione uma conta para continuar</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Account List */}
                <div className="p-6 max-h-96 overflow-y-auto">
                    <div className="space-y-3">
                        {mockAccounts.map((account) => (
                            <button
                                key={account.id}
                                onClick={() => handleAccountSelect(account.id)}
                                className={`w-full flex items-center gap-4 p-3 rounded-lg border-2 transition-all ${
                                    selectedAccount === account.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <img
                                    src={account.picture}
                                    alt={account.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1 text-left">
                                    <div className="font-medium text-gray-900">{account.name}</div>
                                    <div className="text-sm text-gray-500">{account.email}</div>
                                    <div className="text-xs text-gray-400">{account.description}</div>
                                </div>
                                {selectedAccount === account.id && (
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200">
                    <button
                        onClick={handleLogin}
                        disabled={!selectedAccount || isLoading}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                            selectedAccount && !isLoading
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Entrando...
                            </div>
                        ) : (
                            'Entrar com Google'
                        )}
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-3 text-center">
                        🌿 Personagens do folclore brasileiro - Guardiões dos biomas
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GoogleLoginModal; 